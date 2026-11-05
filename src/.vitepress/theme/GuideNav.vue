<script setup lang="ts">
import { useData } from 'vitepress'
import { pages } from './guide'

// Guide.vue renders this twice: the side nav (900px and up) and inside the Contents disclosure (under 900px).
const { page } = useData()
</script>

<template>
	<nav class="docs-nav" aria-label="Guide">
		<ul class="list-reset docs-nav__list">
			<li v-for="doc in pages" :key="doc.path">
				<a class="docs-nav__link" :href="doc.href" :aria-current="doc.path === page.relativePath ? 'page' : undefined"><span>{{ doc.title }}</span></a>
			</li>
		</ul>
	</nav>
</template>
