<script lang="ts">
	export let isRow: boolean = false;
</script>

<td
	{...$$props}
	class={`lg:border border-megan-800 lg:px-4 lg:py-2 whitespace-nowrap ${$$props.class}`}
	class:isRow><slot /></td
>

<style lang="postcss">
	.isRow {
		grid-column: 1 / -1;
	}
</style>
