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

// A tiny original pentatonic ambient score. No audio download or animation loop.
// An optional supplied recording replaces this through invitation.audioSrc.
export function useMusic(src) {
  const [playing, setPlaying] = useState(false)
  const [error, setError] = useState('')
  const engine = useRef(null)
  const interval = useRef(null)
  const stopped = useRef(true)

  const stop = useCallback(() => {
    stopped.current = true
    clearInterval(interval.current)
    const current = engine.current
    if (current?.audio) current.audio.pause()
    if (current?.context?.state === 'running') current.context.suspend().catch(() => {})
    setPlaying(false)
  }, [])

  const start = useCallback(async () => {
    setError('')
    stopped.current = false
    try {
      if (src) {
        if (!engine.current) {
          const audio = new Audio(src)
          audio.loop = true
          audio.volume = 0.35
          engine.current = { audio }
        }
        await engine.current.audio.play()
      } else {
        if (!engine.current) {
          const AudioContext = window.AudioContext || window.webkitAudioContext
          if (!AudioContext) throw new Error('Audio unavailable')
          engine.current = { context: new AudioContext(), phrase: 0 }
        }
        const current = engine.current
        await current.context.resume()
        if (stopped.current) { stop(); return }
        const phrases = [[261.63, 329.63, 392], [220, 261.63, 329.63], [174.61, 261.63, 349.23], [196, 293.66, 392]]
        const schedule = () => {
          if (current.context.state !== 'running') return
          const notes = phrases[current.phrase++ % phrases.length]
          notes.forEach((frequency, index) => {
            const oscillator = current.context.createOscillator()
            const gain = current.context.createGain()
            const now = current.context.currentTime + index * 0.45
            oscillator.type = 'sine'
            oscillator.frequency.value = frequency
            gain.gain.setValueAtTime(0, now)
            gain.gain.linearRampToValueAtTime(0.025, now + 0.08)
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.6)
            oscillator.connect(gain).connect(current.context.destination)
            oscillator.start(now)
            oscillator.stop(now + 3.7)
            oscillator.onended = () => { oscillator.disconnect(); gain.disconnect() }
          })
        }
        schedule()
        clearInterval(interval.current)
        interval.current = setInterval(schedule, 4600)
      }
      if (stopped.current) { stop(); return }
      setPlaying(true)
    } catch {
      stop()
      setError('Sound could not start. Tap the sound button to try again.')
    }
  }, [src, stop])

  useEffect(() => {
    const onVisibility = () => { if (document.hidden) stop() }
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      clearInterval(interval.current)
      engine.current?.audio?.pause()
      engine.current?.context?.close().catch(() => {})
      engine.current = null
    }
  }, [stop])

  return { playing, error, start, stop }
}
