# Performance optimization

This pass preserves the current layout, image contents, fonts, calligraphy, envelope animation timings, music, petal count/size/speed, subtle parallax limits, motion controls and navigation.

## Changes

- Existing images and fonts are imported from `src/assets` so Vite emits content-hashed URLs. Their SHA-256 checksums match the original files. Original public files remain available, including sharing artwork and font licenses.
- Vercel caches only the content-hashed `/assets/` files for one year with `immutable`. HTML keeps the platform's normal revalidation behavior. The SPA navigation rewrite is preserved. No service worker is introduced.
- HTML discovers the envelope and appropriate responsive intro background before React mounts. Four initial-view fonts are preloaded; the italic Lora face is prepared through the font readiness queue.
- The envelope, paper, seal and fonts receive priority before the next scene is warmed in idle time. An opening tap promotes the existing shared requests and prepares the card, transparent flowers and petal image.
- Image decoding and font loading are deduplicated. Settled failures do not prevent other assets from finishing. A bounded preparation phase prevents an immediate tap from animating an undecoded envelope. The existing 1.5-second opening and 350ms reveal are preserved, with the existing eight-second readiness deadline and a maximum 1.2-second envelope-preparation wait. Reduced-motion timings remain 80ms.
- A shared `SceneArt` component uses the same responsive image selection for the intro, interlude and closing. High-density phones reuse the larger background rather than fetching the smaller version later. Optional personal photos keep their separate path, alt text and lazy loading.
- Lenis runs from a single managed frame loop, which is cancelled while the document is hidden. Petal CSS animations pause and resume in place, without resetting their positions or changing counts. Existing audio behavior still stops music when the tab is hidden.
- Parallax remains visibility-aware and transform-only. Names, dates, quotations and interactive details remain stationary. No effects are removed or weakened.

## Verification

- ESLint and production build passed.
- Asset checksums confirm every copied image and font is byte-identical to its original.
- Production visual comparisons cover 320px, 390px, 900px and 1440px layouts, including 1x, 2x and 3x phone pixel density. Main floral-card images match pixel-for-pixel in five cases; the 3x phone differs in 0.0043% of pixels with a maximum channel difference of 2. The higher-density footer deliberately reuses the existing higher-resolution background. Font preparation changes the timing of loading on the opening screen, not its typography.
- At 390px / 3x density, the full-visit resource-body total in the local production preview decreased from 1,293,329 to 1,132,511 bytes. The obsolete extra 164,968-byte background request is absent. These local totals include uncompressed preview JavaScript and are not Vercel transfer measurements. On other tested layouts the total increased by about 4KB, primarily because the petal asset is now prepared even in reduced-motion tests; regular animated visits already needed that asset.
- JavaScript gzip size changed from approximately 81.17KB to 82.00KB; CSS gzip changed from 8.91KB to 9.01KB. Images are reused rather than recompressed.
- Immediate tap: main images decoded and names' fonts loaded before reveal, with unchanged petal DOM count.
- Failed or indefinitely delayed main artwork: opening remains bounded and venue navigation stays accessible.
- Wheel scrolling, emulated touch, anchors, target focus, data saver, motion pause/resume and live reduced-motion changes passed.
- Independent parallax motion, stationary text, travel bounds, offscreen compositor-hint cleanup and footer access passed at 320×568, 390×844, 900×1000, 1024×900 and 1440×900.
- Simulated hidden-tab events confirmed that the Lenis frame counter stopped and petals paused, then both resumed without remounting.
- Music play/mute passed.
- A cold 390px / 3x phone emulation with 150ms network latency, 200,000 bytes/sec download and 4× CPU throttling opened in approximately 3.4 seconds after the tap, with main artwork and fonts ready, no horizontal overflow and measured CLS 0 in that run. No LCP result was captured; do not interpret its unavailable value as zero or claim Core Web Vitals targets have been achieved.

## Deployment and remaining checks

Deploy the source files, including `src/assets`, through the normal Vercel build. Do not upload only the previous `dist` directory. Cache and responsive-image changes take effect after deployment. Confirm live `/assets/` response headers, then check physical Android/iPhone devices and WhatsApp's browser. Emulation cannot guarantee smoothness on every device or connection, and caching helps repeat visits more than a first visit.
