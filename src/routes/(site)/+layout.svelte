<script lang="ts">
	import Background from '$lib/components/Background.svelte';
	import Navigation from '$lib/components/Navigation.svelte';
</script>

<Background>
	<Navigation />

	<slot />
</Background>
