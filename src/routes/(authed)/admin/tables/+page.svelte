<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import Headline from '$lib/components/Headline.svelte';
	import Section from '$lib/components/Section.svelte';
	import { db, firestore } from '$lib/firebase/firebase';
	import type { Guest, RsvpProps, Table } from '$lib/types';
	import { collectionStore } from 'sveltefire';
	import { draggable, dropZone } from '$lib/dnd';
	import { quintOut } from 'svelte/easing';
	import Input from '$lib/components/forms/Input.svelte';
	import Button from '$lib/components/forms/Button.svelte';
	import { addTableToFirebase, checkIfTableIsOpen, createTableDataSet } from '$lib/utils';
	import { deleteField, doc, setDoc, updateDoc } from 'firebase/firestore';
	import Dialog from '$lib/components/Dialog.svelte';

	let numTables: string = '12';
	let seatsPerTable: string = '12';
	let numTablesError: string;
	let seatsPerTableError: string;
	let status: 'idle' | 'submitting' | 'error' = 'idle';

	let dialog: HTMLDialogElement;

	type TableGuest =
		| {
				name: string | null;
				id?: string;
				rsvp: RsvpProps;
				deleted?: boolean;
		  }
		| undefined;

	type TableView = {
		guests?: TableGuest[];
		tableNumber?: number;
		id?: string;
	};

	let activeTable: TableView = {};

	let guests: Guest[] = [];
	let tables: Table[] = [];

	$: tableData = collectionStore<Table>(firestore, 'tables');
	$: guestData = collectionStore<Guest>(firestore, 'guests');

	$: {
		tables = [...$tableData].sort((a, b) => a.tableNumber - b.tableNumber);
		guests = [...$guestData]
			.filter((guest) => guest.rsvp === 'yes')
			.filter((guest) => guest.table === undefined);
	}
	$: numberOfGuestPerTable = tables.length
		? tables.reduce((acc, table) => table.guests.length + acc, 0) / tables.length
		: 0;

	$: console.log(numberOfGuestPerTable);

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
				...Array.from({ length: numberOfGuests }, () => guest.id),
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

	function setActiveTable({ guests, id, tableNumber }: Table) {
		let activeGuest: string | null;
		let count: number = 0;
		const table: TableGuest[] = guests.map((guest) => {
			if (guest !== null) {
				const currentGuest = $guestData.find((g) => g.id === guest);
				if (currentGuest === undefined) return;
				const { firstName, lastName, guests } = currentGuest;
				//Check if the current guest is not the active guest
				if (activeGuest !== guest) {
					// If not, make the current guest the active guest
					activeGuest = guest;
					// Reset the count
					count = 0;
				} else {
					// If the current guest is the active guest, increment the count
					count++;
				}
				if (count === 0) {
					return {
						name: `${firstName} ${lastName}`,
						id: currentGuest.id,
						rsvp: currentGuest.rsvp
					};
				} else {
					let plusOne = guests[count - 1];
					if (plusOne.firstName === '') {
						return {
							name: `${firstName} ${lastName} +1`,
							id: currentGuest.id,
							rsvp: currentGuest.rsvp
						};
					} else {
						return {
							name: `${plusOne.firstName} ${plusOne.lastName}`,
							id: currentGuest.id,
							rsvp: currentGuest.rsvp
						};
					}
				}
			}
		});

		activeTable = { guests: table, tableNumber, id };
		dialog.showModal();
	}

	const checkIfIdHasRsvp = (id: string | null) =>
		$guestData.find((g) => g.id === id)?.rsvp === 'yes';

	function handleDialogClose() {
		if (dialog.returnValue === 'success') {
			activeTable = {};
		}
		if (dialog.returnValue === 'cancel') {
		}
	}

	async function deleteGuestFromTable(id: string | undefined) {
		if (id === undefined) return;
		if (activeTable.id === undefined) return;

		const docId = activeTable.id;

		const confirm = window.confirm('Are you sure you want to delete this guest?');
		if (!confirm) return;

		const updateTable = activeTable.guests?.filter((guest) => guest?.id !== id) ?? [];

		activeTable.guests = activeTable.guests?.map((guest) => {
			if (guest?.id === id) {
				return { ...guest, deleted: true };
			}
			return guest;
		});

		const itemsInTable = updateTable?.length ?? 0;
		const emptySeats = Array.from({ length: numberOfGuestPerTable - itemsInTable }, () => null);
		const newTable = [...updateTable.map((table) => table?.id), ...emptySeats].map((i) =>
			i === undefined ? null : i
		);

		try {
			const docRef = doc(db, 'tables', docId);
			const guestRef = doc(db, 'guests', id);
			await updateDoc(docRef, { guests: [...newTable] });
			await updateDoc(guestRef, { table: deleteField() });
		} catch (error) {
			console.error(error);
		}
	}
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
	/>
</svelte:head>

<Headline>Table Assignments</Headline>
<Section padding={false} wide>
	<p class="text-center">Use this page to assign party groups to a table.</p>
	<p class="text-center">Only Parties that have RSVPed Yes will show up.</p>
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
		<div class="grid grid-cols-[230px_1fr] gap-4">
			<div class="overflow-auto h-[calc((58px_+_10px)_*_10)] pr-2">
				<ul class="grid gap-2">
					{#each guests as guest (guest.id)}
						<li
							use:draggable={guest.id}
							class="rounded border border-megan-600 p-4 bg-white"
							id={guest.id}
							out:fly={{
								delay: 100,
								duration: 300,
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
					{#if guests.length === 0}
						<div
							in:fade={{
								delay: 400,
								duration: 300,
								easing: quintOut
							}}
							class="border border-megan-800 bg-megan-300/50 p-4 rounded-lg"
						>
							<p class="text-3xl text-center">🎉</p>
							<p>All guests have been assigned to a table.</p>
						</div>
					{/if}
				</ul>
			</div>

			<div class="flex gap-4 flex-col">
				<div class="grid grid-cols-2 gap-4">
					{#each tables as table, index (index)}
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<button
							class="dropTable border-4 border-megan-600 grid grid-cols-6 justify-items-center gap-1 p-4 px-8 rounded-full bg-white"
							id={`table-${index + 1}`}
							on:click={() => setActiveTable(table)}
							use:dropZone={{ onDropZone: moveToTable, tableNumber: table.tableNumber }}
						>
							<p class="pointer-events-none col-span-6 text-center text-megan-800">
								Table {table.tableNumber}
							</p>
							{#each table.guests as seat}
								{#if seat !== null}
									{@const rsvp = checkIfIdHasRsvp(seat)}
									<div
										class="pointer-events-none aspect-square rounded-full w-4 bg-slate-600"
										class:rsvp
									/>
								{:else}
									<div class="pointer-events-none aspect-square rounded-full w-4 bg-slate-600/10" />
								{/if}
							{/each}
						</button>
					{/each}
				</div>
			</div>
		</div>
	{/if}
</Section>

<Dialog id="addGuest" bind:dialog on:close={handleDialogClose} cancel={null} confirm="Done">
	{#if activeTable && activeTable.guests}
		<h1 class="text-3xl mb-4">Table {activeTable.tableNumber}</h1>

		{#each activeTable.guests as guest, index}
			{#if guest !== undefined}
				<div class="grid grid-cols-[auto_1fr_auto_auto] items-center justify-start gap-4">
					<span class="block w-8 text-right text-megan-700">{index + 1}.</span>

					<p class="text-left" class:deleted={guest.deleted}>
						{guest.name}
					</p>
					{#if guest.rsvp === 'yes'}
						<span class:deleted={guest.deleted} class="material-symbols-outlined text-green-500">
							check_circle
						</span>
					{:else if guest.rsvp === 'no'}
						<span class:deleted={guest.deleted} class="material-symbols-outlined text-red-500">
							block
						</span>
					{:else}
						<span class:deleted={guest.deleted} class="material-symbols-outlined text-yellow-500">
							warning
						</span>
					{/if}
					<button
						disabled={guest.deleted}
						type="button"
						on:click={() => deleteGuestFromTable(guest?.id)}
					>
						<span
							class="material-symbols-outlined block aspect-square text-lg leading-none translate-y-1 hover:text-red-600"
							class:deleted={guest.deleted}
						>
							delete
						</span>
					</button>
				</div>
			{:else}
				<p class="flex items-center gap-4">
					<span class="block w-8 text-right text-megan-700">{index + 1}.</span>
					Open Seat
					<span
						class="material-symbols-outlined block aspect-square text-lg leading-none translate-y-1 text-gray-500"
					>
						event_seat
					</span>
				</p>
			{/if}
		{/each}
	{/if}
	<div class="flex gap-4 mt-4 justify-center">
		<div class="flex gap-1">
			<span class="material-symbols-outlined text-green-500"> check_circle </span>RSVP Yes
		</div>
		<div class="flex gap-1">
			<span class="material-symbols-outlined text-red-500"> block </span> RSVP No
		</div>
		<div class="flex gap-1">
			<span class="material-symbols-outlined text-yellow-500"> warning </span> No RSVP Yet
		</div>
	</div>
</Dialog>

<style lang="postcss">
	.dropTable:global(.droppable) {
		outline: 0.1rem solid blue;
		outline-offset: 0.25rem;
	}

	.rsvp {
		@apply bg-green-600;
	}

	.deleted:not(span) {
		@apply line-through text-gray-500 opacity-50;
	}
	span.deleted {
		@apply text-gray-500 opacity-50;
	}
</style>
