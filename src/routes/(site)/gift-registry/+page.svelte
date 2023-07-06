<script>
	import Headline from '$lib/components/Headline.svelte';
	import Img from '$lib/components/Img.svelte';
	import Section from '$lib/components/Section.svelte';
	import Button from '$lib/components/forms/Button.svelte';
	import { title } from '$lib/utils';
</script>

<svelte:head>
	<title>Gift Registry | {title}</title>
</svelte:head>

<Headline>Gift Registry</Headline>

<Img src="gifts.jpg" gravity="north" alt="Wedding Gifts" size="small" />

<Section>
	<h2>We are registered at</h2>

	<img src="/amazon.svg" alt="Amazon logo" class="my-10" />

	<Button
		target="_blank"
		rel="noreferrer"
		href="https://www.amazon.com/hz/wishlist/ls/32I2XRT4S1Z1E/ref=nav_wishlist_lists_3"
		>Link to Amazon</Button
	>
</Section>
