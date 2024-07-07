<script lang="ts">
	import Headline from '$lib/components/Headline.svelte';
	import Button from '$lib/components/forms/Button.svelte';
	import { firestore } from '$lib/firebase/firebase';
	import { title } from '$lib/utils';
	import { collectionStore } from 'sveltefire';

	import { collection, query, orderBy } from 'firebase/firestore';

	const qrSize = 200;
	var baseUrl = 'https://www.meganandmike2024.com';

	const postsRef = collection(firestore, 'guests');
	const q = query(postsRef, orderBy('lastName', 'asc'));
	$: guestData = collectionStore(firestore, q);
</script>

<svelte:head>
	<title>Print QR Codes | {title}</title>
</svelte:head>

<Headline>Print QR Codes</Headline>

<div class="mb-8"><Button on:click={() => window.print()}>Print</Button></div>

{#if $guestData}
	<div class="grid grid-cols-3 gap-8 qr-code">
		{#each $guestData as guest, index}
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
					src={`https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${baseUrl}/rsvp/${guest.id}`}
				/>
				<p class="text-center">{guest.firstName} {guest.lastName}</p>
			</div>
		{/each}
	</div>
{/if}

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
