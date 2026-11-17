# Bride and groom profiles — option 3

final result: passed

## Target and evidence
- Source: C:/Users/sakeer hussian/.codex/generated_images/01a1e58b-35ae-7571-b8d3-296cd40d241b/exec-dd04ca9f-7047-46fa-b642-5f8a3bc786d6.png (third displayed iteration).
- Source is 914 × 1722 pixels, normalized to 478 × 900 for comparison.
- Implementation: design/profile-option-3/preview.png, 478 × 900 mobile browser capture, invitation opened and decorative motion paused.
- Combined comparison: design/profile-option-3/comparison-final.png, source left, implementation right. Text is readable at this scale; a separate detail crop was unnecessary.
- Browser: in-app browser. Responsive DOM checks at widths 320, 390, 478, 768 and 1440 are recorded in design/profile-option-3/checks.json. No profile or page text overflow; all section images loaded.
- Existing responsive invitation retained. This is a scoped section adjustment, not a fresh mobile app.

## Comparison history
- Initial comparison: design/profile-option-3/comparison.png. [P2] Name leading and profile gaps placed the groom too low. Reduced name size/leading, relation margin and profile spacing.
- [P2] Flowers crowded the section title at 320px. Added narrow-screen top clearance; inspected the revised 320px rendering and confirmed the title clears the artwork and text has no overflow.
- Final combined comparison shows aligned text columns, smaller botanical margin, two-line groom name, grouped parents and deliberate address breaks. No actionable P0/P1/P2 issue remains.
- Full-page captures included fixed controls/focus artifacts and changed scrollbar geometry. The final comparison uses a stationary viewport capture instead; earlier full-page captures are supporting responsive evidence only.

## Required fidelity surfaces
- Typography: existing local Great Vibes/Pinyon script and Lora serif retained. Names use compact leading, relationships and parents 17px (16px on narrow screens), addresses 16px italic (15px on narrow screens). No truncated names.
- Layout: shared left alignment for both names and all family details; slim wreath/vine column; consistent relationship, parent and address spacing. At 478px the section is about 918 CSS pixels tall, allowing more readable line spacing than the 900px concept. Small screens grow with content.
- Colors: existing ivory paper, brown ink and muted brown address tokens retained.
- Assets: existing real raster paper, wreath and vine reused. Floral artwork is fuller and the vine more detailed than the generated concept, an intentional preservation of the site's established assets. No extra assets or fonts introduced.
- Content: Amina and Sakeer Hussain, both relationships, all four parent names, and both complete addresses preserved. Address formatting changes presentation only. Existing motion/sound controls remain functional and visible.

## Validation and limitations
- npm run lint: passed.
- npm run build: passed. Native Vite/Tailwind build required running outside the restricted sandbox.
- No browser console errors observed.
- Desktop preserves the existing heading-left, profiles-right layout; the selected visual defines mobile styling only.
- Physical-device validation remains untested.
- P3: source illustration has lighter vines and a smaller upper floral cluster; the implementation intentionally reuses existing artwork.

## Implementation checklist
- Complete: selected option resolved; shared profile layout updated; exact text preserved; responsive widths checked; revised screenshot compared; lint/build passed; browser override reset and preview retained.
