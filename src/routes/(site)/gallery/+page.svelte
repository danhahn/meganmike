<script>
	import Headline from '$lib/components/Headline.svelte';
	import Img from '$lib/components/Img.svelte';
	import Section from '$lib/components/Section.svelte';
	import { title } from '$lib/utils';

	const items = Array.from({ length: 12 }).map((_, index) => index + 1);
</script>

<svelte:head>
	<title>Gallery | {title}</title>
</svelte:head>

<Headline>Gallery</Headline>
<Section>
	<div class="grid gap-2 p-2 grid-cols-1 sm:grid-cols-2">
		{#each items as item}
			<Img
				src={`gallery${item}.jpg`}
				alt="All smiles"
				gravity="faces"
				size="square"
				class="rounded-xl"
			/>
		{/each}
	</div>
</Section>
