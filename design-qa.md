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

## Round 3: free tools, resource library, diagnostic, and practices

### Visual truth and evidence

- Source visual truth: `C:\Users\user\.codex\generated_images\01a03dbb-b8aa-7660-9f7b-95c918f185ea\exec-a6ab8533-785b-4b37-ad11-43c6176123fe.png`.
- Source pixels: 1487 x 1058.
- Tools implementation: `C:\Users\user\Documents\Codex\2026-08-26\sites-plugin-sites-openai-bundled\outputs\vivi-tools-resources-round-2026-08-27\after-tools-desktop.png`.
- Library implementation: `C:\Users\user\Documents\Codex\2026-08-26\sites-plugin-sites-openai-bundled\outputs\vivi-tools-resources-round-2026-08-27\after-shop-desktop.png`.
- Diagnostic implementation: `C:\Users\user\Documents\Codex\2026-08-26\sites-plugin-sites-openai-bundled\outputs\vivi-tools-resources-round-2026-08-27\after-creator-diagnostic-desktop.png`.
- Interactive practice implementation: `C:\Users\user\Documents\Codex\2026-08-26\sites-plugin-sites-openai-bundled\outputs\vivi-tools-resources-round-2026-08-27\after-practice-clarity-desktop.png`.
- Desktop CSS viewport: 1536 x 1024. Mobile CSS viewport: 390 x 844.
- Same-input comparison: `C:\Users\user\Documents\Codex\2026-08-26\sites-plugin-sites-openai-bundled\outputs\vivi-tools-resources-round-2026-08-27\comparison-reference-tools-shop-diagnostic.png`.
- State: initial tools, library, diagnostic, and clarity-practice views, with all main interactions separately exercised.

### Fidelity review

- The full-bleed forest hero, split editorial composition, muted gold headline, warm photography, and dark-green captions continue the selected inner-garden direction.
- Each route uses a different real project image and a different next-section structure while retaining the same navigation, typography, color, and spacing system.
- The downloadable tools retain an asymmetric editorial rhythm. The resource catalogue uses larger two-column entries so the result and action remain readable instead of compressing five narrow cards across the screen.
- The diagnostic workspace separates guidance from the four questions with a quiet vertical rule. The interactive practice keeps its working inputs while gaining an immersive, resource-specific opening.
- Desktop and mobile headline wrapping was explicitly balanced to avoid orphaned final characters.
- P0/P1: none remaining.
- P2 fixed: generic pale `PageIntro` headers previously made four product journeys feel like repeated presentation slides. They now have route-specific immersive heroes and clear first actions.
- P2 fixed: the resource catalogue was a five-column grid with dense, narrow cards. It now uses two-column editorial entries on desktop and a single clear reading column on mobile.
- P2 fixed: the practice pages did not visually connect to the resource library or the accepted brand direction. They now include resource imagery, a back path, a clear start action, and a short use boundary.
- P3 accepted: existing project photography is reused rather than manufacturing decorative assets or changing Vivi's supplied brand imagery.

### Functional checks

- Tools hero opens `/creator-diagnostic` through the primary CTA.
- Library category `晚間回穩` reduces the catalogue from five resources to one correct result.
- The evening practice opens at `/resources/energy-reset-kit`, accepts a checklist selection and note, and confirms copied output.
- The diagnostic accepts all four answers, renders the result, copies the result text, and returns to four unanswered questions after restart.
- All route-specific images load. Desktop and 390 px mobile layouts have no visible clipping or horizontal overflow.
- Browser console has no warning or error entries after the exercised flows.
- TypeScript check passed.
- Production build passed.
- Vitest: 9 files passed, 33 tests passed.

final result: passed
