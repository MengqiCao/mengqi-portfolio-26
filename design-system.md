# Portfolio Design System

## Direction

Create a quiet editorial UX portfolio inspired by art books, museum catalogs,
and design journals. The site should feel like reading a carefully designed
publication: typographic, restrained, spacious, and intellectually curious.

## Color

- Background: `#FFFFFF`
- Primary text: `#000000`
- Secondary text: `#333333`
- Metadata and supporting text: `#888888`
- Captions: `#666666`
- Borders: `#EAEAEA`

Avoid gradients, shadows, glassmorphism, bright colors, and decorative effects.

## Typography

- Display / Hero: `Noto Serif JP`, `56px`, regular, `line-height: 1.05`
- H2: `Noto Serif JP`, `40px`, regular
- H3 / Project titles: `Noto Serif JP`, `28px`, regular
- Landing hero and primary landing section headings may use `DM Sans` when the
  page needs a more direct personal tone:
  - Landing hero: `DM Sans`, `40px`, regular, `line-height: 1.12`
  - Landing section H2: `DM Sans`, `34px`, regular
- Labels / navigation / metadata: `Intel`, `12px`, uppercase, `letter-spacing: 0.18em`
- Body: `Intel`, `16px`, `line-height: 1.8`
- Captions: `Intel`, `14px`, color `#666666`

Use typography as the primary identity. Keep headings composed and avoid
oversized type outside the hero.

## Grid And Spacing

- The layout should fill the viewport instead of centering the whole site as a
  fixed canvas.
- Desktop sidebar: fixed to the left edge, narrow rail between `248px` and
  `336px`.
- System grid: 12 columns
- Reading columns: `680px` to `720px`
- Spacing scale: `8px`, `16px`, `32px`, `64px`, `128px`

Use generous whitespace and clear alignment. Do not introduce new spacing values
unless the system genuinely needs to expand.

## Navigation

Navigation should feel like publication metadata, not app chrome. Keep it small,
uppercase, quiet, and precisely aligned.

## Cards

Project cards should feel like printed sheets of paper:

- `1px` border using `#EAEAEA`
- No shadow
- No rounded corners
- Minimal hover state using only border color and opacity

Media itself can use a small `8px` radius when it helps uploaded images and
videos feel softer. Avoid adding an outer frame unless the frame is meaningful
to the artifact.

## Motion

Motion should be slow and subtle:

- Duration: `500ms` to `800ms`
- Easing: ease-out
- Allowed: fade, opacity, gentle slide
- Avoid: bounce, spring, scale, flashy interactions

## Site Structure

1. Hero section with a large editorial statement.
2. Vibe Coding Projects in a clean three-card grid with restrained imagery and
   strong typography.
3. Featured Works as full-width case-study sheets below the vibe coding grid.
4. About section focused on writing and personal perspective.
5. Archive section for experiments, notes, references, and process work.

## Case Study Patterns

- Vibe Coding Projects open as lightweight overlays. They should feel like
  showcases: image carousel, short notes, two-column text, and quick prototype
  context.
- Featured Works open as dedicated case-study pages. They should include a
  left process rail, research/process sections, impact placeholders, and fuller
  storytelling.
