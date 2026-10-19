# The approved realistic stationery direction

The invitation now uses a photographic still-life environment and embossed stationery, following the approved two-screen concept. Text and controls remain HTML; none of the invitation content is flattened into the artwork.

## Structure

- `src/components/Envelope.jsx`: a real textured envelope cut into independently rendered body and flap layers using complementary SVG masks. A separate wax seal releases, the flap folds back, and the card rises before entering the main invitation. Reduced motion uses a short direct transition.
- `src/components/MainInvitation.jsx`: sculpted arch opening, deep olive verse panel, family invitation and event details, a personal note, arched venue insert, and a floral closing.
- `src/components/CalendarLink.jsx`: existing calendar behavior, extracted from the main page for readability.
- `src/App.css`: responsive composition and animation. Replaces the first design's sparse layout and repeated floating flower arrangement.
- `src/index.css`: adds the locally hosted Pinyon Script font for the inner card's handwritten accent. The main ampersand uses a readable italic face with separate fine-line flourishes.

All personal fields remain in `src/data/invitation.js`. The default unconfigured 'Bride’s name' and 'Groom’s name' display as 'Bride' and 'Groom' in the designed preview. Real names render unchanged, with type size adapted for longer names.

## Assets

New files in `public/images/`:

- `stationery-v2.webp`: cream embossed scalloped arch with gilded botanicals and blush roses.
- `scene-v2.webp` and `scene-v2-large.webp`: responsive paper, roses, gold tray and silk environment.
- `envelope-v2.webp`: transparent, embossed cotton-paper envelope, without a printed seal or text.
- `seal-v2.webp`: transparent, botanical gold wax seal.
- `petal-v2.webp`: one tiny, transparent photographic rose-petal texture, reused by the decorative particle layer.

These were created with built-in `image_gen.imagegen`, then resized and compressed to WebP while preserving alpha where present. Original assets are retained; new names avoid overwriting earlier artwork. Pinyon Script's Open Font License is in `public/fonts/`.

The main artwork is warmed while the intro is visible. On entry, the envelope holds its revealed-card state until the main artwork has decoded, with a bounded fallback if the image fails or the connection is slow. This prevents a sudden blank background between scenes. Reloading a previous section hash starts the opened invitation at its beginning.

## Final generation prompts

### Stationery (edit of approved two-screen concept)

Use case: precise-object-edit. The provided two-screen concept is the edit target. Extract and faithfully recreate ONLY its RIGHT HAND invitation stationery as a standalone tall portrait production background, about 1024x2048. Remove ALL text, letters, initials, Arabic, quotes, numbers, dividers, button, scroll arrow, UI, outer canvas and the entire left screen. Preserve the exquisite physical material realism: warm cream ivory handmade paper with visible subtle fibres, thick embossed scalloped Mughal arch frame around the interior, continuous embossed botanical stems and flowers down both edges, restrained metallic antique-gold gilded branches, photographic dusty blush roses and ivory baby's breath clustered upper left and lower right. Soft directional warm sunlight and believable microshadows. The interior reading area from x=22% to78% and y=25% to76% must be completely blank and visually quiet for live HTML names and text. Keep ornate arch header at y8-24%, roses concentrated on border corners, not covering interior. Bottom flowers concentrated bottom-right y80-100%. Flat front-on camera, full bleed rectangular image with no rounded screen corners, no surrounding border outside artwork. Match approved reference closely. No typography whatsoever, no mockup screen, no phone, no watermark.

### Scene (new generation)

Use case: photorealistic-natural. Asset type: portrait full-bleed background for an Islamic wedding invitation intro, 9:19 portrait composition. An exquisite flat lay real wedding stationery styling environment: warm champagne ivory silk with realistic folded fabric and soft organic diagonal folds concentrated along bottom left and bottom right; subtle matte ivory handmade paper surface in the middle. Photographic fresh dusty blush garden roses, small ivory baby's breath blossoms, understated olive leaves arranged in top-left corner and lower-left edge, small rose cluster near upper right. A small edge of antique gold decorative tray may peek out at top-left. Natural late afternoon daylight from upper-left, warm deep contact shadows, tasteful editorial fine art wedding photography, tangible silk and flowers. Large open uninterrupted calm cream space at center across x15-85% y20-85% where a separately rendered envelope and live text will be overlaid. IMPORTANT no envelope, no stationery card, no seal, no letters, no text, no handwriting, no typography, no people, no UI, no drawn vectors. Keep upper center area quiet for a title. Elegant richly styled but natural not glossy plastic or overexposed. Match warm ivory, dusty blush, aged champagne gold palette of luxurious embossed wedding stationery.

### Envelope (new generation)

Use case: product-mockup. Asset type: isolated realistic closed envelope layer for a website animation. A SINGLE horizontal rectangular luxury wedding envelope, perfectly straight and squared to camera, photographed directly overhead, no rotation, no perspective trapezoid. Genuinely transparent background. Aspect ratio of envelope width to height about 1.45:1. Leave transparent margin of 5% on left/right and 10% top/bottom, envelope fills remaining rectangle. Ivory warm cream heavyweight handmade cotton paper with exquisitely embossed small botanical flowers and leaves; fine visible paper fibres, slightly deckled natural edges. Closed conventional TRIANGULAR top flap: straight horizontal hinge along entire top envelope edge, left and right diagonal fold edges meet at one central downward tip around 65% of envelope height. Flap occupies top 65% of envelope body; clearly layered sides and bottom paper visible underneath, convincing overlap shadows, flap edge casts fine soft shadow. Warm directional daylight from upper left. Center area of triangle tip is plain ivory so separate gold seal can be overlaid. NO wax seal, NO ribbon, NO string, NO cord, NO flowers resting on top, NO text, NO lettering, NO background, NO hands, NO surrounding objects. Premium physically realistic photographic object, not vector art, not paper illustration, not gradients. Embossing is dimensional relief in cream paper, not printed gold. Preserve alpha transparency and include the entire envelope without cropping.

### Seal (new generation)

Use case: product-mockup. Asset type: isolated gold wax seal cutout for a realistic wedding envelope website. A SINGLE antique champagne-gold wax seal seen straight overhead, very slightly irregular organic circular rim, botanical olive sprig embossed into center with delicate stem and small leaves, no initials no letters. Real poured sealing wax, warm rich gold highlights, darker recessed embossing, beautiful tactile imperfect scalloped wax rim, slight wax thickness visible along bottom edge, warm directional sunlight from upper left. Genuinely transparent background, very generous transparent margin around the object, seal fills 70% of square image. No envelope, no paper, no surrounding scene, no drop shadow stretching far beyond the seal, no coins, no jewellery, no metal badge, no text, no watermark. Photographic premium wedding stationery detail, physically realistic rather than flat digital icon.

### Petal (new generation)

Use case: product-mockup. Asset type: tiny realistic rose-petal particle for an elegant wedding invitation. Exactly ONE isolated detached soft dusty-blush garden rose petal, gracefully cupped and gently curled with translucent thin edges and a rounded irregular silhouette, photographic fine botanical macro detail and delicate visible veins. Warm pale rose / champagne pink, no saturated red or orange, natural daylight from upper left, soft shading on petal itself. Genuinely transparent background, no ground plane, no cast shadow, no stem, no whole flower, no text, no other objects, no watermarks. Petal centered and occupies 70% of square canvas. Realistic matte organic material, not flat vector or teardrop icon. It will be shown at 10–18 pixels in a falling-petal animation, so maintain a distinct simple silhouette.
