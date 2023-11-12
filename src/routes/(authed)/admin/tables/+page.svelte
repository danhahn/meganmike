<script lang="ts">
	import { fly } from 'svelte/transition';
	import type { PageData } from './$types';
	import Headline from '$lib/components/Headline.svelte';
	import Section from '$lib/components/Section.svelte';
	import { firestore } from '$lib/firebase/firebase';
	import type { FirebaseResponse } from '$lib/types';
	import { collectionStore } from 'sveltefire';
	import { draggable, dropZone } from '$lib/dnd';
	import { quintOut } from 'svelte/easing';

	let guests = collectionStore<FirebaseResponse>(firestore, 'guests');

	$: guestData = [...$guests];

	export let data: PageData;

	$: tables = [...data.tables];

	// $: console.log(tables);

	const checkIfTableIsOpen = (seats: number, partySize: number): boolean =>
		!(seats <= 0 || seats < partySize);

	function moveToTable(id: string, table: number) {
		const guest = guestData.find((guest) => guest.id === id);
		if (guest === undefined) return;

		const numberOfGuests = (guest?.guests.length ?? 0) + 1;
		const currentTable = tables.find(({ tableNumber }) => tableNumber === table);
		const openSeatsAtTable = currentTable?.guests.filter((i) => i === null).length ?? 0;

		if (checkIfTableIsOpen(openSeatsAtTable, numberOfGuests) && currentTable) {
			const startingIndex = currentTable.guests.findIndex((guest) => guest === null);

			const newData = [
				...currentTable.guests.slice(0, startingIndex),
				...Array.from({ length: numberOfGuests }, () => guest.id),
				...currentTable.guests.slice(startingIndex + numberOfGuests)
			];

			tables = [
				...tables.slice(0, currentTable.tableNumber - 1),
				{ tableNumber: currentTable.tableNumber, guests: newData },
				...tables.slice(currentTable.tableNumber)
			];
			guestData = guestData.filter((item) => item.id !== guest.id);
		} else {
			console.log('No spots at that table');
		}
	}
</script>

<Headline>tables</Headline>
<Section>
	<div class="grid grid-cols-[auto_1fr] gap-4">
		<div class="overflow-auto h-[calc((58px_+_10px)_*_10)] pr-2">
			<ul class="grid gap-2">
				{#each guestData as guest (guest.id)}
					<li
						use:draggable={guest.id}
						class="rounded border border-megan-600 p-4 bg-white"
						id={guest.id}
						out:fly={{
							delay: 250,
							duration: 800,
							x: -300,
							opacity: 0.1,
							easing: quintOut
						}}
					>
						{guest.firstName}
						{guest.lastName}
						{#if guest.guests.length}
							+{guest.guests.length}
						{/if}
					</li>
				{/each}
			</ul>
		</div>

		<div class="flex gap-4 flex-col">
			<div class="grid grid-cols-2 gap-4">
				{#each tables as table, index (index)}
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<div
						class="dropTable border-4 border-megan-600 grid grid-cols-6 justify-items-center gap-1 p-4 px-8 rounded-full bg-white"
						id={`table-${index + 1}`}
						use:dropZone={{ onDropZone: moveToTable, tableNumber: table.tableNumber }}
					>
						<p class="pointer-events-none col-span-6 text-center text-megan-800">
							Table {table.tableNumber}
						</p>
						{#each table.guests as seat}
							{#if seat !== null}
								<div class="pointer-events-none aspect-square rounded-full w-4 bg-slate-600"></div>
							{:else}
								<div
									class="pointer-events-none aspect-square rounded-full w-4 bg-slate-600/10"
								></div>
							{/if}
						{/each}
					</div>
				{/each}
			</div>
		</div>
	</div>
</Section>

<style lang="postcss">
	.dropTable:global(.droppable) {
		outline: 0.1rem solid blue;
		outline-offset: 0.25rem;
	}
</style>
