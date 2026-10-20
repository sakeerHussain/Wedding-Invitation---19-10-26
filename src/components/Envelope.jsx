import Ornament, { Icon } from './Ornament'
import { invitation } from '../data/invitation'
import { assets } from '../lib/assets'
import SceneArt from './SceneArt'

export default function Envelope({ opening, preparing, revealing, onOpen, onOpenMuted }) {
  const busy = preparing || opening
  return (
    <section className={`intro ${opening ? 'is-opening' : ''} ${revealing ? 'is-revealing' : ''}`} aria-label="Open your wedding invitation">
      <svg className="layer-definitions" aria-hidden="true" width="0" height="0">
        <defs>
          <clipPath id="envelope-flap-cut" clipPathUnits="objectBoundingBox">
            <path d="M.035 .145H.967C.967 .19 .95 .22 .92 .25L.525 .608Q.5 .63 .475 .608L.09 .25C.05 .22 .035 .19 .035 .145Z" />
          </clipPath>
          <clipPath id="envelope-body-cut" clipPathUnits="objectBoundingBox">
            <path clipRule="evenodd" fillRule="evenodd" d="M0 0H1V1H0ZM.035 .145H.967C.967 .19 .95 .22 .92 .25L.525 .608Q.5 .63 .475 .608L.09 .25C.05 .22 .035 .19 .035 .145Z" />
          </clipPath>
        </defs>
      </svg>
      <div className="intro-backdrop" aria-hidden="true">
        <SceneArt loading="eager" fetchPriority="high" />
      </div>

      <div className="intro-heading">
        <h1 className="bismillah" lang="ar" dir="rtl">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</h1>
        <Ornament />
      </div>

      <div className="envelope-scene">
        <button
          className="envelope-button"
          onClick={onOpen}
          disabled={busy}
          aria-label="Open wedding invitation with sound"
        >
          <span className="envelope-stage" aria-hidden="true">
            <span className="envelope-cavity" />
            <span className="envelope-letter">
              <span className="letter-label">WITH LOVE, YOU ARE INVITED</span>
              <span className="letter-title letter-monogram">{invitation.initials[0]} <em>&</em> {invitation.initials[1]}</span>
              <span className="letter-date">{invitation.dateLabel}</span>
              <Ornament />
            </span>
            <img className="envelope-body" src={assets.envelope} width="1200" height="800" alt="" decoding="async" fetchPriority="high" />
            <span className="flap-layer">
              <img className="envelope-flap" src={assets.envelope} width="1200" height="800" alt="" decoding="async" />
            </span>
            <span className="seal-layer">
              <img className="wax-seal" src={assets.seal} width="240" height="240" alt="" decoding="async" />
            </span>
          </span>
        </button>
      </div>

      <div className="intro-action">
        <Ornament />
        <button className="open-button" onClick={onOpen} disabled={busy}>
          {busy ? 'UNFOLDING YOUR INVITATION' : 'OPEN YOUR INVITATION'}
          <Icon name="arrow" />
        </button>
        <p className="sound-note intro-couple"><span>{invitation.bride.introName || invitation.bride.name}</span> <em>&</em> <span>{invitation.groom.introName || invitation.groom.name}</span></p>
        <button className="text-button" onClick={onOpenMuted} disabled={busy}>Open without sound</button>
      </div>
    </section>
  )
}
