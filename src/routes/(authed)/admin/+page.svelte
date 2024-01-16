<script lang="ts">
	import Headline from '$lib/components/Headline.svelte';
	import Pagination from '$lib/components/admin/Pagination.svelte';
	import Table from '$lib/components/admin/table/Table.svelte';
	import Button from '$lib/components/forms/Button.svelte';
	import Input from '$lib/components/forms/Input.svelte';
	import { firestore } from '$lib/firebase/firebase';
	import { pageIndex } from '$lib/stores/navigation';
	import type { Guest } from '$lib/types';
	import { title } from '$lib/utils';
	import { debounce } from '$lib/utils';

	import { collection, orderBy, query } from 'firebase/firestore';

	import { collectionStore } from 'sveltefire';

	const postsRef = collection(firestore, 'guests');
	const q = query(postsRef, orderBy('lastName', 'asc'));
	const testGuest = collectionStore(firestore, q);

	type ItemsPerPage = 10 | 20 | 1000;
	let itemsPerPage: ItemsPerPage = 10;

	$: pageOffset = $pageIndex * itemsPerPage;

	$: currentPageData = $testGuest.slice(pageOffset, pageOffset + itemsPerPage) as Guest[];

	let totalNumberOfDocs: number = 0;
	let totalNumberOfGuests: number = 0;
	let totalNumberOfRsvp: number = 0;

	$: if ($testGuest.length) {
		totalNumberOfDocs = $testGuest.length;
		let countGuests = 0;
		let countRsvp = 0;
		$testGuest.map((guest) => {
			countGuests = countGuests + guest.guests.length + 1;
			countRsvp = countRsvp + (guest.totalGuests ?? 0);
			totalNumberOfGuests = countGuests;
			totalNumberOfRsvp = countRsvp;
		});
	}

	function setItemsPerPage(numberOfItems: ItemsPerPage) {
		itemsPerPage = numberOfItems;
		pageIndex.set(0);
	}

	let search = '';
	$: searchData = $testGuest.slice(pageOffset, pageOffset + itemsPerPage) as Guest[];

	function handleSearch() {
		const debouncedSearch = debounce(() => {
			if (search) {
				const searchQuery = search.toLowerCase();
				searchData = searchData.filter((guest) => {
					const fullName = `${guest.firstName} ${guest.lastName}`.toLowerCase();
					return fullName.includes(searchQuery);
				});
			} else {
				searchData = $testGuest.slice(pageOffset, pageOffset + itemsPerPage) as Guest[];
			}
		}, 300);

		debouncedSearch();
	}

	function resetSearch() {
		search = '';
		searchData = $testGuest as Guest[];
	}
</script>

<svelte:head>
	<title>Admin | {title}</title>
</svelte:head>

<Headline class="block">Admin</Headline>

<div class="grid grid-cols-2 gap-4">
	<div class="rsvp">
		<h2 class="text-base mt-0">
			<span class="hidden lg:inline-block">Number of guest invited</span>
		</h2>
		<p>{totalNumberOfGuests}</p>
	</div>
	<div class="rsvp">
		<h2 class="text-base mt-0">
			<span class="hidden lg:inline-block">Total Number of</span> RSVP
		</h2>
		<p>{totalNumberOfRsvp}</p>
	</div>
</div>

<div class="mt-4 grid gap-2">
	<Input id="search" label="Search" type="text" bind:value={search} on:input={handleSearch} />
	{#if search}
		<div class="flex gap-4 items-center">
			<Button size="small" on:click={resetSearch}>reset</Button>
			<p class="text-sm">Showing {searchData.length} results</p>
		</div>
	{/if}
</div>

{#if totalNumberOfDocs > 10}
	<div class="flex gap-2 mt-4">
		<p>View Guest Per Page</p>
		<Button
			variant={itemsPerPage === 10 ? 'primary' : 'secondary'}
			size="small"
			class="w-10 font-sans"
			on:click={() => setItemsPerPage(10)}>10</Button
		>
		<Button
			variant={itemsPerPage === 20 ? 'primary' : 'secondary'}
			size="small"
			class="w-10 font-sans"
			on:click={() => setItemsPerPage(20)}>20</Button
		>
		<Button
			variant={itemsPerPage === 1000 ? 'primary' : 'secondary'}
			size="small"
			class="w-10 font-sans"
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
			'+1s',
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
		data={searchData}
	/>
	<Pagination current={$pageIndex} docsPerPage={itemsPerPage} total={totalNumberOfDocs} />
</div>

<style lang="postcss">
	.rsvp {
		@apply px-2 lg:p-4 rounded-2xl border-2 border-megan-800 bg-megan-200 text-center flex justify-center gap-2 lg:block;
	}

	.rsvp p {
		@apply text-2xl lg:text-6xl text-megan-800 font-mono;
	}
</style>
