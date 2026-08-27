# Design QA

## Visual truth and capture setup

- Selected direction: option 3, cinematic inner garden.
- Reference image: `C:\Users\user\.codex\generated_images\01a03dbb-b8aa-7660-9f7b-95c918f185ea\exec-a6ab8533-785b-4b37-ad11-43c6176123fe.png`
- Reference pixels: 1487 x 1058.
- Implementation URL: `http://127.0.0.1:4173/`
- Desktop CSS viewport: 1536 x 1024.
- Desktop capture: `C:\Users\user\Documents\Codex\2026-08-26\sites-plugin-sites-openai-bundled\outputs\vivi-option-3-build-2026-08-27\home-desktop-1536x1024.png`
- Desktop capture pixels: 1521 x 1014 after browser chrome and scrollbar exclusion.
- Mobile CSS viewport: 390 x 844.
- Mobile capture: `C:\Users\user\Documents\Codex\2026-08-26\sites-plugin-sites-openai-bundled\outputs\vivi-option-3-build-2026-08-27\home-mobile-390x844.png`
- Comparison input: `C:\Users\user\Documents\Codex\2026-08-26\sites-plugin-sites-openai-bundled\outputs\vivi-option-3-build-2026-08-27\desktop-comparison.png`
- State: homepage initial view, no menu open, no modal.

## Comparison findings

- P0: none.
- P1: none remaining. Broken raw GitHub image and download dependencies were replaced with local assets. The mobile menu opens fully, does not create horizontal overflow, and exposes every navigation item.
- P2 fixed: the first implementation hero was 1008 px tall at the desktop viewport. Type scale, spacing, portrait height, and hero grid were adjusted so the hero ends at 825 px, matching the selected composition more closely and revealing the next section.
- P2 fixed: the headline wrapped to four lines. It now holds the intended three-line editorial rhythm.
- P2 fixed: the portrait had a hard rectangular top edge. A top mask now blends it into the garden light while preserving Vivi's real portrait.
- P2 fixed: the mobile header wrapper previously constrained the expanded menu. The height rule now applies only to the header bar.
- P3 accepted: the implementation keeps Vivi's supplied portrait as a separate real image instead of generating or compositing a replacement face.
- P3 accepted: the homepage message is broader than the visual concept copy because the product must serve both readers seeking support and healing professionals seeking clearer positioning.

## Functional checks

- Desktop viewport: no horizontal overflow and no broken images.
- Mobile viewport: no horizontal overflow and no broken images.
- Primary self-care CTA opens `/energy-cards` at scroll position 0.
- Energy card images load locally at 1600 px natural width.
- Mobile menu open and close controls work and expose all eight links.
- TypeScript check passed.
- Production build passed.
- Vitest: 9 files passed, 33 tests passed.

## Round 2: services and editorial content

### Visual truth and evidence

- Source visual truth: `C:\Users\user\.codex\generated_images\01a03dbb-b8aa-7660-9f7b-95c918f185ea\exec-a6ab8533-785b-4b37-ad11-43c6176123fe.png`.
- Source pixels: 1487 x 1058.
- Services implementation: `C:\Users\user\Documents\Codex\2026-08-26\sites-plugin-sites-openai-bundled\outputs\vivi-services-content-round-2026-08-27\services-after-desktop.png`.
- Journal implementation: `C:\Users\user\Documents\Codex\2026-08-26\sites-plugin-sites-openai-bundled\outputs\vivi-services-content-round-2026-08-27\journal-after-desktop.png`.
- Article implementation: `C:\Users\user\Documents\Codex\2026-08-26\sites-plugin-sites-openai-bundled\outputs\vivi-services-content-round-2026-08-27\article-after-desktop.png`.
- Desktop CSS viewport: 1536 x 1024. Browser captures are 1521 x 1014 after scrollbar and browser-surface exclusion.
- Mobile CSS viewport: 390 x 844. Captures are 375 x 812 after browser-surface exclusion.
- Density normalization: each desktop artifact was scaled inside a 1536 x 1024 frame without cropping.
- Full-view comparison: `C:\Users\user\Documents\Codex\2026-08-26\sites-plugin-sites-openai-bundled\outputs\vivi-services-content-round-2026-08-27\design-comparison.png`.
- Focused evidence: the three individual implementation screenshots were inspected at original size for headline wrapping, image masks, button labels, header contrast, and next-section visibility.
- State: initial services page, initial journal page, and initial article page for `/journal/love-tarot-question`.

### Fidelity review

- Typography: the same Noto Serif TC editorial display treatment, white and muted-gold hierarchy, compact eyebrow labels, and restrained body scale continue across all three routes.
- Spacing: each desktop hero ends between 680 and 744 CSS px, so the next useful section appears in the first viewport. Mobile heroes stack without clipping or horizontal overflow.
- Color: forest green, warm ivory, muted gold, and low-saturation photography match the selected inner-garden direction.
- Images: the services page keeps Vivi's supplied portrait. The journal and article pages use existing project photography with consistent crop, darkening, and real image frames.
- Copy: existing service facts, limits, article titles, dates, and reading times were preserved. Hero wording was reorganized to improve clarity without adding results or guarantees.
- Header and controls: transparent navigation, focus styling, category chips, service anchors, CTA buttons, and mobile menu remain consistent with the approved homepage.

### Comparison history and fixes

- P2 fixed: the journal headline left `口。` alone on a fourth desktop line. The display size was reduced so the phrase holds a balanced three-line rhythm.
- P2 fixed: the journal category URL changed but the selected state and article list did not update. The page now subscribes to Wouter's search string, and `品牌私教` correctly shows one matching article.
- P2 fixed: service and journal pages originally used the generic pale `PageIntro` layout and read like presentation slides. Both now use the accepted full-bleed inner-garden hero, restrained next-section preview, and route-specific imagery.
- P2 fixed: the article page originally opened on a flat cream split layout. It now uses the same immersive header, then returns to a quiet paper reading surface.
- P1/P0: none remaining.
- P3 accepted: the service portrait stays as a separately framed real photograph instead of compositing or regenerating Vivi's face.
- P3 accepted: article hero backgrounds change with each article image while keeping the same overlay, typography, and spacing system.

### Functional checks

- Services route: page identity, no blank state, no framework overlay, no broken images, no horizontal overflow.
- Service anchor: `一對一塔羅占卜諮詢` opens `/services#tarot-session` and aligns the target at the top of the viewport.
- Service FAQ: the first question opens and exposes its answer.
- Journal filter: `品牌私教` updates the active chip, URL, article count, and lead article.
- Article path: the journal lead story opens `/journal/love-tarot-question` at scroll position 0.
- Fresh Browser tab: no warning or error console entries.
- Desktop and 390 px mobile views: no broken images or horizontal overflow.

final result: passed
