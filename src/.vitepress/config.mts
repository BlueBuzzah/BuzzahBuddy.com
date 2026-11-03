import { rm } from 'node:fs/promises'
import { join } from 'node:path'
import { defineConfig } from 'vitepress'

/* MPA mode ships no framework JavaScript: every page is static HTML, and src/public/js/theme.js and site.js do the
   rest, as before the move to VitePress. appearance: false stops VitePress's own dark-mode script, which would fight
   theme.js. Everything the pages link lives unchanged in src/public/. */
export default defineConfig({
	lang: 'en',
	mpa: true,
	appearance: false,
	titleTemplate: false,
	scrollOffset: 0,
	head: [
		['meta', { name: 'color-scheme', content: 'light dark' }],
		// sets data-theme before first paint, so it blocks and comes before the stylesheets (web.md Technical)
		['script', { src: '/js/theme.js' }],
		['link', { rel: 'preload', href: '/css/fonts/lexend-latin-wght-normal.woff2', as: 'font', type: 'font/woff2', crossorigin: '' }],
		['link', { rel: 'preload', href: '/css/fonts/atkinson-hyperlegible-next-latin-wght-normal.woff2', as: 'font', type: 'font/woff2', crossorigin: '' }],
		['link', { rel: 'stylesheet', href: '/css/tokens.css' }],
		['link', { rel: 'stylesheet', href: '/css/bundle.css' }],
		['link', { rel: 'stylesheet', href: '/css/site.css' }],
		['link', { rel: 'icon', href: '/favicon.ico', sizes: '48x48' }],
		['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/assets/favicon-32.png' }],
		['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/assets/favicon-16.png' }],
		['link', { rel: 'apple-touch-icon', href: '/assets/apple-touch-icon-180.png' }],
		['link', { rel: 'manifest', href: '/site.webmanifest' }],
		['meta', { name: 'apple-mobile-web-app-title', content: 'BuzzahBuddy' }],
		['meta', { name: 'theme-color', content: '#080c1b' }],
		['script', { src: '/js/site.js', defer: '' }]
	],
	// MPA mode writes a blank 404.html; without it GitHub Pages serves its own 404, as before
	buildEnd: (site) => rm(join(site.outDir, '404.html'), { force: true })
})
