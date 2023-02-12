<script lang="ts">
	import '../app.css';
</script>

<svelte:head>
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
