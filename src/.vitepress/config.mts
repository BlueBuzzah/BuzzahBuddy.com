import { createHash } from 'node:crypto'
import { existsSync, readFileSync } from 'node:fs'
import { rm } from 'node:fs/promises'
import { join } from 'node:path'
import { defineConfig } from 'vitepress'

// GitHub Pages lets browsers cache /css and /js for 10 minutes, so a deploy could pair new HTML with old CSS.
// A content hash in each URL changes only when that file does.
const v = (path: string) =>
	`${path}?v=${createHash('sha256').update(readFileSync(new URL(`../public${path}`, import.meta.url))).digest('hex').slice(0, 8)}`

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
	description: 'BuzzahBuddy lets you control sessions, adjust and customize settings, and track usage, all from your phone.',
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

// Home > Guide > page, each crumb [name, url]
function breadcrumb(relativePath: string, name: string, url: string) {
	const crumbs = [['BuzzahBuddy', `${site}/`], ['Guide', `${site}/guide/`]]
	if (relativePath !== 'guide/index.md') crumbs.push([name, url])
	return {
		'@type': 'BreadcrumbList',
		itemListElement: crumbs.map(([name, item], i) => ({ '@type': 'ListItem', position: i + 1, name, item }))
	}
}

/* The JSON-LD @graph of one page. No Medical* types, on purpose: BlueBuzzah is not a medical device (legal notices). */
function structuredData(relativePath: string, title: string, description: string, url: string, image: string, dateModified?: number) {
	const isHome = relativePath === 'index.md'
	const shared = { '@id': `${url}#page`, url, name: title, headline: title, description, image, inLanguage: 'en-US', isPartOf: { '@id': website['@id'] } }
	const page = isHome
		? { '@type': 'WebPage', ...shared }
		: { '@type': 'TechArticle', ...shared, author: { '@id': organization['@id'] }, publisher: { '@id': organization['@id'] }, dateModified: dateModified && new Date(dateModified).toISOString() }
	return {
		'@context': 'https://schema.org',
		'@graph': [
			organization,
			website,
			page,
			...(isHome ? [] : [breadcrumb(relativePath, title, url)]),
			...(isHome || relativePath === 'guide/index.md' ? [app] : [])
		]
	}
}

/* MPA mode ships no framework JavaScript: every page is static HTML, and src/public/js/theme.js and site.js do the
   rest, as before the move to VitePress. appearance: false stops VitePress's own dark-mode script, which would fight
   theme.js. Everything the pages link lives unchanged in src/public/. */
export default defineConfig({
	lang: 'en',
	mpa: true,
	appearance: false,
	titleTemplate: false,
	scrollOffset: 0,
	// links omit .html; the files keep it, so GitHub Pages serves both /guide/sessions and /guide/sessions.html
	cleanUrls: true,
	// git dates for dateModified and the sitemap; deploy.yml checks out full history so these stay real
	lastUpdated: true,
	// the home page keeps its body in Home.vue, so its .md date says nothing: no lastmod for it
	sitemap: { hostname: site, transformItems: (items) => items.map((item) => (item.url.startsWith('guide') ? item : { ...item, lastmod: undefined })) },
	markdown: {
		// no "#" permalink inside each heading: without VitePress's default theme it's a stray, empty focusable link
		anchor: { permalink: false }
	},
	head: [
		['meta', { name: 'color-scheme', content: 'light dark' }],
		// sets data-theme before first paint, so it blocks and comes before the stylesheets (web.md Technical)
		['script', { src: v('/js/theme.js') }],
		['link', { rel: 'preload', href: '/css/fonts/lexend-latin-wght-normal.woff2', as: 'font', type: 'font/woff2', crossorigin: '' }],
		['link', { rel: 'preload', href: '/css/fonts/atkinson-hyperlegible-next-latin-wght-normal.woff2', as: 'font', type: 'font/woff2', crossorigin: '' }],
		['link', { rel: 'stylesheet', href: v('/css/tokens.css') }],
		['link', { rel: 'stylesheet', href: v('/css/bundle.css') }],
		['link', { rel: 'stylesheet', href: v('/css/site.css') }],
		['link', { rel: 'stylesheet', href: v('/css/docs.css') }],
		['link', { rel: 'icon', href: '/favicon.ico', sizes: '48x48' }],
		['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/assets/favicon-32.png' }],
		['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/assets/favicon-16.png' }],
		['link', { rel: 'apple-touch-icon', href: '/assets/apple-touch-icon-180.png' }],
		['link', { rel: 'manifest', href: '/site.webmanifest' }],
		['meta', { name: 'apple-mobile-web-app-title', content: 'BuzzahBuddy' }],
		['meta', { name: 'theme-color', content: '#080c1b' }],
		['script', { src: v('/js/site.js'), defer: '' }]
	],
	// guide pages: the <title> names the guide; the <h1> (Guide.vue) keeps the plain frontmatter title
	transformPageData(pageData) {
		const { page, title, shareTitle } = pageData.frontmatter
		if (page === 'guide') pageData.title = `${shareTitle ?? title} - BuzzahBuddy guide`
	},
	// canonical URL, Open Graph, Twitter card and JSON-LD for every page, from its frontmatter
	transformHead({ siteConfig, pageData, description }) {
		const { relativePath, frontmatter: fm, lastUpdated } = pageData
		if (!fm.page) return // the 404 page, which buildEnd deletes
		const title = fm.shareTitle ?? fm.title
		const isHome = relativePath === 'index.md'
		const url = urlOf(relativePath)
		const card = `assets/og/${relativePath.replace(/\.md$/, '').replace(/\//g, '-')}.png`
		const image = `${site}/${existsSync(join(siteConfig.srcDir, 'public', card)) ? card : 'assets/og-image.png'}`
		const jsonLd = JSON.stringify(structuredData(relativePath, title, description, url, image, lastUpdated)).replace(/</g, '\\u003c')
		return [
			['link', { rel: 'canonical', href: url }],
			['meta', { property: 'og:type', content: isHome ? 'website' : 'article' }],
			['meta', { property: 'og:url', content: url }],
			['meta', { property: 'og:site_name', content: 'BuzzahBuddy' }],
			['meta', { property: 'og:locale', content: 'en_US' }],
			['meta', { property: 'og:title', content: title }],
			['meta', { property: 'og:description', content: description }],
			['meta', { property: 'og:image', content: image }],
			['meta', { property: 'og:image:width', content: '1200' }],
			['meta', { property: 'og:image:height', content: '630' }],
			['meta', { property: 'og:image:alt', content: `The BlueBuzzah logo beside the words ${isHome ? 'The BlueBuzzah companion app' : title}, on a navy background.` }],
			['meta', { name: 'twitter:card', content: 'summary_large_image' }],
			['script', { type: 'application/ld+json' }, jsonLd]
		]
	},
	// MPA mode writes a blank 404.html; without it GitHub Pages serves its own 404, as before
	buildEnd: (site) => rm(join(site.outDir, '404.html'), { force: true })
})
