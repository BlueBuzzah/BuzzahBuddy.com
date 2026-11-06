<script setup lang="ts">
// mirrors bundle.js Lightbox thumbnail (DS import 1793729877-6a2e); without JavaScript the links open the image.
// src is the image path without extension: NAME.webp is the full image, NAME-thumb.webp the 640px thumbnail. Phone screens are portrait, so docs.css overrides the 4:3 frame.
defineProps<{ src: string; alt: string; caption?: string }>()
</script>

<template>
	<figure class="shot">
		<a class="bb-thumb" :href="`${src}.webp`" data-lightbox><img class="bb-thumb__img" :src="`${src}-thumb.webp`" :alt="alt" width="640" height="1391"></a>
		<figcaption class="body-s"><template v-if="caption">{{ `${caption} ` }}</template><a :href="`${src}.webp`" data-lightbox>View larger</a></figcaption>
	</figure>
</template>
