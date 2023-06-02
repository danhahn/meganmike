<script lang="ts">
	import { page } from '$app/stores';
	import Headline from '$lib/components/Headline.svelte';
	import Table from '$lib/components/admin/table/Table.svelte';
	import { db } from '$lib/firebase/firebase.client';

	import { collection, onSnapshot } from 'firebase/firestore';

	type Guest = {
		name: string;
		email: string;
		phone: string;
		address: string;
		rsvp: boolean;
		guests?: number;
		id: string;
	};

	let pageData: Guest[] = [];
	let count = 0;

	const ref = collection(db, 'guests');

	const unsub = onSnapshot(ref, (doc) => {
		doc.forEach((item) => {
			const id = item.id;
			const data = item.data();
			count = count++;

			pageData = [
				...pageData,
				{
					id,
					name: `${data.firstName} ${data.lastName}`,
					address: `${data.address} ${data.address2} ${data.city}, ${data.state} ${data.zipCode}`,
					email: data.email,
					phone: data.phone,
					rsvp: data.rsvp
				}
			];
		});
	});
</script>

<Headline class="block">Admin</Headline>

<div class="grid grid-cols-2 gap-4">
	<div class="rsvp">
		<h2>Total <span class="hidden lg:inline-block">Number of guest invited</span></h2>
		<p>{pageData.length}</p>
	</div>
	<div class="rsvp">
		<h2><span class="hidden lg:inline-block">Total Number of </span>RSVP</h2>
		<p>{pageData.filter((item) => item.rsvp).length}</p>
	</div>
</div>

<div class="overflow-auto">
	<Table headerData={['Name', 'Email', 'Phone', 'Address', 'RSVP', 'Guests']} data={pageData} />
</div>

<style lang="postcss">
	.rsvp {
		@apply px-2 lg:p-4 rounded-2xl border-2 border-megan-800 bg-megan-200 text-center flex justify-center gap-2 lg:block;
	}

	.rsvp p {
		@apply text-2xl lg:text-6xl text-megan-800 font-mono;
	}
</style>
