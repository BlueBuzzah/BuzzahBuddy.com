# BuzzahBuddy.com

Static "in development" page for BuzzahBuddy, the BlueBuzzah companion app for iPhone and Android. One `index.html`, styled with the design system's `css/tokens.css` and `css/bundle.css` (its `bb-` component classes on plain HTML, no React) plus `css/site.css` for layout. `js/theme.js` sets `data-theme` before first paint; `js/site.js` runs the footer's Display settings dialog (theme override). There is no build step. It deploys as-is to GitHub Pages (`CNAME`). The page must stay readable with JavaScript off. The app has no public release, so the page shows no store badges or download buttons until it does (web.md: link only what's released).

## Working on it

There are no scripts or tests. Preview with `python3 -m http.server 8000` and check changes in a browser: narrow and wide widths, light and dark themes, keyboard.

- **Copied from the design system, never edited by hand:** `css/tokens.css`, `css/bundle.css`, `css/fonts/`, `assets/bluebuzzah-mark-512.png`, the favicon/app icons in `assets/` and `favicon.ico`. After a design-system re-import, re-copy them from the workspace root:
  ```bash
  DS=.claude/skills/bluebuzzah-design-system; SITE=projects/BuzzahBuddy.com
  cp $DS/tokens.css $DS/components/bundle.css $SITE/css/ && cp $DS/fonts/* $SITE/css/fonts/
  cp $DS/assets/Logos/bluebuzzah-mark-512.png $DS/assets/Web/{favicon-16,favicon-32,apple-touch-icon-180,icon-192,icon-512,icon-maskable-512}.png $SITE/assets/
  cp $DS/favicons/favicon.ico $SITE/
  ```
  `css/fonts/` must sit next to `css/tokens.css`, since its `@font-face` URLs are relative.
- **Shared with BlueBuzzah.com:** `js/theme.js` is a copy of BlueBuzzah.com's, and `js/site.js` is its Display settings part (BlueBuzzah.com's also closes its mobile menu). The layout rules in `css/site.css` come from BlueBuzzah.com's too. Keep the two sites in step when changing either.
- **Icons are Lucide SVG files in `assets/icons/`** (v1.55.0, ISC; see `assets/icons/LICENSE.txt`), one file per glyph, used everywhere by reference:
  `<svg class="bb-icon" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><use href="assets/icons/NAME.svg#icon"/></svg>`
  To add or replace an icon, download it from `https://unpkg.com/lucide-static@1.55.0/icons/NAME.svg` and add `id="icon"` to its root `<svg>`. That's the only edit, and every use updates. The files draw in `currentColor`, so icons take their text's colour. Use sizes 20, 24 or 32, and always pair an icon with a word.
- Static markup that mirrors a `bundle.js` component carries a `<!-- mirrors bundle.js <Comp> (DS import …) -->` comment. Re-check it after a design-system re-import.

## Design System — required for every UI/UX change

Any change a person can see, hear or touch follows the **BlueBuzzah design system**. That includes layout, color, type, spacing, components, icons, logos and favicons, motion, accessibility, and copy (voice, medical claims, the disclaimer). The design system lives in the BlueBuzzah workspace repo as the `bluebuzzah-design-system` skill, at `../../.claude/skills/bluebuzzah-design-system/` from this repo's root.

Before making a UI/UX change:

1. **Load it.** Invoke the `bluebuzzah-design-system` skill. If it isn't in your skill list (e.g. Claude was started in this repo instead of the workspace root), read `../../.claude/skills/bluebuzzah-design-system/SKILL.md` directly and follow it.
2. **If that path doesn't exist, stop.** This repo isn't checked out inside the workspace. Ask the user to set it up: clone `https://github.com/BlueBuzzah/BlueBuzzah-Workspace`, then run `npm run workspace:setup` to clone this repo under its `projects/`. Don't work from memory or from the current page's styling.
3. **Read what applies:** `README.md` and `accessibility.md`, then `web.md` (the website surface guide), and `buzzahbuddy.md` for how the app itself is described and shown. Then read the README of every design-system component you use.

Rules:

- **The design system wins any conflict, except the legal notices.** The medical disclaimer and the implanted-device notice use this text verbatim, chosen for legal reasons. Never replace them with design-system wording or reword them. The disclaimer:
  > BlueBuzzah devices are not FDA approved medical devices and not intended to diagnose, treat, cure, or prevent any disease. The information provided through BlueBuzzah is for general wellness purposes only and not a substitute for professional medical advice, diagnosis, or treatment.
  The implanted-device notice (a warning Banner whose title is "Important", with the rest as its text):
  > Important: People with implanted electrodes from deep brain stimulation (DBS), heart pacemakers, or other internal electronic devices should take special precautions around all electronic devices, including BlueBuzzah. Consult your physician before use.
- **Take every value from the design system's tokens.** Use `var(--token)` from `tokens.css` (custom properties, all four themes). Never hand-type a hex color, size, radius, duration or font, and never add a CSS framework.
- **Copy, don't link.** Copy `tokens.css`, the fonts, icons, logo and the `assets/Web` favicon set into this repo. Never reference the workspace path from a page, because the site deploys on its own.
- **Don't invent rules.** If the design system doesn't cover something, ask rather than inventing a rule.
- **Full migrations:** a whole-site pass is the `/implement-design-system` command, run from the workspace.
