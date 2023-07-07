<script>
	import Headline from '$lib/components/Headline.svelte';
	import Img from '$lib/components/Img.svelte';
	import Section from '$lib/components/Section.svelte';
	import Button from '$lib/components/forms/Button.svelte';
	import { title } from '$lib/utils';
	import { fade, fly } from 'svelte/transition';

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

	const photosPerPage = 6;
	const pages = Math.floor(items.length / photosPerPage);
	let itemsPerPage = 6;
	let pageIndex = 0;
	$: pageOffset = pageIndex * itemsPerPage;

	$: currentPageData = items.slice(pageOffset, pageOffset + itemsPerPage);
</script>

<svelte:head>
	<title>Gallery | {title}</title>
</svelte:head>

<Headline>Gallery</Headline>
<Section>
	<div class="grid gap-2 p-2 grid-cols-1 sm:grid-cols-2">
		{#each currentPageData as item}
			{#key item}
				<div in:fade>
					<Img src={item} alt="" gravity="faces" size="square" class="rounded-xl" />
				</div>
			{/key}
		{/each}
	</div>
	<div class="flex justify-between">
		<Button
			disabled={pageIndex === 0}
			on:click={() => {
				pageIndex = pageIndex - 1;
			}}>back</Button
		>
		<Button
			disabled={pageIndex === pages}
			on:click={() => {
				pageIndex = pageIndex + 1;
			}}>next</Button
		>
	</div>
</Section>
