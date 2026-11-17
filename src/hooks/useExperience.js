import { useCallback, useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

export function usePageVisibility() {
  useEffect(() => {
    const update = () => document.documentElement.toggleAttribute('data-invitation-hidden', document.hidden)
    document.addEventListener('visibilitychange', update)
    update()
    return () => {
      document.removeEventListener('visibilitychange', update)
      document.documentElement.removeAttribute('data-invitation-hidden')
    }
  }, [])
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(query.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])
  return reduced
}

export function useInvitationScroll(enabled) {
  useEffect(() => {
    if (!enabled || navigator.connection?.saveData) return
    const lenis = new Lenis({
      autoRaf: false,
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false,
    })
    const elements = [...document.querySelectorAll('[data-parallax]')]
    const scenes = new Map()
    for (const element of elements) {
      const scene = element.closest('[data-parallax-scene]') || element.parentElement
      if (!scenes.has(scene)) scenes.set(scene, [])
      scenes.get(scene).push(element)
    }
    const visible = new Set()
    const update = () => {
      const desktop = window.innerWidth >= 1024
      // Read section geometry first, then write transforms to avoid layout thrashing.
      const measurements = [...visible].map(scene => ({ scene, rect: scene.getBoundingClientRect() }))
      for (const { scene, rect: { top, height } } of measurements) {
        const progress = Math.max(-1, Math.min(1, (window.innerHeight - 2 * top - height) / (window.innerHeight + height)))
        for (const element of scenes.get(scene)) {
          const limit = Number(desktop ? element.dataset.parallaxDesktop : element.dataset.parallaxMobile)
          const direction = Number(element.dataset.parallaxDirection || 1)
          element.style.setProperty('--parallax-y', `${(progress * limit * direction).toFixed(2)}px`)
        }
      }
    }
    const observer = new IntersectionObserver(entries => {
      for (const { target, isIntersecting } of entries) {
        if (isIntersecting) visible.add(target)
        else visible.delete(target)
        for (const element of scenes.get(target)) element.toggleAttribute('data-parallax-active', isIntersecting)
      }
      update()
    }, { rootMargin: '32px 0px' })
    for (const scene of scenes.keys()) observer.observe(scene)
    // Intercept only this page's section links; keep external links native.
    const onAnchorClick = event => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const link = event.target instanceof Element ? event.target.closest('a[href]') : null
      if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return
      const url = new URL(link.href, window.location.href)
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || url.search !== window.location.search || !url.hash) return
      let id
      try { id = decodeURIComponent(url.hash.slice(1)) } catch { return }
      const target = document.getElementById(id)
      if (!target) return
      event.preventDefault()
      if (window.location.hash !== url.hash) window.history.pushState(null, '', url.hash)
      lenis.scrollTo(target, {
        duration: 0.9,
        onComplete: () => {
          // Preserve the keyboard focus behavior of a native section link.
          const needsTabIndex = !target.hasAttribute('tabindex') && target.tabIndex < 0
          if (needsTabIndex) {
            target.setAttribute('tabindex', '-1')
            target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true })
          }
          target.focus({ preventScroll: true })
        },
      })
    }
    const unsubscribe = lenis.on('scroll', update)
    // Keep a single Lenis loop and suspend it while the page is backgrounded.
    let frame
    const tick = time => {
      lenis.raf(time)
      frame = requestAnimationFrame(tick)
    }
    const onVisibility = () => {
      cancelAnimationFrame(frame)
      if (!document.hidden) {
        lenis.resize()
        update()
        frame = requestAnimationFrame(tick)
      }
    }
    window.addEventListener('resize', update, { passive: true })
    document.addEventListener('click', onAnchorClick)
    document.addEventListener('visibilitychange', onVisibility)
    onVisibility()
    update()
    return () => {
      cancelAnimationFrame(frame)
      unsubscribe()
      observer.disconnect()
      window.removeEventListener('resize', update)
      document.removeEventListener('click', onAnchorClick)
      document.removeEventListener('visibilitychange', onVisibility)
      lenis.destroy()
      elements.forEach(element => {
        element.style.removeProperty('--parallax-y')
        element.removeAttribute('data-parallax-active')
      })
    }
  }, [enabled])
}

// The supplied recording loads only after a sound-enabled user gesture.
export function useMusic(src) {
  const [playing, setPlaying] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const player = useRef(null)
  const attempt = useRef(0)

  const stop = useCallback(() => {
    attempt.current += 1
    const audio = player.current
    if (audio) {
      audio.pause()
      // Cancel an initial stalled request; keep the position once playback is ready.
      if (audio.readyState < 2) {
        audio.removeAttribute('src')
        audio.load()
      }
    }
    setLoading(false)
    setPlaying(false)
  }, [])

  const start = useCallback(async () => {
    const request = ++attempt.current
    setError('')
    if (!src) return
    setLoading(true)
    try {
      if (!player.current) {
        const audio = new Audio()
        audio.preload = 'none'
        audio.loop = true
        audio.volume = 0.35
        player.current = audio
      }
      const audio = player.current
      const failed = () => {
        if (request !== attempt.current) return
        stop()
        setError('Sound could not start. Tap the sound button to try again.')
      }
      audio.onerror = failed
      audio.onwaiting = () => {
        if (request === attempt.current && !audio.paused) setLoading(true)
      }
      audio.onplaying = () => {
        if (request !== attempt.current) return
        setLoading(false)
        setPlaying(true)
      }
      if (!audio.getAttribute('src')) audio.src = src
      await audio.play()
      if (request !== attempt.current) return
      setLoading(false)
      setPlaying(true)
    } catch {
      if (request !== attempt.current) return
      stop()
      setError('Sound could not start. Tap the sound button to try again.')
    }
  }, [src, stop])

  useEffect(() => {
    const onVisibility = () => { if (document.hidden) stop() }
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      attempt.current += 1
      if (player.current) {
        player.current.onerror = null
        player.current.onwaiting = null
        player.current.onplaying = null
        player.current.pause()
        player.current.removeAttribute('src')
        player.current.load()
        player.current = null
      }
    }
  }, [src, stop])

  return { playing, loading, error, start, stop }
}
