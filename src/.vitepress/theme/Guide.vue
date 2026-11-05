<script setup lang="ts">
import { useData } from 'vitepress'
import GuideNav from './GuideNav.vue'
import { pages } from './guide'

/* Every guide page (frontmatter page: guide). Rendered once at build time (MPA mode ships no Vue), so everything here is
   static HTML: no client-side state, and it all works with JavaScript off. */
const { page, frontmatter: fm } = useData()

const index = pages.findIndex((p) => p.path === page.value.relativePath)
const previous = pages[index - 1]
const next = pages[index + 1]
</script>

<template>
	<div class="container docs">
		<GuideNav class="docs-side" />
		<details class="docs-contents">
			<summary class="bb-btn bb-btn--secondary bb-btn--full"><span class="bb-btn__label">Contents</span></summary>
			<GuideNav />
		</details>

		<main class="docs-main">
			<h1 class="headline docs-title">{{ fm.title }}</h1>
			<p class="body-l docs-lead">{{ fm.lead }}</p>

			<Content class="docs-body" />

			<!-- mirrors bundle.js Pager (DS import 1793729877-6a2e) -->
			<nav class="bb-pager docs-pager" aria-label="Pages">
				<a v-if="previous" class="bb-pager__link bb-pager__link--prev" :href="previous.href"><svg class="bb-icon" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><use href="/assets/icons/chevron-left.svg#icon"/></svg><span class="bb-pager__text"><span class="bb-pager__hint">Previous</span><span class="bb-pager__title">{{ previous.title }}</span></span></a>
				<a v-if="next" class="bb-pager__link bb-pager__link--next" :href="next.href"><span class="bb-pager__text"><span class="bb-pager__hint">Next</span><span class="bb-pager__title">{{ next.title }}</span></span><svg class="bb-icon" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><use href="/assets/icons/chevron-right.svg#icon"/></svg></a>
			</nav>
		</main>
	</div>
</template>
