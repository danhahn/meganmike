<script lang="ts">
	import { browser, dev } from '$app/environment';
	import type { PageData } from './$types';
	import Button from '$lib/components/forms/Button.svelte';
	import GetStarted from '$lib/components/GetStarted.svelte';

	export let data: PageData;

	const qrSize = 1000;

	let baseUrl = 'https://www.meganandmike2024.com';

	if (browser) {
		// get just the domain and protocol from the current turl
		const url = window.location.origin;

		baseUrl = url;

		console.log('baseUrl', baseUrl);
	}
</script>

<div class="printable grid gap-4 justify-center text-center max-w-[1000px]">
	<h2 class="text-5xl normal-case my-8">Share in Today's Memories</h2>
	<div class="grid grid-cols-2 gap-4">
		<div class="grid">
			<div
				class="border border-black rounded-lg bg-white p-7 aspect-square grid place-content-center"
			>
				<img
					class="max-w-[90%] w-full text-center mx-auto"
					alt=""
					src={`https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${baseUrl}/gallery/${data.id}`}
				/>
			</div>
			<div class="p-4">
				<h3 class="text-4xl text-balance mb-4">Give this QR code a scan!</h3>
				<p class="text-pretty">To check out the gallery and spread your joyous moments.</p>
				<div class="grid grid-cols-[1fr_auto_1fr] items-center gap-4 my-8">
					<hr class="border-black" />
					<p>OR</p>
					<hr class="border-black" />
				</div>
				<p class="text-sm text-pretty mb-4">
					For those who prefer the classic touch, type this address into your browser.
				</p>
				<a class="" href={`${baseUrl}/gallery/${data.id}`}>{baseUrl}/gallery/{data.id}</a>
			</div>
		</div>

		<GetStarted isInline />
	</div>
</div>

<Button on:click={() => window.print()}>Print</Button>

<style lang="postcss">
	@media print {
		@page {
			size: 8.5in 11in;
			margin: 0.6in;
		}

		:global(*:not(.get-started):not(.get-started *)) {
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
