# BuzzahBuddy.com

The website for BuzzahBuddy, the BlueBuzzah companion app for iPhone and Android. The app is in development; this page says so and points to BlueBuzzah.com.

## Tech stack

- [VitePress](https://vitepress.dev) 1.6.4 builds the page to plain static HTML (MPA mode, custom theme, no framework JavaScript)
- Styled with the BlueBuzzah design system's `css/tokens.css` and `css/bundle.css` plus `css/site.css`, all in `src/public/css/`
- Two small scripts: `js/theme.js` (theme before first paint) and `js/site.js` (Display settings). The page reads fine without them.

```bash
npm install
npm run build    # static site in src/.vitepress/dist/
npm run preview  # serve the build at http://localhost:4173
```

Pushes to `main` deploy to GitHub Pages through `.github/workflows/deploy.yml`.

## Important notices

BlueBuzzah devices are not FDA cleared or approved medical devices and not intended to diagnose, treat, cure, mitigate, or prevent any disease. The information provided through BlueBuzzah is for general wellness purposes only and not a substitute for professional medical advice, diagnosis, or treatment.

**Important:** People with implanted electrodes from deep brain stimulation (DBS), heart pacemakers, or other internal electronic devices should take special precautions around all electronic devices, including BlueBuzzah. Consult your physician before use.

Read the [terms and safety](https://bluebuzzah.com/terms) page before you build or wear a pair.

## License

- **Site code** is under the MIT License ([`LICENSE`](LICENSE)): `src/.vitepress/` (except the page text, below), `src/public/js/`, `src/public/css/` (except `fonts/`), `package.json` and `.github/`.
- **Site content** is under CC BY-SA 4.0 ([`LICENSE-CC-BY-SA-4.0.txt`](LICENSE-CC-BY-SA-4.0.txt)): the Markdown pages in `src/` (including `guide/`), the page text in `src/.vitepress/theme/*.vue`, `src/public/guide/`, `src/public/assets/og/` and `og-image.png`.
- **Third-party files** keep their own licenses: the fonts in `src/public/css/fonts/` (SIL Open Font License, files alongside) and the icons in `src/public/assets/icons/` (Lucide, ISC, `LICENSE.txt` there). The App Store and Google Play badges are Apple and Google trademarks, used under their badge guidelines.

The BlueBuzzah and BuzzahBuddy names and logos, including the app icons and favicons in `src/public/assets/` and `src/public/favicon.ico`, are not covered by these licenses. See [Licenses and the BlueBuzzah name](https://bluebuzzah.com/terms#licenses).
