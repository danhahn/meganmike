<script lang="ts">
	export let hover: boolean;
	export let selected: boolean;
</script>

<button
	on:mouseenter
	on:click
	class:hover
	class:selected
	class="aspect-square border border-megan-400 text-megan-800 rounded-full grid place-content-center text-2xl"
>
	<slot />
</button>

<style lang="postcss">
	.hover {
		@apply bg-megan-500 text-megan-50;
	}
	.selected {
		@apply bg-megan-600 text-megan-100;
	}
</style>
