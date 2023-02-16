<script lang="ts">
	import Headline from '$lib/components/Headline.svelte';
	import { title } from '$lib/utils';

	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Gallery | {title}</title>
</svelte:head>

<Headline>Gallery</Headline>

<pre>{JSON.stringify(data, null, 2)}</pre>
