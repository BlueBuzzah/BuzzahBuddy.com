<script setup lang="ts">
import Home from './Home.vue'
</script>

<template>
	<header class="site-header">
		<div class="container header-row">
			<div class="lockup">
				<img src="/assets/bluebuzzah-mark-512.png" alt="" width="42" height="40">
				<span class="title-l">BuzzahBuddy</span>
			</div>
		</div>
	</header>

	<Home />

	<footer class="site-footer">
		<div class="container footer-grid">
			<div class="footer-top">
				<a class="lockup" href="https://bluebuzzah.com">
					<img src="/assets/bluebuzzah-mark-512.png" alt="" width="42" height="40">
					<span class="title-l">BlueBuzzah</span>
				</a>
				<nav aria-label="Footer">
					<ul class="list-reset footer-links">
						<li><a class="nav-link body-s" href="https://github.com/BlueBuzzah/BuzzahBuddy">GitHub</a></li>
						<li><a class="nav-link body-s" href="https://github.com/BlueBuzzah/BuzzahBuddy/blob/main/LICENSE">License</a></li>
						<li><a class="nav-link body-s" href="https://bluebuzzah.com/privacy.html">Privacy policy</a></li>
						<li><a class="nav-link body-s" href="https://bluebuzzah.com">BlueBuzzah.com</a></li>
						<li class="body-s js-only" hidden><button type="button" class="bb-btn bb-btn--quiet btn-compact" data-open-settings><svg class="bb-icon" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><use href="/assets/icons/settings.svg#icon"/></svg><span class="bb-btn__label">Display settings</span></button></li>
					</ul>
				</nav>
			</div>
			<p class="body-s text-muted">BlueBuzzah devices are not FDA approved medical devices and not intended to diagnose, treat, cure, or prevent any disease. The information provided through BlueBuzzah is for general wellness purposes only and not a substitute for professional medical advice, diagnosis, or treatment.</p>
			<p class="caption text-muted">&copy; 2026 BlueBuzzah Partners</p>
		</div>
		<dialog class="settings-dialog" aria-labelledby="settings-title">
			<h2 class="title-l" id="settings-title">Display settings</h2>
			<p class="body-s text-muted">This site follows your device's settings. Changes here apply to this browser only.</p>
			<div class="theme-controls">
				<!-- mirrors bundle.js SegmentedControl (DS import 1793120889-b415) -->
				<div class="bb-seg">
					<span class="bb-seg__label" id="theme-label">Appearance</span>
					<div class="bb-seg__track" role="radiogroup" aria-labelledby="theme-label">
						<button type="button" role="radio" aria-checked="true" tabindex="0" class="bb-seg__opt bb-seg__opt--on" data-mode="system"><svg class="bb-icon" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><use href="/assets/icons/check.svg#icon"/></svg><span>System</span></button>
						<button type="button" role="radio" aria-checked="false" tabindex="-1" class="bb-seg__opt" data-mode="light"><span>Light</span></button>
						<button type="button" role="radio" aria-checked="false" tabindex="-1" class="bb-seg__opt" data-mode="dark"><span>Dark</span></button>
					</div>
				</div>
				<!-- mirrors bundle.js Switch (DS import 1793120889-b415) -->
				<button type="button" role="switch" aria-checked="false" aria-labelledby="hc-label" aria-describedby="hc-desc" class="bb-switch">
					<span class="bb-switch__text"><span class="bb-switch__label" id="hc-label">High contrast</span><span class="bb-switch__desc" id="hc-desc">Stronger colors and borders</span></span>
					<span class="bb-switch__track" aria-hidden="true"><span class="bb-switch__thumb"></span></span>
				</button>
			</div>
			<form method="dialog"><button class="bb-btn bb-btn--primary bb-btn--full"><span class="bb-btn__label">Done</span></button></form>
		</dialog>
	</footer>
</template>
