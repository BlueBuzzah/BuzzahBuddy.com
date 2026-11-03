<template>
	<main>
		<section class="hero">
			<div class="container hero__inner">
				<div class="stack hero__text">
					<!-- mirrors bundle.js StatusBadge tone="brand" icon="flask-conical" (DS import 1793303684-5e2e) -->
					<p><span class="bb-badge bb-badge--brand"><svg class="bb-icon" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><use href="/assets/icons/flask-conical.svg#icon"/></svg><span>Early Access</span></span></p>
					<h1 class="display-xl">The companion app for BlueBuzzah gloves</h1>
					<p class="body-l prose">BuzzahBuddy lets you control therapy sessions, adjust and customize settings, and track usage, all from your phone. Open-source and always free.</p>
					<!-- web.md Download pages: official store badges, equal weight, no platform detection -->
					<div class="button-row">
						<a class="store-badge" href="https://testflight.apple.com/join/DMuPNBGA" aria-describedby="early-access-note"><img src="/assets/apple-appstore.png" alt="Download on the App Store" width="512" height="171"></a>
						<a class="store-badge" href="https://play.google.com/apps/testing/com.rbonestell.buzzahbuddy" aria-describedby="early-access-note"><img src="/assets/google-playstore.png" alt="Get it on Google Play" width="478" height="142"></a>
					</div>
					<p class="body-s prose" id="early-access-note">These are early test versions, so expect some rough edges. Features may change before the full release. On iPhone, the app installs through Apple's TestFlight app.</p>
				</div>
				<img class="hero__mark" src="/assets/bluebuzzah-mark-512.png" alt="" width="200" height="193">
			</div>
		</section>

		<section class="section">
			<div class="container">
				<h2 class="display-l section__title">About BuzzahBuddy</h2>
				<ul class="list-reset grid-3">
					<!-- mirrors bundle.js Card as="li" padding="lg" (DS import 1793120889-b415) -->
					<li class="bb-card bb-card--lg" aria-labelledby="card-ios">
						<header class="bb-card__head"><h3 class="bb-card__title title-with-icon" id="card-ios"><svg class="bb-icon icon-brand" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><use href="/assets/icons/smartphone.svg#icon"/></svg>iPhone and Android</h3></header>
						<p>Available in both smartphone ecosystems with full feature parity.</p>
					</li>
					<!-- mirrors bundle.js Card as="li" padding="lg" (DS import 1793120889-b415) -->
					<li class="bb-card bb-card--lg" aria-labelledby="card-wireless">
						<header class="bb-card__head"><h3 class="bb-card__title title-with-icon" id="card-wireless"><svg class="bb-icon icon-brand" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><use href="/assets/icons/bluetooth.svg#icon"/></svg>Wireless control</h3></header>
						<p>Connects to your gloves over Bluetooth. Control therapy sessions and customize settings without a cable.</p>
					</li>
					<!-- mirrors bundle.js Card as="li" padding="lg" (DS import 1793120889-b415) -->
					<li class="bb-card bb-card--lg" aria-labelledby="card-history">
						<header class="bb-card__head"><h3 class="bb-card__title title-with-icon" id="card-history"><svg class="bb-icon icon-brand" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><use href="/assets/icons/calendar.svg#icon"/></svg>Session history</h3></header>
						<p>Track and report on therapy session history; duration, profiles, and parameters.</p>
					</li>
				</ul>
				<!-- mirrors bundle.js Banner tone="warning" (DS import 1793120889-b415) -->
				<div class="bb-banner bb-banner--warning section-block">
					<svg class="bb-icon bb-banner__icon" width="28" height="28" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><use href="/assets/icons/triangle-alert.svg#icon"/></svg>
					<div class="bb-banner__body">
						<p class="bb-banner__title">Important</p>
						<div class="bb-banner__text"><p>People with implanted electrodes from deep brain stimulation (DBS), heart pacemakers, or other internal electronic devices should take special precautions around all electronic devices, including BlueBuzzah. Consult your physician before use.</p></div>
					</div>
				</div>
			</div>
		</section>
	</main>
</template>
