<script lang="ts">
	import '../app.css';
	import Navigation from '$lib/components/Navigation.svelte';
	import { title } from '$lib/utils';
</script>

<svelte:head>
	<title>{title}</title>
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
	<link rel="manifest" href="/site.webmanifest" />
</svelte:head>

<Navigation />
<main class="container mx-auto p-8 max-w-2xl">
	<slot />
</main>
<footer class="text-megan-300 text-center lg:text-left p-5 border-t border-t-megan-200">
	&copy: {new Date().getFullYear()} Megan and Mike All Rights Reserved.
</footer>

<style lang="postcss">
	main {
		min-height: var(--doc-height);
	}

	:global(body) {
		@apply font-serif;
	}
</style>
