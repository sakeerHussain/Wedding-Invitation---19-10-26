import { useCallback, useEffect, useRef, useState } from 'react'

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

export function useParallax(enabled) {
  useEffect(() => {
    if (!enabled || navigator.connection?.saveData) return
    const elements = [...document.querySelectorAll('[data-parallax]')]
    let frame = 0
    const update = () => {
      frame = 0
      for (const element of elements) {
        const { top, height } = element.parentElement.getBoundingClientRect()
        if (top < window.innerHeight && top + height > 0) {
          const distance = (window.innerHeight / 2 - top - height / 2) * 0.035
          element.style.setProperty('--parallax-y', `${Math.max(-24, Math.min(24, distance))}px`)
        }
      }
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
      elements.forEach(element => element.style.removeProperty('--parallax-y'))
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
