# BuzzahBuddy.com

Static site for BuzzahBuddy, the BlueBuzzah companion app for iPhone and Android. Built with VitePress 1.6.4 in MPA mode with a custom theme: the output is plain static HTML with no framework JavaScript. Pages: `/` and the user guide under `/guide/…`, styled with the design system's `css/tokens.css` and `css/bundle.css` (its `bb-` component classes on plain HTML, no React) plus `css/site.css` for layout and `css/docs.css` (linked on every page, its rules scoped under `.docs`). `js/theme.js` sets `data-theme` before first paint; `js/site.js` adds the mobile-menu close, the footer's Display settings dialog (theme override) and the guide's image lightbox. `.github/workflows/deploy.yml` builds pull requests and deploys `main` to GitHub Pages (source: GitHub Actions). Pages must stay readable with JavaScript off. The app is in early access: the hero's official store badges link to the TestFlight and Google Play test builds, with a note that they're test versions. Swap the iOS link to the App Store listing at full release.

## Layout

- `src/.vitepress/theme/Layout.vue`: the header, footer and Display settings dialog; picks the page body from the page's `page` frontmatter.
- `src/.vitepress/theme/Home.vue`, `Guide.vue`: each page's `<main>`. `GuideNav.vue` is the guide nav (rendered twice: side and mobile Contents).
- `src/.vitepress/theme/guide.ts`: the one page list that drives the nav and the Pager. Add or reorder a page there.
- `src/index.md`: frontmatter only (`page`, `title`, `description`).
- `src/guide/*.md`: the guide pages, Markdown only (see Guide pages).
- `src/.vitepress/config.mts`: the global `<head>`. `theme.js` must stay a blocking script before the stylesheets. Its `transformHead` writes every page's canonical URL, Open Graph and Twitter tags and JSON-LD from the frontmatter, so pages never hand-write them. JSON-LD stays non-medical (no `Medical*` types), and the organization's name is BlueBuzzah Partners.
- `src/public/`: everything the page links, served as-is at the site root (`css/`, `js/`, `assets/`, `favicon.ico`, `site.webmanifest`, `robots.txt`, `CNAME`).

## Working on it

```bash
npm install
npm run build    # static site in src/.vitepress/dist/
npm run preview  # serve the build at http://localhost:4173 (touches dist/404.html first)
```

`vitepress preview` crashes without `dist/404.html`, but `buildEnd` deletes it on purpose (GitHub Pages must serve its own 404), so the preview script touches an empty one. It only exists in your local dist. There are no tests, and no dev server: `vitepress dev` renders pages client-side after `site.js` has run, so it doesn't match production. Run `rm -rf src/.vitepress/dist` before `npm run build` when verifying: stale files hide missing images. Rebuild (under a second) and check the preview in a browser: narrow and wide widths, light and dark themes, keyboard.

- **Page markup goes in the `.vue` files, never as HTML in a `.md` file.** Markdown ends an HTML block at the first blank line and turns the next indented line into a code block, which breaks the build.
- **A new page** needs a `src/<name>.md` with `page`, `title` and `description` (without a description VitePress writes "A VitePress site"), a `<Name>.vue`, and a branch for it in `Layout.vue`. A new guide page needs only a `src/guide/<slug>.md` and an entry in `guide.ts`.
- **Clean URLs** (`cleanUrls: true`): links never end in `.html` (`/guide/sessions`). The files keep `.html`, so both forms are served.
- Keep `mpa: true` (no Vue runtime or client router; links and `#` anchors behave natively) and `appearance: false` (otherwise VitePress adds its own dark-mode script that fights `theme.js`).
- Reference public files by absolute path (`/assets/…`, `/css/…`). A missing `<img src>` or `<use href>` target in a `.vue` template fails the build. `<a href>` targets and the `head` paths in `config.mts` aren't checked, so a typo there builds and deploys.
- The build deletes VitePress's `404.html` (blank in MPA mode), so GitHub Pages serves its own 404.
- The home page's share card is `src/public/assets/og-image.png`, a 1200×630 PNG in the same layout as BlueBuzzah.com's, also the fallback for a page with no card of its own. Guide pages' cards live in `src/public/assets/og/`, named from the page path (`guide/sessions.md` → `guide-sessions.png`). If a title or lead changes, remake its card the way BlueBuzzah.com's `CLAUDE.md` describes, and update `og:image:alt` in `config.mts` if the home headline changes.

- **Copied from the design system, never edited by hand:** `src/public/css/tokens.css`, `src/public/css/bundle.css`, `src/public/css/fonts/`, `src/public/assets/bluebuzzah-mark-512.png`, the favicon/app icons in `src/public/assets/` and `src/public/favicon.ico`. After a design-system re-import, re-copy them from the workspace root:
  ```bash
  DS=.claude/skills/bluebuzzah-design-system; SITE=projects/BuzzahBuddy.com/src/public
  cp $DS/tokens.css $DS/components/bundle.css $SITE/css/ && cp $DS/fonts/* $SITE/css/fonts/
  cp $DS/assets/Logos/bluebuzzah-mark-512.png $DS/assets/Web/{favicon-16,favicon-32,apple-touch-icon-180,icon-192,icon-512,icon-maskable-512}.png $SITE/assets/
  cp $DS/favicons/favicon.ico $SITE/
  ```
  `css/fonts/` must sit next to `css/tokens.css`, since its `@font-face` URLs are relative.
- **Shared with BlueBuzzah.com:** `js/theme.js` is a copy of BlueBuzzah.com's, and `js/site.js` is its mobile-menu, Display settings and lightbox parts. The layout rules in `css/site.css`, `css/docs.css` (trimmed, same class names), `Notices.vue` and `Shot.vue` come from BlueBuzzah.com's too, and so do `config.mts`, `.github/workflows/deploy.yml` and the `package.json` scripts. Keep the two sites in step when changing either.
- **Icons are Lucide SVG files in `src/public/assets/icons/`** (v1.55.0, ISC; see `assets/icons/LICENSE.txt`), one file per glyph, used everywhere by reference:
  `<svg class="bb-icon" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><use href="/assets/icons/NAME.svg#icon"/></svg>`
  To add or replace an icon, download it from `https://unpkg.com/lucide-static@1.55.0/icons/NAME.svg` and add `id="icon"` to its root `<svg>`. That's the only edit, and every use updates. The files draw in `currentColor`, so icons take their text's colour. Use sizes 20, 24 or 32, and always pair an icon with a word.
- Static markup that mirrors a `bundle.js` component carries a `<!-- mirrors bundle.js <Comp> (DS import …) -->` comment. Re-check it after a design-system re-import.
- **Worktrees go only in `.claude/worktrees/<name>`** inside this repo (gitignored), never beside it in the workspace's `projects/` or anywhere else.

## Guide pages (`/guide/…`)

- Markdown in `src/guide/`, frontmatter `page: guide`, `title`, `description`, `lead`, and optionally `shareTitle` (replaces `title` in the `<title>` and share tags when `title` alone says little, as with "Start here"). `Guide.vue` renders the rest, including the Pager from the page's place in `guide.ts`.
- **Markdown uses only `<Notices />` (the legal notices, verbatim; put it on every therapy page), `<Shot src alt caption>` (blank lines around it) and never raw HTML blocks.**
- Every top-level ordered list renders as numbered steps (numbers restart at 1; `start=` is ignored). Keep a section's steps one list, and use bullets for anything that isn't a step.
- Pages still waiting for a screenshot carry `<!-- planned-image: /guide/img/NAME | screenshot | Shows: … Arrow: … -->` where the `<Shot>` goes.
- Screenshots come from BuzzahBuddy's `guide-screenshot` skill. They live in `src/public/guide/img/` as `NAME.webp` (full size, never upscaled) and `NAME-thumb.webp` (640px wide), converted once with `cwebp` from the source PNG. No script is committed. Reference them as `/guide/img/NAME` in `<Shot src>`. `Shot.vue` and `docs.css` size the thumbnail for a portrait iPhone shot (1206×2622), so other shapes need their own frame. The alt text says what each arrow points to. A missing image doesn't fail the build; check the built HTML:
  ```bash
  cd src/.vitepress/dist && grep -rhoE '/guide/img/[A-Za-z0-9._-]+' --include='*.html' . | sort -u | while read f; do [ -f ".$f" ] || echo "MISSING $f"; done
  ```
- Bold names are the app's labels, in the app's Title Case. The site's own headings stay sentence case.

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
