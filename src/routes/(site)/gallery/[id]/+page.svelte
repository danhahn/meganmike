<script lang="ts">
	import Headline from '$lib/components/Headline.svelte';
	import Section from '$lib/components/Section.svelte';
	import type { PageData } from './$types';

	let files: FileList;

	export let data: PageData;

	function handleUpload() {
		console.log(files);
	}
</script>

<Headline>Add Photos to the gallery</Headline>
<Section>
	<p>Share your photos from todays event</p>

	<input type="file" multiple accept="image/*" bind:value={files} on:change={handleUpload} />

	<p>{data.id}</p>
</Section>
