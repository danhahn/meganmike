<script>
	import Headline from '$lib/components/Headline.svelte';
	import Img from '$lib/components/Img.svelte';
	import Section from '$lib/components/Section.svelte';
	import { title } from '$lib/utils';
</script>

<svelte:head>
	<title>Content | {title}</title>
</svelte:head>

<Headline>Contact</Headline>
<Img src="beach.jpg" alt="All smiles" gravity="faces" size="small" />

<Section>
	<p>
		We would love to hear from you! If you have any questions or just want to say hello, please
		don't hesitate to get in touch with us.
	</p>

	<h2>Email</h2>
	<p>
		Send us an email at <a href="mailto:meganiasenza@gmail.com?subject=Wedding Question"
			>meganiasenza@gmail.com</a
		>.
	</p>

	<h2>Phone</h2>
	<p>Give us a call at <a href="tel:631-521-1224">631-521-1224</a>.</p>
</Section>

<style lang="postcss">
	a {
		@apply text-megan-800 underline underline-offset-4 hover:text-megan-600;
	}
</style>
