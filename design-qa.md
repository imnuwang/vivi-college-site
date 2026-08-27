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

final result: passed
