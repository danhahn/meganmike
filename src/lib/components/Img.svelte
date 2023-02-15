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

	const path = 'https://res.cloudinary.com/svahtml/image/upload/';
	const photo = `/v1676409035/megan/${src}`;
	$: small = `${path}w_500,h_500,c_fill,g_${gravity}${photo}`;
	$: medium = `${path}w_600,h_300,c_fill,g_${gravity}${photo}`;
	$: large = `${path}w_1200,h_600,c_fill,g_${gravity}${photo}`;
</script>

<picture class={$$props.class}>
	<source srcset={large} media="(min-width: 1024px)" />
	<source srcset={medium} media="(min-width: 640px)" />
	<img src={small} {alt} />
</picture>

<style lang="postcss">
	img {
		width: 100%;
	}
</style>
