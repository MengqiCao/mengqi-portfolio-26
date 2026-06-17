# Collaboration Guide

## How To Keep Future Edits Fast

Start new work sessions from the project files, not from the whole chat history.
At the beginning of a fresh thread, ask Codex to read:

1. `PROJECT_BRIEF.md`
2. `design-system.md`
3. `CONTENT_MAP.md`
4. `CHANGELOG.md`
5. `REACT_MIGRATION_PLAN.md` when the task touches the future React version

This gives Codex the current direction without spending tokens re-reading every
old design decision.

## Best Request Format

For visual edits, the fastest useful prompt is:

```text
Section:
Goal:
What should change:
What should stay:
Assets:
Reference image, if any:
```

For example:

```text
Section: The Council carousel
Goal: make the slides feel like a direct image gallery
What should change: remove outer frames and use original image ratios
What should stay: captions under carousel only, 8px media radius
Assets: Council_carosal 1.png, Council_carosal 2.png, Council_carosal 3.png
```

## When To Start A New Thread

Start a new thread when:

- A major feature is done.
- The conversation has many screenshots and small iterations.
- We are switching from visual tuning to structural work.
- We begin the React migration.

Good kickoff prompt:

```text
Open this portfolio repo. Read PROJECT_BRIEF.md, design-system.md,
CONTENT_MAP.md, CHANGELOG.md, and REACT_MIGRATION_PLAN.md before editing.
Then help me with [specific task].
```

## Asset Naming

Use short, descriptive names when possible:

- `council-carousel-overview.png`
- `council-walkthrough-sage.mp4`
- `pamela-avatar.png`

Avoid spaces in new filenames once we move into React. Existing files with
spaces can stay unless we are already touching them.

## Design Rules To Preserve

- Editorial first, product-site second.
- Keep whitespace generous.
- Use media directly unless a frame is meaningful.
- Avoid new colors unless they belong to a project artifact.
- Reuse shared styles before adding one-off CSS.
