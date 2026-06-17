# React Migration Plan

## Recommendation

Move to Vite + React in phases. Use Chakra UI for accessible primitives where it
helps, but keep the visual identity in our own design tokens and CSS. This keeps
the portfolio editorial instead of making it look like a default component
library.

## Why Migrate

- Easier to reuse project cards, media galleries, modals, section headers, and
  case-study blocks.
- Cleaner content editing through project data files.
- Less risk of one-off HTML edits drifting out of alignment.
- Better foundation for future interactions like scroll reveal and case-study
  routing.

## Suggested Stack

- Vite
- React
- Chakra UI for dialog, disclosure, buttons, focus management, and accessibility
- Custom CSS variables for typography, spacing, color, and editorial layout

## Phase 1: Prepare

- Keep the current static site working.
- Add `package.json`, formatter settings, and a clear file structure.
- Move repeated content into documented data maps before converting the UI.

## Phase 2: Componentize

Create components:

- `AppShell`
- `Sidebar`
- `SectionHeader`
- `ProjectCard`
- `FeaturedWorkCard`
- `CaseStudyModal`
- `MediaCarousel`
- `CouncilOverview`
- `CouncilStorySection`
- `WalkthroughReveal`
- `Testimonial`

Create data files:

- `data/projects.js`
- `data/councilCaseStudy.js`
- `data/archive.js`

## Phase 3: Rebuild Current Site In React

- Match the current static site first.
- Do not redesign during the first migration pass.
- Verify desktop and mobile after each major section.

## Phase 4: Improve

- Add better routing for featured case studies.
- Add cleaner asset handling.
- Remove unused static CSS and old placeholder patterns.
- Expand case studies from content data rather than editing large HTML blocks.

## Guardrail

Do not use Chakra or Material defaults for the visible style. The portfolio
should still feel like the current editorial system: quiet, white, typographic,
and restrained.
