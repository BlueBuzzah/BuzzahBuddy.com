# BuzzahBuddy.com

Static "coming soon" landing page for BuzzahBuddy, the BlueBuzzah companion app for iOS and Android. A single `index.html`, with Tailwind via CDN (`cdn.tailwindcss.com`) and minimal vanilla JS. There is no build step. It deploys as-is to GitHub Pages (`CNAME`).

## Design System — required for every UI/UX change

Any change a person can see, hear or touch follows the **BlueBuzzah design system**. That includes layout, color, type, spacing, components, icons, logos and favicons, motion, accessibility, and copy (voice, medical claims, the disclaimer). The design system lives in the BlueBuzzah workspace repo as the `bluebuzzah-design-system` skill, at `../../.claude/skills/bluebuzzah-design-system/` from this repo's root.

Before making a UI/UX change:

1. **Load it.** Invoke the `bluebuzzah-design-system` skill. If it isn't in your skill list (e.g. Claude was started in this repo instead of the workspace root), read `../../.claude/skills/bluebuzzah-design-system/SKILL.md` directly and follow it.
2. **If that path doesn't exist, stop.** This repo isn't checked out inside the workspace. Ask the user to set it up: clone `https://github.com/BlueBuzzah/BlueBuzzah-Workspace`, then run `npm run workspace:setup` to clone this repo under its `projects/`. Don't work from memory or from the current page's styling.
3. **Read what applies:** `README.md` and `accessibility.md`, then `web.md` (the website surface guide), and `buzzahbuddy.md` for how the app itself is described and shown. Then read the README of every design-system component you use.

Rules:

- **The design system wins any conflict.** The current page predates it. Build new and changed sections to the design system rather than copying the surrounding legacy styles. That includes the disclaimer, which must use the canonical text verbatim.
- **Take every value from the design system's tokens.** Use `tokens.css` (custom properties, all four themes) and map the Tailwind theme to those variables. Never hand-type a hex color, size, radius, duration or font.
- **Copy, don't link.** Copy `tokens.css`, the fonts, icons, logo and the `assets/Web` favicon set into this repo. Never reference the workspace path from a page, because the site deploys on its own.
- **Don't invent rules.** If the design system doesn't cover something, ask rather than inventing a rule.
- **Full migrations:** a whole-site pass is the `/implement-design-system` command, run from the workspace.
