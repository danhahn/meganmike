<script lang="ts">
	import Button from '../forms/Button.svelte';

	export let total: number;
	export let current: number;
	export let docsPerPage: number;

	$: numberOfPages = total / docsPerPage;
</script>

<div class="flex justify-center mt-4">
	<Button size="small">Back</Button>
	{#each Array.from({ length: numberOfPages }) as page, index}
		<Button size="small" variant={current === index ? 'secondary' : 'primary'}>{index + 1}</Button>
	{/each}
	<Button size="small">next</Button>
</div>
