<script lang="ts">
	import Headline from '$lib/components/Headline.svelte';
	import Section from '$lib/components/Section.svelte';
	import Table from '$lib/components/admin/table/Table.svelte';
	import Button from '$lib/components/forms/Button.svelte';
	import Input from '$lib/components/forms/Input.svelte';
	import { db, firestore } from '$lib/firebase/firebase';
	import type { FirebaseResponse } from '$lib/types';
	import { doc, setDoc } from 'firebase/firestore';
	import { collectionStore, docStore } from 'sveltefire';

	const configDoc = 'table/config';

	type Table = {
		tableCount: string;
		seatsPerTable: string;
	};

	const config = docStore<Table>(firestore, configDoc);
	const guests = collectionStore<FirebaseResponse>(firestore, 'guests');

	let isEdit = false;

	$: tableCount = $config?.tableCount;
	$: seatsPerTable = $config?.seatsPerTable;

	async function updateConfig() {
		if (!tableCount || !seatsPerTable) {
			console.error('enter valid numbers');
			return;
		}
		const configRef = doc(db, configDoc);
		const docRef = await setDoc(configRef, { tableCount, seatsPerTable }, { merge: true });
		console.log('Document written with ID: ', docRef);
	}

	function getDraggedParent(node: any) {
		if (!node.dataset.index) {
			return getDraggedParent(node.parentNode);
		} else {
			return { ...node.dataset };
		}
	}

	const hoverColor = 'bg-megan-400/50';

	let isOver: string | boolean = false;
	// export let list: any[];

	function onDragStart(e: DragEvent) {
		const target = e.target as HTMLDivElement;
		if (target) {
			target.style.opacity = '0.4';
		}

		console.log('start');
	}
	function onDragEnd(e: DragEvent) {
		const target = e.target as HTMLDivElement;
		if (target) {
			target.style.opacity = '1';
		}

		console.log('end');
	}

	function onDragOver(e: DragEvent) {
		const target = e.target as HTMLDivElement;
		if (target) {
			target.classList.add(hoverColor);
		}
		console.log('over');
	}
	function onDragLeave(e: DragEvent) {
		const target = e.target as HTMLDivElement;
		if (target) {
			target.classList.remove(hoverColor);
		}
		console.log('leave');
	}

	function onDrop(e: DragEvent) {
		e.preventDefault();
		console.log('drop');
	}
</script>

<Headline>tables</Headline>
<Section>
	<div class="grid grid-cols-[auto_1fr] gap-4">
		<div class="overflow-auto h-[calc((58px_+_10px)_*_10)] pr-2">
			<ul class="grid gap-2">
				{#each $guests as guest (guest.id)}
					<li
						on:dragstart={onDragStart}
						on:dragend={onDragEnd}
						class="rounded border border-megan-600 p-4 bg-white"
						draggable="true"
						id={guest.id}
					>
						{guest.firstName}
						{guest.lastName} +{guest.guests.length}
					</li>
				{/each}
			</ul>
		</div>

		{#if !$config?.tableCount || !$config.seatsPerTable || isEdit}
			<h2>Configure the Room</h2>
			<div class="grid gap-2 lg:grid-cols-2">
				<Input id="tables" label="Number of Tables" type="number" bind:value={tableCount} />
				<Input id="seats" label="Seats Per Table" type="number" bind:value={seatsPerTable} />
			</div>
			<Button on:click={updateConfig}>Save</Button>
		{:else}
			<div class="flex gap-4 flex-col">
				<Button on:click={() => (isEdit = true)}>Edit Config</Button>
				<div class="grid grid-cols-2 gap-4">
					{#each Array.from({ length: Number(tableCount) }) as table, index (index)}
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<div
							class="border-4 relative border-megan-600 grid grid-cols-6 justify-items-center gap-1 p-4 px-8 rounded-full bg-white"
							id={`table-${index + 1}`}
						>
							<p class="col-span-6 text-center text-megan-800">Table {index + 1}</p>
							{#each Array.from({ length: Number(seatsPerTable) }) as seat}
								<div class="aspect-square rounded-full w-4 bg-slate-600"></div>
							{/each}
							<div
								class="absolute inset-0 rounded-full"
								on:dragover={onDragOver}
								on:dragleave={onDragLeave}
								on:drop|preventDefault={onDrop}
							></div>
						</div>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</Section>

<style lang="postcss">
	:global('.over') {
		border: 1000px dotted #666;
	}
</style>
