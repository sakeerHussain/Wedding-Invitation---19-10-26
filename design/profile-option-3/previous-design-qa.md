# Bride and groom details — design QA

final result: passed

## Visual target and scope

- Selected visual: option 2, the second displayed image from the latest ideation set; linked botanical monograms. Source: `design/couple-details/reference.png`.
- Source pixels: 853 × 1844. Normalized to 390 × 844 CSS pixels for comparison, preserving aspect ratio with at most 1px neutral padding.
- Implementation: existing React/Vite wedding invitation, new `#the-couple` section between the promise and Nikah details. This extends the existing responsive website rather than scaffolding a different mobile runtime.
- Browser: local Microsoft Edge through Playwright, explicitly authorized by the user because in-app automation was unavailable.
- Main comparison viewport: 390 × 844, deviceScaleFactor 1. Additional functional viewports: 320×568, 635×900, 900×1000, 1024×900 and 1440×900.
- State: invitation opened without sound; all section artwork and fonts loaded; reduced motion enabled for deterministic visual comparison. Full-height small-screen captures temporarily use a taller viewport so fixed controls are not accidentally included from outside the viewport. Layout/overflow measurements are taken at the original viewport.
- Full comparison: `design/couple-details/comparison-final.png`, source on left and implementation on right. Focused name, medallion and parents comparison: `design/couple-details/comparison-detail.png`.
- Implementation captures: `design/couple-details/mobile.png`, `design/couple-details/small-mobile.png`, `design/couple-details/desktop.png`.

## Comparison history

### First pass — blocked

- [P2] The groom's surname overflowed its text column at 320px. Evidence: first browser layout check reported `nameOverflow: [false, true]`. Fix: responsive name sizing with a lower 48px floor, preserving a two-line full groom name.
- [P2] The botanical connector appeared detached and too faint, and the rings were oversized relative to the selected composition. Evidence: `design/couple-details/comparison-first.png`. Fix: scale the ring to its column, enlarge and extend the real raster vine between medallions, and add the lower botanical finial.
- [P2] Groom details sat lower than the mockup because of the name's line-height and profile gap. Fix: reduce the two-line name leading and adjust relation/profile spacing.

### Revised comparison — passed

- All tested widths report no page overflow and no name-column overflow.
- The 390px section measures 844px high and preserves the reference's bride-first, linked-monogram composition and information order.
- `comparison-final.png` and `comparison-detail.png` show the repaired connector, scaled wreaths and revised text rhythm together with the source.
- The full 320px capture shows both names and every parent placeholder inside the content column.
- Desktop uses a spacious heading column beside the linked profiles, reusing the invitation's existing embossed texture and floral assets. The supplied reference did not define a desktop composition.

## Required fidelity surfaces

1. **Fonts/typography:** existing Lora-style supporting serif, readable Great Vibes calligraphy and the established Pinyon capital A. Capital A and S are preserved. Names are real text; Sakeer Hussain wraps deliberately over two lines. Parent details remain readable at 14px on phones and 17px on desktop.
2. **Spacing/layout:** open stationery surface, no nested app cards; monograms left, family details right; continuous botanical connection; bride first; section sits between the verse and celebration. The small-screen overflow found in the first pass is fixed.
3. **Colors/tokens:** existing warm brown #503719, antique gold and warm ivory are retained. High-contrast family text is placed over calm paper, not the flower arrangements.
4. **Image quality:** the paper, medallions and vine are actual generated image assets, optimized as WebP. Decorative images have empty alt text and are hidden from assistive technology. No CSS/SVG approximations replace the target's botanical assets. Existing ornament and control components are reused from the invitation.
5. **Copy/content:** exact heading/subtitle and family relationships from the selected visual. Only Amina and Sakeer Hussain are real supplied names. All four parent names remain explicit placeholders in `src/data/invitation.js`; no biography, education, occupation or photos are invented.

## Interaction and regression checks

- All six viewport captures loaded without JavaScript errors or failed asset responses.
- Immediate and delayed opening, image failure fallback, font/art readiness, music play/mute, hidden-tab animation pause/resume and original asset preservation passed.
- Wheel scrolling, emulated touch, anchors, destination focus, reduced-motion changes, data saver and motion pause/resume passed.
- The new section is static and read-through; it adds no interactions, extra animation loop or new font. Artwork is lazy-loaded and receives Vite's existing content-hashed cache URLs.
- Reception, event numbering and the removed story link remain absent. Nikah date, time, calendar links, map destination and the existing navigation are preserved.
- The existing floating motion and sound controls remain visible by user constraint, although the generated concept omitted them. They are not replaced with decorative mock controls.
- ESLint and production build passed.

## Follow-up polish

- [P3] The generated wreaths have slightly fuller foliage than the concept's rings; the information hierarchy, botanical character and readability are preserved.
- Physical iPhone/Android and WhatsApp-browser checks remain a deployment follow-up; emulation is not a guarantee for every device.

## Implementation checklist

- Complete: selected visual resolved; real assets prepared; responsive section integrated; placeholders editable; visual issues repaired; recaptured source comparison inspected; current interactions checked.
- Next: replace the four parent placeholders when names are supplied, then publish through the existing Vercel workflow when requested.
