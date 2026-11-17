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

### WhatsApp sharing preview

`index.html` includes static Open Graph metadata for `https://wedding-invitation-19-10-26.vercel.app/`, with Amina S and Sakeer Hussain S, the Nikkah date (24 December 2026), and the venue. These tags are present before JavaScript runs so sharing crawlers can read them.

- Preview artwork: `public/images/wedding-preview-v1.jpg` (1200 × 630 JPEG).
- Editable artwork source: `scripts/sharing-preview.html`. It reuses the site's floral backdrop and local fonts. Render it at exactly 1200 × 630 after fonts and background have loaded, then export a JPEG at quality 90 to the preview artwork path.
- If the domain changes, update the canonical URL, `og:url`, and every absolute image URL in `index.html`.
- For future artwork revisions, use a new image filename and update both Open Graph and Twitter image tags.

Redeploy this checkout to Vercel before sharing. Confirm the live page source includes the new tags and `/images/wedding-preview-v1.jpg` opens as an image. Paste the invitation URL into a new WhatsApp message and allow the preview to load before sending. Existing sent messages may retain their earlier preview; a fresh link preview is controlled by WhatsApp and has not been verified from this checkout.

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
