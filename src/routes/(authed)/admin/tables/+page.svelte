<script lang="ts">
	import { fly } from 'svelte/transition';
	import Headline from '$lib/components/Headline.svelte';
	import Section from '$lib/components/Section.svelte';
	import { db, firestore } from '$lib/firebase/firebase';
	import type { FirebaseResponse as Guest, Table } from '$lib/types';
	import { collectionStore } from 'sveltefire';
	import { draggable, dropZone } from '$lib/dnd';
	import { quintOut } from 'svelte/easing';
	import Input from '$lib/components/forms/Input.svelte';
	import Button from '$lib/components/forms/Button.svelte';
	import { addTableToFirebase, createTableDataSet } from '$lib/utils';
	import { doc, updateDoc } from 'firebase/firestore';

	let numTables: string = '12';
	let seatsPerTable: string = '12';
	let numTablesError: string;
	let seatsPerTableError: string;
	let status: 'idle' | 'submitting' | 'error' = 'idle';

	let guests: Guest[] = [];
	let tables: Table[] = [];

	const tableData = collectionStore<Table>(firestore, 'tables');
	const guestData = collectionStore<Guest>(firestore, 'guests');

	$: {
		tables = [...$tableData].sort((a, b) => a.tableNumber - b.tableNumber);
		guests = [...$guestData].filter((guest) => guest.table === undefined);
	}

	const checkIfTableIsOpen = (seats: number, partySize: number): boolean =>
		!(seats <= 0 || seats < partySize);

	async function moveToTable(id: string, table: number) {
		const guest = guests.find((guest) => guest.id === id);
		if (guest === undefined) return;

		const numberOfGuests = (guest?.guests.length ?? 0) + 1;
		const currentTable = tables.find(({ tableNumber }) => tableNumber === table);
		const openSeatsAtTable = currentTable?.guests.filter((i) => i === null).length ?? 0;

		if (checkIfTableIsOpen(openSeatsAtTable, numberOfGuests) && currentTable) {
			const startingIndex = currentTable.guests.findIndex((guest) => guest === null);

			const newData = [
				...currentTable.guests.slice(0, startingIndex),
				...Array.from({ length: numberOfGuests }, () => guest),
				...currentTable.guests.slice(startingIndex + numberOfGuests)
			];

			const tableRef = doc(db, 'tables', currentTable.id);
			const guestRef = doc(db, 'guests', guest.id);

			await updateDoc(tableRef, { guests: newData });
			await updateDoc(guestRef, { table: currentTable.tableNumber });
		} else {
			alert('No spots at that table');
		}
	}

	async function updateTableConfiguration() {
		status = 'submitting';
		if (!numTables || !seatsPerTable) {
			numTablesError = 'Enter a number';
			seatsPerTableError = 'Enter a number';
			status = 'idle';
			return;
		}
		if (Number(numTables) === 0 || Number(seatsPerTable) === 0) {
			numTablesError = 'Enter a number greater than 0';
			seatsPerTableError = 'Enter a number greater than 0';
			status = 'idle';
			return;
		}
		numTablesError = '';
		seatsPerTableError = '';

		const tables = Number(numTables);
		const seats = Number(seatsPerTable);

		const setUpTables = createTableDataSet(tables, seats);

		await setUpTables.forEach((table) => {
			addTableToFirebase(table);
		});
	}
</script>

<Headline>tables</Headline>
<Section>
	{#if tables.length === 0}
		<h2>Set up tables</h2>
		<form class="grid grid-cols-2 gap-4" on:submit|preventDefault={updateTableConfiguration}>
			<Input
				id="numTables"
				type="number"
				label="Number of tables"
				errorMessage={numTablesError}
				bind:value={numTables}
			/>
			<Input
				id="seatsPerTable"
				type="number"
				label="Seats per table"
				errorMessage={seatsPerTableError}
				bind:value={seatsPerTable}
			/>
			<Button class="col-span-2" disabled={status !== 'idle'}>Set Up Tables</Button>
		</form>
	{:else}
		<div class="grid grid-cols-[auto_1fr] gap-4">
			<div class="overflow-auto h-[calc((58px_+_10px)_*_10)] pr-2">
				<ul class="grid gap-2">
					{#each guests as guest (guest.id)}
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
									<div
										class="pointer-events-none aspect-square rounded-full w-4 bg-slate-600"
									></div>
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
	{/if}
</Section>

<style lang="postcss">
	.dropTable:global(.droppable) {
		outline: 0.1rem solid blue;
		outline-offset: 0.25rem;
	}
</style>
