# Desktop composition

Desktop and mobile share the content and behavior, but use different compositions. The desktop breakpoint is 1024px.

## What changed

- The intro becomes a landscape scene with heading and actions on the left and the envelope on the right.
- A dedicated landscape stationery background replaces the narrow portrait card on desktop. Names sit across the page rather than stacking in a phone-shaped column.
- The page expands to a maximum of 1440px with quiet paper margins. Oversized portrait flowers are no longer stretched behind the document.
- Family details and ceremony details use two columns. The venue heading and paper insert sit alongside one another.
- `<picture>` sources select the artwork for the viewport. Mobile does not download the desktop artwork. The preloader also follows the active breakpoint and updates when it changes.
- Mobile retains its approved portrait assets, layout, envelope behavior, sound and reduced-motion support.

## New artwork

Created with built-in `image_gen.imagegen`, then optimized to 1600px WebP:

- `public/images/scene-desktop.webp`
- `public/images/stationery-desktop.webp`

### Final scene prompt

Use case: photorealistic-natural. Asset type: wide landscape background for the DESKTOP version of a realistic wedding invitation. Landscape 16:9, high resolution. Warm ivory handmade paper resting on champagne silk, fine matte paper texture and soft natural light from upper left. Realistic soft blush garden roses, baby's breath, muted olive leaves and a tiny hint of antique-gold tray confined to far upper-right corner and far lower-left corner, floral arrangements occupy no more than 15 percent of image width each. Ivory silk folds mostly along bottom and right edges. Beautiful restrained fine-art wedding stationery photography. Keep BOTH main content zones completely clear and calm: left half from x10-45%, y20-75% for dark live typography; right half x50-88%, y15-80% for a separately rendered envelope. No envelope, no cards, no seals, no letters, no writing, no Arabic, no typography, no people, no UI. Do not put large flowers or high contrast shadows across the middle. Cohesive warm cream, blush, champagne gold and olive. Real material detail with gentle contact shadows. Not a portrait image cropped to landscape, compose intentionally for a widescreen website.

### Final stationery prompt

Use case: stylized-concept. Asset type: wide landscape sculpted stationery background for desktop Islamic wedding invitation hero. Landscape 16:9 high resolution, perfectly front-on flat view. Exquisite ivory cotton paper with a dimensional sculpted scalloped Mughal arch frame adapted to a WIDE HORIZONTAL composition: arch top extends elegantly across the top third and sides, lower ivory paper border along bottom. Fine embossed botanical relief and small antique-gold gilded stems along outer edges. Photographic dusty blush garden roses, small ivory flowers and baby's breath concentrated in the upper-left and lower-right corners, with floral clusters constrained mainly outside x15-85% and not intruding into central reading area. Interior completely blank calm warm ivory paper, especially x20-80% y25-78%, to place a live one-line 'Bride & Groom' title plus short invitation text. Preserve tactile paper relief, warm natural directional lighting, believable microshadows, refined rich material realism. This is a landscape counterpart to ornate floral portrait wedding stationery. NOT a portrait card displayed inside a wide image, NOT multiple panels, NO phone mockup. Full-bleed rectangular wide stationery only, no surrounding scene, no round screen corners. Absolutely no text, no letters, no Arabic, no names, no ornaments or dividers in the central blank reading area, no UI, no people, no watermark. All typography will be real HTML.
