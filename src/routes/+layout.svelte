<script lang="ts">
	import '../app.css';
</script>

<svelte:head>
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
	<link rel="manifest" href="/site.webmanifest" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link href="https://fonts.googleapis.com/css2?family=Sassy+Frass&display=swap" rel="stylesheet" />
</svelte:head>

<div class="container mx-auto text-center">
	<slot />
</div>

<style lang="postcss">
	:global(h1) {
		font-family: 'Sassy Frass', cursive;
	}
	:global(h2) {
		font-family: 'Sassy Frass', cursive;
	}
</style>
