<script>
	import Headline from '$lib/components/Headline.svelte';
	import Img from '$lib/components/Img.svelte';
	import Section from '$lib/components/Section.svelte';
	import { title } from '$lib/utils';

	const items = [
		'engagment/water.jpg',
		'engagment/kiss.jpg',
		'engagment/snuggle.jpg',
		'engagment/hero.jpg',
		'engagment/theshot.jpg',
		'engagment/dip.jpg',
		'engagment/love.jpg',
		'gallery1.jpg',
		'gallery2.jpg',
		'gallery3.jpg',
		'gallery4.jpg',
		'gallery5.jpg',
		'gallery6.jpg',
		'gallery7.jpg',
		'gallery8.jpg',
		'gallery9.jpg',
		'gallery10.jpg',
		'gallery11.jpg',
		'gallery12.jpg'
	];
</script>

<svelte:head>
	<title>Gallery | {title}</title>
</svelte:head>

<Headline>Gallery</Headline>
<Section>
	<div class="grid gap-2 p-2 grid-cols-1 sm:grid-cols-2">
		{#each items as item}
			<Img src={item} alt="" gravity="faces" size="square" class="rounded-xl" />
		{/each}
	</div>
</Section>
