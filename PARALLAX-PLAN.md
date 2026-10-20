# Invitation parallax — implemented

## Scroll and movement

Lenis controls wheel scrolling and section navigation after the envelope opens. Touch swipes retain native momentum. The same Lenis scroll event updates three decorative layers:

| Area | Moving layer | Phone/tablet limit | Desktop limit |
| --- | --- | --- | --- |
| Main floral card | Separate transparent upper-left bouquet | ±28px | ±56px |
| Interlude / optional portrait | Background behind the stationary note | ±30px | ±60px |
| Closing | Transparent floral corner in the opposite direction | ±24px | ±48px |

The main card uses new portrait and landscape backgrounds with the upper-left bouquet removed, plus an independent transparent floral layer. The frame, paper, names, and date stay stationary. The closing reuses the same cached floral asset over its existing backdrop. The envelope, Arabic, quotations, event details and venue controls do not move with parallax.

## Performance and accessibility

- IntersectionObserver activates updates only for visible scenes, with a 32px margin to prepare incoming layers.
- Section bounds are read together before style updates. Scroll position does not trigger React state changes.
- Parallax changes only translate transforms. The existing petal cap remains unchanged.
- Compositor hints apply only while a scene is visible; no permanent `will-change` across the page.
- The interlude has 36px of vertical overscan on phone/tablet and 68px on desktop, exceeding its 30px / 60px travel limits. Foreground flowers are clipped within their sections, exposing paper rather than an empty edge as they move.
- Reduced motion, the motion control, and data saver disable smoothing and parallax, returning to native scrolling. Cleanup removes the Lenis instance, observer, listeners, transform variables and compositor hints.
- No extra animation framework, blur animation, scrolling pin, or scroll snapping is added.

## Asset preparation

The original assets remain available. Versioned layered backgrounds and an optimized transparent WebP bouquet are in `public/images`. The new backgrounds and bouquet are warmed during the envelope scene before the main invitation is revealed.

See PARALLAX-ARTWORK.md for generated asset paths and exact edit prompts, using the built-in imagegen tool.

## Validation

Check scrolling, section links, keyboard focus, motion toggles, changing reduced-motion settings, data saver, resize across 1024px, visible-scene activation, transform bounds, static text, opening scroll lock, and reaching the footer. Browser emulation complements physical-device testing; real iOS/Android and WhatsApp browsers should be checked before increasing the motion budget.

Lenis reference: https://github.com/darkroomengineering/lenis

Automated validation passed at 320×568, 390×844, 900×1000, 1024×900 and 1440×900. Checks confirmed independent flower transforms, unchanged name coordinates, per-layer travel bounds, offscreen hint cleanup, footer access, pause/resume and live reduced-motion changes. Lenis wheel, emulated touch, section navigation, destination focus and data-saver fallbacks also passed. Production build and ESLint passed.

Visibility refinement: the main corner uses 2.5× progress gain, clamped to its travel limit, so its movement is visible before the corner leaves the viewport. Foreground flowers remain tucked beyond their section edges at maximum travel.

