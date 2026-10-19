import Ornament, { Icon } from './Ornament'
import { invitation } from '../data/invitation'

export default function Envelope({ opening, revealing, onOpen, onOpenMuted }) {
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
        <picture>
        <source media="(min-width: 1024px)" srcSet="/images/scene-desktop.webp" />
        <img
          src="/images/scene-v2.webp"
          srcSet="/images/scene-v2.webp 900w, /images/scene-v2-large.webp 1440w"
          sizes="(min-width: 800px) 800px, 100vw"
          width="900" height="1800" alt="" fetchPriority="high"
        />
        </picture>
      </div>

      <div className="intro-heading">
        <h1 className="bismillah" lang="ar" dir="rtl">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</h1>
        <Ornament />
      </div>

      <div className="envelope-scene">
        <button
          className="envelope-button"
          onClick={onOpen}
          disabled={opening}
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
            <img className="envelope-body" src="/images/envelope-v3.webp" width="1200" height="800" alt="" fetchPriority="high" />
            <span className="flap-layer">
              <img className="envelope-flap" src="/images/envelope-v3.webp" width="1200" height="800" alt="" />
            </span>
            <span className="seal-layer">
              <img className="wax-seal" src="/images/seal-v2.webp" width="240" height="240" alt="" />
            </span>
          </span>
        </button>
      </div>

      <div className="intro-action">
        <Ornament />
        <button className="open-button" onClick={onOpen} disabled={opening}>
          {opening ? 'UNFOLDING YOUR INVITATION' : 'OPEN YOUR INVITATION'}
          <Icon name="arrow" />
        </button>
        <p className="sound-note intro-couple"><span>{invitation.bride.introName || invitation.bride.name}</span> <em>&</em> <span>{invitation.groom.introName || invitation.groom.name}</span></p>
        <button className="text-button" onClick={onOpenMuted} disabled={opening}>Open without sound</button>
      </div>
    </section>
  )
}
