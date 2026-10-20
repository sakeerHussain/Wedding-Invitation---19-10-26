import Ornament, { Icon } from './Ornament'
import CalendarLink from './CalendarLink'
import { invitation } from '../data/invitation'

// Keep the unconfigured preview graceful without inventing a couple's names.
const previewName = (name, fallback) => /^(Bride|Groom)[’']s name$/.test(name) ? fallback : name
const nameScale = name => Math.max(0.43, Math.min(1, 8 / name.length))
const initialCapital = name => name.replace(/(^|[\s-])\p{L}/gu, letter => letter.toLocaleUpperCase())

export default function MainInvitation({ headingRef }) {
  const bride = initialCapital(previewName(invitation.bride.introName || invitation.bride.name, 'Bride'))
  const groom = initialCapital(previewName(invitation.groom.introName || invitation.groom.name, 'Groom'))

  return (
    <main id="invitation" className="wedding-document">
      <section className="hero" id="beginning" aria-labelledby="couple-title" data-parallax-scene="">
        <picture>
          <source media="(min-width: 1024px)" srcSet="/images/stationery-layered-desktop.webp" />
          <img className="hero-stationery" src="/images/stationery-layered.webp" width="900" height="1800" alt="" fetchPriority="high" />
        </picture>
        <div className="floral-depth hero-floral-depth" data-parallax="" data-parallax-mobile="28" data-parallax-desktop="56" data-parallax-strength="2.5" aria-hidden="true">
          <img src="/images/floral-corner-layer.webp" width="520" height="433" alt="" decoding="async" />
        </div>
        <div className="hero-content">
          <p className="hero-invitation-line">With grateful hearts, <br className="invitation-break" />we invite you to celebrate <br />our Nikah</p>
          <Ornament />
          <h1 id="couple-title" ref={headingRef} tabIndex="-1">
            <span style={{ '--name-scale': nameScale(bride) }}>{bride}</span>
            <em className="couple-ampersand">&amp;</em>
            <span style={{ '--name-scale': nameScale(groom) }}>{groom}</span>
          </h1>
          <Ornament />
          <p className="date-label">{invitation.dateLabel}</p>
        </div>
        <a className="scroll-link" href="#a-promise"><span>OUR STORY BEGINS</span><Icon name="down" /></a>
      </section>

      <nav className="invitation-nav" aria-label="Invitation sections">
        <a href="#a-promise">THE PROMISE</a>
        <span aria-hidden="true">✧</span>
        <a href="#celebration">THE CELEBRATION</a>
        <span aria-hidden="true">✧</span>
        <a href="#venue">THE VENUE</a>
      </nav>

      <section className="promise-section" id="a-promise" aria-labelledby="promise-title">
        <div className="promise-frame" aria-hidden="true" />
        <div className="promise-content">
          <span className="eyebrow">IN HIS LOVE, WE FIND OURS</span>
          <p className="arabic-verse" lang="ar" dir="rtl">وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً</p>
          <h2 id="promise-title">“And He has placed<br />between you<br /><em>compassion and mercy.</em>”</h2>
          <a className="verse-source" href="https://quran.com/30:21" target="_blank" rel="noreferrer">SURAH AR-RUM · 30:21<span className="sr-only"> (verse excerpt; opens in a new tab)</span></a>
          <Ornament />
          <p className="body-copy">Two paths, brought together by His grace.<br />One promise, made with love.</p>
        </div>
      </section>

      <section className={`celebration-section section-space ${invitation.bride.family || invitation.groom.family ? '' : 'no-family-details'}`} id="celebration" aria-labelledby="celebration-title">
        <div className="section-heading">
          <span className="eyebrow">A DAY OF LOVE & BLESSINGS</span>
          <h2 id="celebration-title">The celebration</h2>
          <Ornament />
          <p>Together with our families,<br />we would be honoured by your presence.</p>
        </div>

        {(invitation.bride.family || invitation.groom.family) && <div className={`family-line ${invitation.bride.family && invitation.groom.family ? '' : 'single-family'}`}>
          {invitation.bride.family &&
          <div><span className="family-caption">WITH THE LOVE OF</span><span>{invitation.bride.family}</span></div>
          }
          {invitation.bride.family && invitation.groom.family && <span className="family-ampersand">&</span>}
          {invitation.groom.family &&
          <div><span className="family-caption">WITH THE BLESSINGS OF</span><span>{invitation.groom.family}</span></div>
          }
        </div>}

        <div className="event-list">
          {invitation.events.map((event, index) => (
            <article className="event" key={`${event.title}-${index}`}>
              <span className="event-number">0{index + 1}</span>
              <Ornament />
              <h3>{event.title}</h3>
              {event.date && <time className="event-date" dateTime={event.dateTime}>{event.date}</time>}
              <p>{event.description}</p>
              <span className="event-time">{event.time}</span>
              <CalendarLink event={event} />
            </article>
          ))}
        </div>
      </section>

      <section className={`interlude ${invitation.photoSrc ? 'has-photo' : ''}`} aria-label="A lifetime together" data-parallax-scene="">
        <div className="interlude-backdrop" data-parallax="" data-parallax-mobile="30" data-parallax-desktop="60">
          <picture>
            {!invitation.photoSrc && <source media="(min-width: 1024px)" srcSet="/images/scene-desktop.webp" />}
            <img src={invitation.photoSrc || '/images/scene-v2.webp'} alt={invitation.photoSrc ? invitation.photoAlt : ''} width="900" height="1800" loading="lazy" decoding="async" />
          </picture>
        </div>
        <div className="vow-note">
          <span className="eyebrow">BY HIS GRACE, SIDE BY SIDE</span>
          <h2>A lifetime<br />of love.<br /><em>A home<br />of peace.</em></h2>
          <Ornament />
          <p>Some beginnings are written<br />long before we find them.</p>
        </div>
      </section>

      <section className="venue-section section-space" id="venue" aria-labelledby="venue-title">
        <div className="section-heading">
          <span className="eyebrow">WHERE MEMORIES WILL BLOOM</span>
          <h2 id="venue-title">A place to gather</h2>
        </div>
        <div className="venue-stage">
          <div className="venue-insert">
            <span className="venue-monogram" aria-hidden="true">{invitation.initials[0]}<em>&</em>{invitation.initials[1]}</span>
            <Ornament />
            <h3>{invitation.venue.name}</h3>
            <p className="venue-address">{invitation.venue.address || 'The setting for our special day will be shared here.'}</p>
            <span className="venue-rule" />
            <div className="venue-schedule">
              {invitation.events.map(event => <p key={event.title}><span>{event.title}</span><span>{event.date} · {event.time}</span></p>)}
            </div>
            {invitation.venue.mapsUrl && (
              <a className="button" href={invitation.venue.mapsUrl} target="_blank" rel="noreferrer"><Icon name="pin" /> Get directions <Icon name="arrow" /></a>
            )}
          </div>
        </div>
        <p className="venue-note">Your journey to us means the world.</p>
      </section>

      <footer className="closing section-space" data-parallax-scene="">
        <div className="closing-art" aria-hidden="true">
          <picture>
            <source media="(min-width: 1024px)" srcSet="/images/scene-desktop.webp" />
            <img src="/images/scene-v2.webp" width="900" height="1800" alt="" loading="lazy" />
          </picture>
        </div>
        <div className="floral-depth closing-floral-depth" data-parallax="" data-parallax-mobile="24" data-parallax-desktop="48" data-parallax-direction="-1" aria-hidden="true">
          <img src="/images/floral-corner-layer.webp" width="520" height="433" alt="" loading="lazy" decoding="async" />
        </div>
        <div className="closing-content">
          <Ornament />
          <span className="eyebrow">WITH LOVE & GRATEFUL HEARTS</span>
          <h2>Our beginning.<br /><em>Made brighter by you.</em></h2>
          <p>{invitation.closing}</p>
          <p className="closing-names">{invitation.bride.name} <em>&</em> {invitation.groom.name}</p>
          {invitation.contact.phone && <a className="text-button" href={`tel:${invitation.contact.phone.replace(/[^+\d]/g, '')}`}>{invitation.contact.label}</a>}
          <p className="closing-arabic" lang="ar" dir="rtl">إِنْ شَاءَ ٱللَّٰهُ</p>
          <span className="eyebrow closing-signoff">A BEAUTIFUL BEGINNING, TOGETHER.</span>
        </div>
      </footer>
    </main>
  )
}
