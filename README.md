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

## Disclaimer

BlueBuzzah devices are not FDA approved medical devices and not intended to diagnose, treat, cure, or prevent any disease. The information provided through BlueBuzzah is for general wellness purposes only and not a substitute for professional medical advice, diagnosis, or treatment.
