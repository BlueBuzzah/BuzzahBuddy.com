import { rm } from 'node:fs/promises'
import { join } from 'node:path'
import { defineConfig } from 'vitepress'

const site = 'https://buzzahbuddy.com'
// the same entity as on bluebuzzah.com, so search engines join the two sites
const organization = {
	'@type': 'Organization',
	'@id': 'https://bluebuzzah.com/#organization',
	name: 'BlueBuzzah Partners',
	alternateName: 'BlueBuzzah',
	url: 'https://bluebuzzah.com/',
	logo: 'https://bluebuzzah.com/assets/icon-512.png',
	sameAs: ['https://github.com/BlueBuzzah']
}
const website = {
	'@type': 'WebSite',
	'@id': `${site}/#website`,
	name: 'BuzzahBuddy',
	url: `${site}/`,
	inLanguage: 'en-US',
	publisher: { '@id': organization['@id'] }
}
const app = {
	'@type': 'MobileApplication',
	'@id': `${site}/#app`,
	name: 'BuzzahBuddy',
	description: 'BuzzahBuddy lets you control therapy sessions, adjust and customize settings, and track usage, all from your phone.',
	url: `${site}/`,
	// UtilitiesApplication, not HealthApplication: no medical claims (legal notices)
	applicationCategory: 'UtilitiesApplication',
	operatingSystem: 'iOS 15 or later, Android 7.0 or later',
	offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
	license: 'https://github.com/BlueBuzzah/BuzzahBuddy/blob/main/LICENSE',
	publisher: { '@id': organization['@id'] }
}

// page.md -> /page, docs/index.md -> /docs/ (cleanUrls)
const urlOf = (relativePath: string) => `${site}/${relativePath.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '')}`

/* MPA mode ships no framework JavaScript: every page is static HTML, and src/public/js/theme.js and site.js do the
   rest, as before the move to VitePress. appearance: false stops VitePress's own dark-mode script, which would fight
   theme.js. Everything the pages link lives unchanged in src/public/. */
export default defineConfig({
	lang: 'en',
	mpa: true,
	appearance: false,
	titleTemplate: false,
	scrollOffset: 0,
	// links omit .html; the files keep it, so GitHub Pages serves both /page and /page.html
	cleanUrls: true,
	// no lastUpdated: the home page's body is in Home.vue, so its .md date says nothing (BlueBuzzah.com strips it too)
	sitemap: { hostname: site },
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
	// canonical URL, Open Graph, Twitter card and JSON-LD for every page, from its frontmatter
	transformHead({ pageData, title, description }) {
		const url = urlOf(pageData.relativePath)
		const image = `${site}/assets/og-image.png`
		// No Medical* types, on purpose: BlueBuzzah is not a medical device (legal notices).
		const page = { '@type': 'WebPage', '@id': `${url}#page`, url, name: title, headline: title, description, image, inLanguage: 'en-US', isPartOf: { '@id': website['@id'] } }
		const jsonLd = JSON.stringify({ '@context': 'https://schema.org', '@graph': [organization, website, page, app] }).replace(/</g, '\\u003c')
		return [
			['link', { rel: 'canonical', href: url }],
			['meta', { property: 'og:type', content: 'website' }],
			['meta', { property: 'og:url', content: url }],
			['meta', { property: 'og:site_name', content: 'BuzzahBuddy' }],
			['meta', { property: 'og:locale', content: 'en_US' }],
			['meta', { property: 'og:title', content: title }],
			['meta', { property: 'og:description', content: description }],
			['meta', { property: 'og:image', content: image }],
			['meta', { property: 'og:image:width', content: '1200' }],
			['meta', { property: 'og:image:height', content: '630' }],
			['meta', { property: 'og:image:alt', content: 'The BlueBuzzah logo beside the words The BlueBuzzah companion app, on a navy background.' }],
			['meta', { name: 'twitter:card', content: 'summary_large_image' }],
			['script', { type: 'application/ld+json' }, jsonLd]
		]
	},
	// MPA mode writes a blank 404.html; without it GitHub Pages serves its own 404, as before
	buildEnd: (site) => rm(join(site.outDir, '404.html'), { force: true })
})
