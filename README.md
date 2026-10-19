# An Ivory Garden — a digital wedding invitation

React + Vite + Tailwind CSS. The current design follows the approved realistic stationery concept: photographic roses and silk, an embossed envelope and wax seal, a sculpted arch, and live HTML typography.

## Develop and build

```sh
npm install
npm run dev
npm run lint
npm run build
npm run preview
```

## Personalize

Edit `src/data/invitation.js` for names, initials, families, date, event details, venue, directions link, phone, music and photograph. No real personal information has been assumed. The unconfigured preview displays 'Bride' and 'Groom'.

- `dateTime`: ISO timestamp with timezone. Enables the Google Calendar link. Add `endDateTime` or the calendar entry defaults to two hours.
- `venue.mapsUrl`: your venue's map link; enables directions when present.
- `contact.phone`: your contact number; enables a telephone link when present.
- `photoSrc` and `photoAlt`: replace the botanical interlude with a personal image.
- `audioSrc`: path to your chosen local recording. Leave empty for the original ambient notes.

Before sharing, personalize the title, description and Open Graph metadata in `index.html`, including an absolute deployed sharing-image URL and the site's `og:url`.

## Design and implementation

- `src/components/Envelope.jsx`: photographic envelope body, masked flap, separate wax seal and inner card. Entry waits for the main artwork to decode before completing its transition.
- `src/components/MainInvitation.jsx`: framed opening, Quranic excerpt, family and event details, personal note, venue insert and closing.
- `src/components/CalendarLink.jsx`: calendar date handling.
- `src/hooks/useExperience.js`: reduced motion, restrained parallax and visitor-controlled music. Audio pauses when the tab becomes hidden.
- `src/App.css`: the responsive composition and motion; `src/index.css`: theme tokens and local fonts.

Artwork is optimized WebP. The same tiny petal texture is reused for eight visible petals on phones and ten on desktop. There is no WebGL renderer, video background, scroll hijacking or animation dependency. Motion respects device preferences and can also be paused manually.

Artwork sources, built-in ImageGen prompts and the revised design details are retained in `DESIGN-REVISION.md`. Local fonts include their Open Font Licenses in `public/fonts/`.

The Arabic and English quotation is an excerpt from Surah Ar-Rum 30:21, with a source link in the invitation. The decorative images contain no baked-in religious text or wedding details.

Browser checks cover phone, landscape and desktop layouts, the envelope flow, motion controls, calendar/timezone conversion, optional links, long names and delayed main artwork. Real iPhone/Android and WhatsApp browser checks are still needed before the final invitation is shared.
