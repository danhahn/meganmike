<script lang="ts">
	import { browser, dev } from '$app/environment';
	import type { PageData } from './$types';
	import Button from '$lib/components/forms/Button.svelte';

	export let data: PageData;

	const qrSize = 1000;

	let baseUrl = 'https://www.meganandmike2024.com';

	if (browser && dev) {
		// get just the domain and protocol from the current turl
		const url = window.location.origin;

		baseUrl = url;

		console.log('baseUrl', baseUrl);
	}
</script>

<div class="printable grid gap-4 justify-center text-center max-w-[1000px]">
	<h2 class="text-3xl">Scan to add to the Gallery {data.id}</h2>
	<img
		alt=""
		src={`https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${baseUrl}/gallery/${data.id}`}
	/>

	<p>Or type this address in to your web browser</p>
	<a class="text-2xl" href={`${baseUrl}/gallery/${data.id}`}>{baseUrl}/gallery/{data.id}</a>
</div>

<Button on:click={() => window.print()}>Print</Button>

<style lang="postcss">
	@media print {
		@page {
			size: 8.5in 11in;
			margin: 0.6in;
		}

		:global(*) {
			visibility: hidden;
		}

		.printable,
		.printable * {
			visibility: visible;
		}

		.printable {
			position: absolute;
			left: 0;
			top: 0;
		}
	}
</style>
