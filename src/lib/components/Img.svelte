<script lang="ts">
	export let src: string;
	export let alt: string;
	export let gravity:
		| 'north_west'
		| 'north'
		| 'north_east'
		| 'west'
		| 'center'
		| 'east'
		| 'south_west'
		| 'south'
		| 'south_east'
		| 'face'
		| 'faces' = 'center';
	export let size: 'small' | 'large' | 'square' = 'large';

	let height = 300;

	if (size === 'large') {
		height = 600;
	}

	if (size === 'square') {
		height = 1600;
	}

	const path = 'https://res.cloudinary.com/svahtml/image/upload/';
	const photo = `/v1676409035/megan/${src}`;
	$: small = `${path}w_500,h_500,c_fill,g_${gravity}${photo}`;
	$: medium = `${path}w_600,h_300,c_fill,g_${gravity}${photo}`;
	$: large = `${path}w_1600,h_${height},c_fill,g_${gravity}${photo}`;
</script>

<picture>
	<source srcset={large} media="(min-width: 1024px)" />
	<source srcset={medium} media="(min-width: 640px)" />
	<img src={small} {alt} class={$$props.class} />
</picture>

<style lang="postcss">
	img {
		@apply w-full shadow-md shadow-megan-400;
	}
</style>
