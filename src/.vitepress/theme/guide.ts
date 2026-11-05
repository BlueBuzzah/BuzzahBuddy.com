/* The guide pages, in order: the one list the guide nav and Pager both read (Guide.vue). */

// path = the page's VitePress relativePath; href = its clean URL
export interface GuidePage { path: string; href: string; title: string }

export const pages: GuidePage[] = [
	{ path: 'guide/index.md', href: '/guide/', title: 'Start here' },
	{ path: 'guide/connect.md', href: '/guide/connect', title: 'Get connected' },
	{ path: 'guide/profiles.md', href: '/guide/profiles', title: 'Choose a therapy profile' },
	{ path: 'guide/sessions.md', href: '/guide/sessions', title: 'Run a session' },
	{ path: 'guide/gloves.md', href: '/guide/gloves', title: 'Test motors and glove settings' },
	{ path: 'guide/firmware.md', href: '/guide/firmware', title: 'Keep your firmware up to date' },
	{ path: 'guide/history.md', href: '/guide/history', title: 'See your history' },
	{ path: 'guide/settings.md', href: '/guide/settings', title: 'App settings' },
	{ path: 'guide/voice.md', href: '/guide/voice', title: 'Voice commands' },
	{ path: 'guide/accessibility.md', href: '/guide/accessibility', title: 'Accessibility' },
	{ path: 'guide/troubleshooting.md', href: '/guide/troubleshooting', title: 'Troubleshooting' }
]
