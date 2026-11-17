GATE: OPEN 8 (rounds used up)

# Design refinement QA — 16 November 2026

Product-specific responsive and interaction checks passed. The installed skill's commercial-template gate did not pass; all open findings are recorded below. No waivers were added and no checker files were edited.

## Scope and preserved work

Modified presentation only: src/App.css, src/index.css, src/components/CoupleDetails.css. Added DESIGN-REFINEMENT.md and this report. No new dependencies, fonts, images, routes, data models, hooks, state logic, or event handlers. Existing uncommitted index.html, MainInvitation.jsx, invitation.js, and couple-details implementation/assets were preserved. MainInvitation.jsx SHA-256 equals the pre-refinement backup. No commit, push, or deployment performed.

## Design system and direction

Private Islamic wedding invitation, adapted from the skill rather than recast as a company landing page. Existing ivory, antique gold, blush flowers, and olive blessing section retained. Existing locally hosted Lora/Manrope text and Great Vibes/Pinyon names retained; no new font pairing dealt. Existing centered floral hero, sealed envelope entrance, linked monograms, tilted paper interlude, and arch venue card retained. No shader, WebGL, stock photographs, new scene or dealt moment added. Voice: existing formal and romantic family invitation copy, unchanged. No new assumptions or invented personal details; parent placeholders remain as requested.

Shared CSS variables now govern heading, body and label sizes, gutter, section spacing, muted ink and focus color. Supporting copy is generally 16px, main action labels 14px, fixed controls 12px. Three phone navigation columns provide 48px targets. Calendar action is 48px; muted opening is 44px. Desktop headings share a left edge and scale. The desktop hero fills the available first screen; tablet stationery scales proportionally across the former 800px breakpoint. Hover/press feedback uses short transforms and respects the existing global reduced-motion rule.

## Automated and browser checks

- npm run build: passed.
- npm run lint: passed.
- package.json declares no typecheck or automated test command; no TypeScript added.
- Edge/Chromium via authorized local Playwright: 320x568, 390x844, 768x1024, 820x1180, 1024x768, 1440x900.
- All six sizes: no horizontal overflow, hero text collision, profile-name overflow, broken image response, or browser JavaScript error. Existing navigation and primary/fixed controls satisfy 44px minimum target height. Intro envelope and action do not collide.
- Keyboard: first intro tab reaches envelope, keyboard focus ring appears on main navigation, opening transfers focus to the names, Enter activates anchor navigation. Skip link remains in existing markup. Programmatic hero heading no longer removes the keyboard focus indicator.
- Existing scroll regression: desktop wheel, emulated mobile touch, opening scroll lock, all section-anchor behavior, 28px anchor offset and destination focus, subtle parallax bounds, motion off/on, reduced motion, and data saver: passed.
- Google Calendar query: Nikah start 20261224T063000Z, editable end 20261224T083000Z, Asia/Kolkata, unchanged couple/location details. Google Maps href retains supplied Sana Auditorium destination. Every internal hash resolves to an element.
- Production loading regression: original image/font bytes preserved, hashed preloads and Vercel cache/rewrite configuration retained. Immediate opening, decoded main artwork, font readiness, unchanged petal count/shared texture, hidden-tab Lenis/petal pause/resume, and music play/mute state passed.
- Failed artwork and deliberately unresolved main artwork: opening remains bounded and venue navigation works. Existing audio error status remains unchanged.
- Visual review: mobile/desktop intro, hero, blessing, couple details, celebration, venue, interlude and closing; tablet hero. Final screenshots and geometry JSON saved in design/refinement and shared chat workspace taste-refinement/after.

## Skill checker: eight open commercial-template findings

The checker starts on the closed envelope, and does not operate the opening interaction. It therefore does not inspect the opened main invitation. The interaction checks above explicitly open and inspect it. These findings are left visible instead of changing approved behavior or hiding content from the checker:

1. cta: no .hero button found at div#root. The entry already has working envelope/open/muted buttons; there is no commercial purchase flow.
2. copy-headline: Arabic Bismillah does not name a category being sold. Preserve the user's religious opening.
3. copy-fact: closed intro has no visible hard fact. The date is on the revealed invitation; preserve the existing envelope composition.
4. tilt: approved envelope is rotated -8 degrees. Preserve tactile stationery design and animation.
5. effect-kind: Lenis not allowed on the checker's closest category, place. Explicit user requirement preserves Lenis and subtle parallax.
6. moment-none: no skill-dealt corporate moment. Preserve existing envelope opening instead of adding a new scroll effect.
7. container-edges: React div#root does not match prescribed body/header/main shell. Preserve framework/component structure.
8. container: no kit .wrap. Preserve existing tested selectors and components rather than import a global layout kit.

No waivers. Remaining warnings include Arabic-heading English word-count/scale assumptions, system Arabic font fallback, skip link absent while closed, and contrast sampled on the small A & S letter behind the envelope. The visible main text/focus styles were inspected directly; this is not a claim of a formal WCAG audit. The previously flagged 40px muted action was enlarged to 44px and is absent from the final gate warning summary.

## Skill performance report

Production opening screen, median of three CPU-rendered loads; host busy (60% sampled initially). These are local lab figures, not physical-mobile or field measurements. The scanner does not open the envelope, so these numbers describe the entry and its warmed assets, not the fully scrolled document.

- 1440px: 866.6 KiB transfer, 17 requests, 70ms blocking time, 684ms FCP/LCP, CLS 0.000.
- 390px: 990.4 KiB transfer, 16 requests, 0ms blocking time, 336ms FCP/LCP, CLS 0.000.
- Both: 259.3 KiB parsed JS, 10.6 KiB compressed CSS, no WebGL contexts or broken requests. JavaScript and original asset bytes unchanged.
- Three preset-budget FAIL rows remain: four existing font families at desktop; four at mobile; four oversized-image instances at mobile (including duplicated envelope layers and existing embossed paper). These retain the approved distinct name initials and high-resolution artwork. No fonts or artwork were removed or recompressed under a visual-only request.
- Six WARN rows: font files/bytes and busy-host timing caveats. Full output: .taste-skill/performance.json.

## Verification limits and remaining content

No physical iOS/Android device, assistive-technology audit, or audible music assessment was performed; touch/reduced-motion and audio state were tested in the browser. External Calendar/Maps URL correctness was checked, not third-party service availability or saving an event. Parent names remain user-approved placeholders. No missing forms/auth/API checks exist because those features are not part of this project.

Preview: http://127.0.0.1:5173/ (dev), http://127.0.0.1:5180/ (production build).
