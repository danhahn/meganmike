<script lang="ts">
	import { goto } from '$app/navigation';
	import Rsvp from '$lib/components/Rsvp.svelte';
	import Button from '$lib/components/forms/Button.svelte';
	import Dialog from '$lib/components/Dialog.svelte';

	import type { Guest } from '$lib/types';
	import { deleteGuest, formatPhoneNumber } from '$lib/utils';
	import Td from './Td.svelte';
	import Th from './Th.svelte';
	import Tr from './Tr.svelte';

	export let headerData: string[];
	export let data: Guest[];

	let status: 'yes' | 'no' | 'noResponse' | 'all' = 'all';

	$: filtered = data;

	let deleteGuestData: Guest | undefined;

	let dialog: HTMLDialogElement;

	function handleDialogClose() {
		if (dialog.returnValue === 'success') {
			deleteGuest(deleteGuestData?.id);
			deleteGuestData = undefined;
		}
		if (dialog.returnValue === 'cancel') {
			goto('/admin');
		}
	}

	function filterYes() {
		filtered = data.filter((guest) => guest.rsvp === 'yes');
		status = 'yes';
	}

	function filterNo() {
		filtered = data.filter((guest) => guest.rsvp === 'no');
		status = 'no';
	}

	function filterNoResponse() {
		filtered = data.filter((guest) => guest.rsvp === null);
		status = 'noResponse';
	}

	function filterAll() {
		filtered = data;
		status = 'all';
	}
</script>

<div class="flex gap-4 mt-4 items-center border border-megan-400 py-2 px-4 rounded-lg bg-white">
	<span class="font-bold">RSVP Status:</span>
	<button class:active={status === 'all'} on:click={filterAll}>All</button>
	<button class:active={status === 'yes'} on:click={filterYes}>Yes</button>
	<button class:active={status === 'no'} on:click={filterNo}>No</button>
	<button class:active={status === 'noResponse'} on:click={filterNoResponse}>No Response</button>
</div>

<table {...$$props} class="mt-4 w-full border-collapse lg:border border-megan-800">
	<thead>
		<Tr class="hidden lg:table-row">
			{#each headerData as header}
				<Th>{@html header}</Th>
			{/each}
		</Tr>
	</thead>
	<tbody>
		{#each filtered as row}
			<Tr>
				<Td isRow class="text-2xl lg:text-base">
					<a class="hover:underline underline-offset-2 flex gap-2" href={`/admin/view/${row.id}`}
						>{row.firstName}
						{row.lastName}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="w-4 fill-current"
							viewBox="0 -960 960 960"
							><path
								d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h279v60H180v600h600v-279h60v279q0 24-18 42t-42 18H180Zm202-219-42-43 398-398H519v-60h321v321h-60v-218L382-339Z"
							/></svg
						>
					</a>
				</Td>
				<Td isRow
					><address class="text-base">
						<p class="text-base">{row.address}</p>
						<p class="text-base">{row.address2}</p>
						<p class="text-base">{row.city} {row.state}, {row.zipCode}</p>
					</address></Td
				>
				<Td isRow>{formatPhoneNumber(String(row.phone))}</Td>
				<Td class="mt-4 lg:mt-0 text-2xl text-center">
					<Rsvp rsvp={row.rsvp} totalGuests={row.totalGuests} guest={row} />
				</Td>
				<Td class="mt-4 lg:mt-0 text-center text-2xl">
					{#if row.guests}
						<span class="lg:hidden">+1s:</span> {row.guests.length}
					{/if}
				</Td>
				<Td class="mt-4 lg:mt-0 text-center px-1"
					><Button
						class="inline-flex w-full lg:w-auto gap-1"
						variant="success"
						size="small"
						on:click={() => goto(`/admin/update-guest/${row.id}`)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="w-6 fill-current"
							viewBox="0 -960 960 960"
							><path
								d="M180-180h44l443-443-44-44-443 443v44Zm614-486L666-794l42-42q17-17 42-17t42 17l44 44q17 17 17 42t-17 42l-42 42Zm-42 42L248-120H120v-128l504-504 128 128Zm-107-21-22-22 44 44-22-22Z"
							/></svg
						>
						<span class="lg:hidden">Edit</span>
					</Button></Td
				>
				<Td class="mt-4 lg:mt-0 text-center px-1"
					><Button
						class="inline-flex w-full lg:w-auto gap-1"
						variant="warning"
						size="small"
						on:click={() => {
							deleteGuestData = row;
							dialog.showModal();
						}}
						><svg
							class="w-6 fill-current"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 -960 960 960"
							><path
								d="m361-299 119-121 120 121 47-48-119-121 119-121-47-48-120 121-119-121-48 48 120 121-120 121 48 48ZM261-120q-24 0-42-18t-18-42v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570Zm-438 0v570-570Z"
							/></svg
						>
						<span class="lg:hidden">Delete</span></Button
					></Td
				>
			</Tr>
		{/each}
	</tbody>
</table>

<Dialog id="addGuest" bind:dialog on:close={handleDialogClose} cancel="Cancel" confirm="Delete">
	{#if deleteGuestData}
		<h1 class="text-3xl mb-4">
			Are you sure you want to remote <span class="font-bold block"
				>{deleteGuestData.firstName} {deleteGuestData.lastName}</span
			> from the wedding?
		</h1>
	{/if}
</Dialog>

<style lang="postcss">
	button {
		@apply border border-megan-400 py-1 px-4 rounded-lg bg-white text-megan-800;
	}

	button.active {
		@apply bg-megan-400 text-white;
	}
</style>
