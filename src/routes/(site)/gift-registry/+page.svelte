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

<Img src="gifts2.jpg" gravity="center" alt="Wedding Gifts" size="small" />

<Section>
	<h2>We are registered at</h2>

	<div class="border border-megan-600 p-6 rounded-lg bg-white">
		<img src="/amazon.svg" alt="Amazon logo" class="my-10 w-full" />
		<Button
			target="_blank"
			rel="noreferrer"
			href="https://www.amazon.com/wedding/registry/36N1N7K2MD39N?ref=wr_search_page_result_1"
			>Shop Amazon</Button
		>
	</div>
	<div class="border border-megan-600 p-6 rounded-lg bg-white">
		<img src="/CrateandBarrelLogo.svg" alt="Create and Barrel" class="my-10 w-full" />
		<Button
			target="_blank"
			rel="noreferrer"
			href="https://www.crateandbarrel.com/gift-registry/megan-iasenza/r6753029"
			>Shop Create and Barrel</Button
		>
	</div>
	<div class="border border-megan-600 p-6 rounded-lg bg-white">
		<img
			src="https://shop.water.com/media/logo/stores/1/Primo_Logo_Web.png"
			alt="Create and Barrel"
			class="my-10 w-1/4 text-center block mx-auto"
		/>
		<Button target="_blank" rel="noreferrer" href="https://shop.water.com/smart-touch"
			>Shop Here</Button
		>
		<p class="text-sm mt-4 flex gap-2 mx-4">
			<span class="translate-y-1">*</span>
			<span>
				note this is not a registry. Please text Tracy if you are interested in giving this a gift
				to see its availability.
			</span>
		</p>
	</div>
</Section>
