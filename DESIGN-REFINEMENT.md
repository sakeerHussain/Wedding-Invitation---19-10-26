# Invitation refinement plan

Kind: private Islamic wedding invitation; apply the skill's visual-system principles to the established event design.
Brand: retain ivory paper, antique gold, blush flowers, olive blessing section, Lora and Manrope, and the approved calligraphic names. No new palette, assets, fonts, dependencies, or stock photographs.
Voice: existing formal family invitation copy preserved verbatim, including Arabic verses and editable parent placeholders requested by the user.

## Product and flow
React 19, Vite 8, Tailwind 4, component CSS, and Lenis. A single page with an envelope-opening state machine, anchor navigation, optional ambient music, decorative-motion preference, Nikah calendar link, and Google Maps destination. React local state and hooks; no router, forms, authentication, analytics, or API integration present. Public Vercel rewrites retained.

## Refinements
- Intro: preserve centered sealed envelope, opening motion, sound choice, and Arabic heading. Improve action and secondary-label readability.
- Hero: preserve names and artwork. Give the desktop card a complete first-screen composition, and fit more legible invitation/date lines within the existing floral frame.
- Navigation: retain three anchors and their labels, give each a comfortable keyboard/touch target, use equal columns on phones.
- Promise: preserve Arabic/translation/source; increase supporting text and citation sizes.
- Couple details: preserve linked monograms and all placeholders; unify heading scale, parent text, and desktop left alignment.
- Celebration: retain Nikah-only details and calendar action; improve hierarchy and button legibility.
- Interlude: preserve paper note, artwork, and subtle parallax; increase small-label legibility.
- Venue: preserve location, directions destination, and arch; improve schedule/address and primary action readability.
- Closing: preserve all copy and artwork; balance wrapping and increase supporting text.
- Shared controls: preserve state and accessible names; improve touch size, hover/press feedback, and focus contrast.

## Adaptation of the installed skill
The user's explicit preservation requirements take precedence over the skill's corporate-site recipes: do not replace the envelope with a commercial hero, remove Lenis/parallax/petals, add stock photos or random dealt sections, change religious/romantic copy, replace the supplied Maps link, or remove user-approved parent placeholders. Reuse existing CSS/component patterns instead of importing a global kit which changes behavior and selectors. Existing envelope opening is the entrance/moment; no additional animation library or scroll reveals.

## Verification
Build and lint; no typecheck or automated test script declared in package.json. Skill gate and local browser screenshots. Check 320, 390, 768, 820, 1024, 1440 widths; envelope with/without sound, anchors, calendar query and map link, motion toggle, reduced motion, data saver, keyboard focus, overflow, image loading, and console errors. Preserve pre-existing modified files and untracked couple-details work. Source backup kept outside the project in the shared chat workspace under taste-refinement/before.
