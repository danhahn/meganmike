<script lang="ts">
	import type { PageData } from './$types';
	import Headline from '$lib/components/Headline.svelte';
	import Button from '$lib/components/forms/Button.svelte';
	import { title } from '$lib/utils';

	import { browser } from '$app/environment';

	export let data: PageData;

	const qrSize = 200;
	var baseUrl = 'https://www.meganandmike2024.com';

	if (browser) {
		// get just the domain and protocol from the current turl
		const url = window.location.origin;

		baseUrl = url;
	}
</script>

<svelte:head>
	<title>Print QR Codes | {title}</title>
</svelte:head>

<Headline>Print QR Codes</Headline>

<div class="mb-8"><Button on:click={() => window.print()}>Print</Button></div>

<div class="grid grid-cols-3 gap-8 qr-code">
	{#each Array.from({ length: 12 }) as guest, index}
		{#if index % 12 === 0}
			<div class="page-break hidden"></div>
		{/if}
		<div
			class="gr-box grid items-center justify-center gap-4 bg-white border border-spacing-1 border-black p-4"
			class:override={(index % 12 === 0 && index !== 0) ||
				(index % 12 === 1 && index !== 1) ||
				(index % 12 === 2 && index !== 2)}
		>
			<img
				alt=""
				src={`https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${baseUrl}/gallrey/${data.id}`}
			/>
			<p class="text-center">Add Photos</p>
		</div>
	{/each}
</div>

<style lang="postcss">
	@media print {
		@page {
			size: 8.5in 11in;
			margin: 0.6in;
		}

		:global(*) {
			visibility: hidden;
		}

		.qr-code,
		.qr-code * {
			visibility: visible;
		}

		.qr-code {
			position: absolute;
			left: 0;
			top: 0;
			gap: 0.6in;
		}

		.gr-box {
			width: 2in;
			height: 2in;
			padding: 0.1in;
			gap: 0.1in;
			border: none;
		}

		.gr-box img {
			width: 1.5in;
			height: 1.5in;
		}

		.page-break {
			page-break-after: always;
		}

		.override {
			margin-top: -0.6in;
		}
	}
</style>
