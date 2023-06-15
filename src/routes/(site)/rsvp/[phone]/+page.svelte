<script lang="ts">
	import Headline from '$lib/components/Headline.svelte';
	import Section from '$lib/components/Section.svelte';
	import Button from '$lib/components/forms/Button.svelte';
	import Input from '$lib/components/forms/Input.svelte';
	import { title } from '$lib/utils';

	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>RSVP | {title}</title>
</svelte:head>

<Headline>RSVP</Headline>

<Section>
	<Input name="phone" id="phone" label="Confirm your Phone number" value={data.phone} />

	<div class="grid grid-cols-2 gap-4">
		<Button variant="warning">RSVP NO</Button>
		<Button variant="success">RSVP YES</Button>
	</div>
</Section>
