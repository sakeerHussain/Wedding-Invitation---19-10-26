import { invitation } from '../data/invitation'
import { assets } from '../lib/assets'
import Ornament from './Ornament'
import familyPaper from '../assets/images/family-paper.webp'
import medallion from '../assets/images/family-medallion.webp'
import vine from '../assets/images/family-vine.webp'
import './CoupleDetails.css'

export default function CoupleDetails() {
  const people = [
    { person: invitation.bride, relation: 'Daughter of', initial: invitation.initials[0], id: 'bride' },
    { person: invitation.groom, relation: 'Son of', initial: invitation.initials[1], id: 'groom' },
  ]

  return (
    <section className="couple-details" id="the-couple" aria-labelledby="couple-details-title">
      <picture className="couple-paper" aria-hidden="true">
        <source media="(min-width: 1024px)" srcSet={assets.paper} />
        <img src={familyPaper} width="780" height="1686" alt="" loading="lazy" decoding="async" />
      </picture>
      <img className="couple-desktop-flowers couple-desktop-flowers-top" src={assets.flowers} width="520" height="433" alt="" aria-hidden="true" loading="lazy" decoding="async" />
      <img className="couple-desktop-flowers couple-desktop-flowers-bottom" src={assets.flowers} width="520" height="433" alt="" aria-hidden="true" loading="lazy" decoding="async" />

      <header className="couple-heading">
        <h2 id="couple-details-title">Us</h2>
        <Ornament />
        <p>A beautiful union, blessed by family.</p>
      </header>

      <div className="couple-profiles">
        {people.map(({ person, relation, initial, id }, index) => {
          const [firstName, ...remainingNames] = (person.profileName || person.name).trim().split(/\s+/)
          const parents = [person.parents?.father, person.parents?.mother].filter(Boolean)
          const addressParts = person.address?.split(', ') || []
          const addressLines = [addressParts.slice(0, 2).join(', '), addressParts.slice(2).join(', ')].filter(Boolean)
          return (
            <article className={`couple-profile couple-profile-${id}`} key={id} aria-labelledby={`${id}-details-name`}>
              <div className="couple-monogram" aria-hidden="true">
                <img src={medallion} width="440" height="440" alt="" loading="lazy" decoding="async" />
                <span>{initial}</span>
              </div>
              <div className={`couple-vine ${index === people.length - 1 ? 'couple-vine-final' : ''}`} aria-hidden="true"><img src={vine} width="260" height="600" alt="" loading="lazy" decoding="async" /></div>
              <div className="couple-profile-copy">
                <h3 className="couple-profile-name" id={`${id}-details-name`}>
                  {firstName}{remainingNames.length > 0 && <><br />{remainingNames.join(' ')}</>}
                </h3>
                {parents.length > 0 && <>
                  <p className="couple-relation">{relation}</p>
                  <p className="couple-parents">{parents.map(parent => <span key={parent}>{parent}</span>)}</p>
                </>}
                {person.address && <p className="couple-family-address">{addressLines.map((line, lineIndex) => <span key={line}>{line}{lineIndex < addressLines.length - 1 ? ',' : ''}</span>)}</p>}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
