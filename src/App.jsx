import { useEffect, useRef, useState } from 'react'
import Envelope from './components/Envelope'
import MainInvitation from './components/MainInvitation'
import Petals from './components/Petals'
import { Icon } from './components/Ornament'
import { invitation } from './data/invitation'
import { useMusic, useInvitationScroll, useReducedMotion } from './hooks/useExperience'
import './App.css'

export default function App() {
  const [phase, setPhase] = useState('closed')
  const [motionPaused, setMotionPaused] = useState(false)
  const reducedMotion = useReducedMotion()
  const music = useMusic(invitation.audioSrc)
  const timer = useRef(null)
  const artworkReady = useRef(Promise.resolve())
  const openingLock = useRef(false)
  const cancelled = useRef(false)
  const openingTimer = useRef(null)
  const artworkTimeout = useRef(null)
  const heading = useRef(null)
  const isOpen = phase === 'open'
  const mainVisible = phase === 'revealing' || isOpen
  const motionEnabled = isOpen && !reducedMotion && !motionPaused
  useInvitationScroll(motionEnabled)

  useEffect(() => {
    const previous = document.body.style.overflow
    if (!isOpen) document.body.style.overflow = 'hidden'
    else {
      document.body.style.overflow = ''
      heading.current?.focus({ preventScroll: true })
    }
    return () => { document.body.style.overflow = previous }
  }, [isOpen])

  useEffect(() => {
    // Warm the next scene while the guest looks at the envelope.
    cancelled.current = false
    const desktop = window.matchMedia('(min-width: 1024px)')
    const warmArtwork = () => {
      const artwork = new Image()
      artwork.fetchPriority = 'low'
      artwork.decoding = 'async'
      artwork.src = desktop.matches ? '/images/stationery-layered-desktop.webp' : '/images/stationery-layered.webp'
      const flowers = new Image()
      flowers.fetchPriority = 'low'
      flowers.decoding = 'async'
      flowers.src = '/images/floral-corner-layer.webp'
      artworkReady.current = Promise.all([artwork.decode(), flowers.decode()]).catch(() => {})
    }
    warmArtwork()
    desktop.addEventListener('change', warmArtwork)
    return () => {
      cancelled.current = true
      desktop.removeEventListener('change', warmArtwork)
      clearTimeout(timer.current)
      clearTimeout(openingTimer.current)
      clearTimeout(artworkTimeout.current)
    }
  }, [])

  const open = async (withSound) => {
    if (phase !== 'closed' || openingLock.current) return
    openingLock.current = true
    setPhase('opening')
    if (withSound) void music.start()

    // Hold the fully revealed card until the next artwork has decoded.
    // A failed image or slow connection never traps the guest in the intro.
    await Promise.all([
      new Promise(resolve => { openingTimer.current = setTimeout(resolve, reducedMotion ? 80 : 1500) }),
      Promise.race([
        artworkReady.current,
        new Promise(resolve => { artworkTimeout.current = setTimeout(resolve, 8000) }),
      ]),
    ])
    clearTimeout(artworkTimeout.current)
    if (cancelled.current) return
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`)
    window.scrollTo(0, 0)
    setPhase('revealing')
    timer.current = setTimeout(() => {
      window.scrollTo(0, 0)
      setPhase('open')
    }, reducedMotion ? 80 : 350)
  }

  return (
    <div className={`invitation-app ${motionEnabled ? '' : 'motion-still'}`}>
      {!isOpen && <Envelope opening={phase === 'opening' || phase === 'revealing'} revealing={phase === 'revealing'} onOpen={() => void open(true)} onOpenMuted={() => void open(false)} />}
      {mainVisible && (
        <div inert={!isOpen}>
          <a className="skip-link" href="#celebration">Skip to wedding details</a>
          <MainInvitation headingRef={heading} />
        </div>
      )}
      {isOpen && (
        <>
          {motionEnabled && <Petals />}
          <div className="experience-controls">
            <button
              className="control-button motion-control"
              onClick={() => setMotionPaused(value => !value)}
              aria-pressed={motionPaused || reducedMotion}
              disabled={reducedMotion}
              aria-label={reducedMotion ? 'Motion reduced by your device settings' : motionPaused ? 'Resume decorative motion' : 'Pause decorative motion'}
              title={reducedMotion ? 'Reduced motion enabled' : motionPaused ? 'Resume motion' : 'Pause motion'}
            >
              <Icon name="flower" /><span>{motionPaused || reducedMotion ? 'Motion off' : 'Motion on'}</span>
            </button>
            <button
              className={`control-button sound-control ${music.playing ? 'is-playing' : ''}`}
              onClick={music.playing ? music.stop : music.start}
              aria-pressed={music.playing}
              aria-label={music.playing ? 'Mute music' : 'Play music'}
            >
              <Icon name={music.playing ? 'sound' : 'mute'} /><span>{music.playing ? 'Sound on' : 'Sound off'}</span>
            </button>
          </div>
          <span className="audio-status" role="status">{music.error}</span>
        </>
      )}
    </div>
  )
}
