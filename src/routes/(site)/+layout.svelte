<script lang="ts">
	import Background from '$lib/components/Background.svelte';
	import Navigation from '$lib/components/Navigation.svelte';
</script>

<Background>
	<div class="grid grid-rows-[auto_1fr] h-full 💒">
		<div>
			<Navigation />
		</div>
		<div>
			<slot />
		</div>
	</div>
</Background>
