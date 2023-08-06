<script lang="ts">
	import Headline from '$lib/components/Headline.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import Pagination from '$lib/components/admin/Pagination.svelte';
	import Table from '$lib/components/admin/table/Table.svelte';
	import Button from '$lib/components/forms/Button.svelte';
	import { db } from '$lib/firebase/firebase.client';
	import { pageIndex } from '$lib/stores/navigation';
	import type { LoadingProps, RsvpProps } from '$lib/types';

	import type { Unsubscribe } from 'firebase/auth';

	import {
		collection,
		getCountFromServer,
		onSnapshot,
		orderBy,
		query,
		where
	} from 'firebase/firestore';
	import { onDestroy, onMount } from 'svelte';

	type Guest = {
		name: string;
		email: string;
		phone: string;
		address: string;
		rsvp: RsvpProps;
		guests?: number;
		id: string;
	};

	type ItemsPerPage = 10 | 20 | 1000;

	let pageData: Guest[] = [];
	let count = 0;
	let itemsPerPage: ItemsPerPage = 10;
	let status: LoadingProps = 'loading';
	$: pageOffset = $pageIndex * itemsPerPage;

	$: currentPageData = pageData.slice(pageOffset, pageOffset + itemsPerPage);

	let totalNumberOfDocs: number = 0;
	let totalNumberOfRsvp: number = 0;

	const ref = collection(db, 'guests');

	let unsubscribe: Unsubscribe = () => null;

	const rsvp = query(ref, where('rsvp', '==', 'yes'));
	const q = query(ref, orderBy('lastName', 'asc'));

	unsubscribe = onSnapshot(q, async (doc) => {
		try {
			const snapshot = await getCountFromServer(ref);
			totalNumberOfDocs = snapshot.data().count;
			const snapshotRsvp = await getCountFromServer(rsvp);
			totalNumberOfRsvp = snapshotRsvp.data().count;
			pageData = [];

			doc.forEach((item) => {
				const id = item.id;
				const data = item.data();
				count = count++;

				pageData = [
					...pageData,
					{
						id,
						name: `${data.firstName} ${data.lastName}`,
						address: `${data.address}<br/> ${data.address2}${data.address2 && '<br/>'} ${
							data.city
						}, ${data.state} ${data.zipCode}`,
						email: data.email,
						phone: data.phone,
						rsvp: data.rsvp,
						guests: data.guests?.length || 0
					}
				];
			});
			status = 'idle';
		} catch (error) {
			status = 'error';
			console.log(error);
		}
	});

	function setItemsPerPage(numberOfItems: ItemsPerPage) {
		itemsPerPage = numberOfItems;
		pageIndex.set(0);
	}

	onDestroy(unsubscribe);
</script>

<svelte:head>
	<title>Admin</title>
</svelte:head>

<Headline class="block">Admin</Headline>
<Loading {status}>
	<div class="grid grid-cols-2 gap-4">
		<div class="rsvp">
			<h2>Total <span class="hidden lg:inline-block">Number of guest invited</span></h2>
			<p>{totalNumberOfDocs}</p>
		</div>
		<div class="rsvp">
			<h2><span class="hidden lg:inline-block">Total Number of</span> RSVP</h2>
			<p>{totalNumberOfRsvp}</p>
		</div>
	</div>

	{#if totalNumberOfDocs > 10}
		<div class="flex gap-2 mt-4">
			<p>View Guest Per Page</p>
			<Button
				variant={itemsPerPage === 10 ? 'primary' : 'secondary'}
				size="small"
				on:click={() => setItemsPerPage(10)}>10</Button
			>
			<Button
				variant={itemsPerPage === 20 ? 'primary' : 'secondary'}
				size="small"
				on:click={() => setItemsPerPage(20)}>20</Button
			>
			<Button
				variant={itemsPerPage === 1000 ? 'primary' : 'secondary'}
				size="small"
				on:click={() => setItemsPerPage(1000)}>All</Button
			>
		</div>
	{/if}
	<div class="overflow-auto">
		<Table
			headerData={[
				'Name',
				// 'Email',
				'Address',
				'Phone',
				'RSVP',
				'Guests',
				`<div class="grid place-content-center"><svg xmlns="http://www.w3.org/2000/svg" class="w-6 fill-current" viewBox="0 -960 960 960"
						><path
							d="M180-180h44l443-443-44-44-443 443v44Zm614-486L666-794l42-42q17-17 42-17t42 17l44 44q17 17 17 42t-17 42l-42 42Zm-42 42L248-120H120v-128l504-504 128 128Zm-107-21-22-22 44 44-22-22Z"
						/></svg
					></div>`,
				`<div class="grid place-content-center"><svg
							class="w-6 fill-current"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 -960 960 960"
							><path
								d="m361-299 119-121 120 121 47-48-119-121 119-121-47-48-120 121-119-121-48 48 120 121-120 121 48 48ZM261-120q-24 0-42-18t-18-42v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570Zm-438 0v570-570Z"
							/></svg
						></div>`
			]}
			data={currentPageData}
		/>
		<Pagination current={$pageIndex} docsPerPage={itemsPerPage} total={totalNumberOfDocs} />
	</div>
</Loading>

<style lang="postcss">
	.rsvp {
		@apply px-2 lg:p-4 rounded-2xl border-2 border-megan-800 bg-megan-200 text-center flex justify-center gap-2 lg:block;
	}

	.rsvp p {
		@apply text-2xl lg:text-6xl text-megan-800 font-mono;
	}
</style>
