<script lang="ts">
	import '../app.css';
	import Navigation from '$lib/Navigation.svelte';
</script>

<svelte:head>
	<title>Megan and Mike 2024</title>
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
	<link rel="manifest" href="/site.webmanifest" />
</svelte:head>

<Navigation />
<main class="container mx-auto text-center max-w-2xl">
	<slot />
</main>

<style lang="postcss">
	main {
		min-height: var(--doc-height);
		display: grid;
		grid-template-rows: auto 1fr auto;
	}
</style>
