# Changelog

## 2026-11-06

- Restored the desktop navigation divider and larger logos; added a dark Resume hover/focus treatment.
- Simplified RoastPic chapter rules and Amazon retention table separators. Homepage covers now have 8px corners and no decorative grids, featured titles share a row with their tags, and the introduction has more space above the cat baseline.

- Restored the homepage silver name treatment and sparkles at weight 500, plus the dotted field and a divider anchored to the cat widget baseline. Adjusted the cat for the transparent padding below its feet.

- Extended the approved RoastPic typography and spacing direction across the homepage, all six other case studies, and project overlays.
- Added `editorial.css` for shared DM Sans typography, IBM Plex Sans Condensed labels, 240px desktop navigation, aligned content grids, restrained cards, and responsive layouts.
- Moved case-study metadata after cover media, preserving existing content and interactions. RoastPic retains its dedicated visual layer.
- Verified all eight HTML pages for section structure, duplicate IDs, local asset links, and stylesheet references. Browser visual QA remains unavailable in this session.

## 2026-06-13

- Added project documentation so future sessions can start from concise source
  files instead of relying on a long chat.
- Documented a React migration plan without changing the current static site
  architecture.
- Added formatting configuration for future code cleanup.
- Tidied selected HTML, CSS, and JavaScript formatting.

## Current Snapshot

- Landing page uses a fixed left navigation and editorial main column.
- Hero headline uses DM Sans at a quieter 40px scale.
- Landing section headings use DM Sans at 34px.
- The Council opens as a lightweight overlay.
- The Council carousel uses three direct images with original aspect ratios.
- Media surfaces use an approximately 8px radius.
- The Council overview includes Pamela Pavliscak's testimonial, project metadata,
  and a prototype link.
- The Council case study includes core problem, introduction, research,
  ideation, prototype walkthrough, and conclusion sections.

## Notes For Next Cleanup

- Confirm whether the public name should be Mengqi, Ariana, or both.
- Decide whether to keep unused legacy CSS classes before the React migration.
- Convert repeated case-study patterns into components during migration.
