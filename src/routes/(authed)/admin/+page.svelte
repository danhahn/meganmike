<script lang="ts">
	import Headline from '$lib/components/Headline.svelte';
	import Table from '$lib/components/admin/table/Table.svelte';
	import { db } from '$lib/firebase/firebase.client';

	import { collection, onSnapshot } from 'firebase/firestore';
	import { onDestroy } from 'svelte';

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

	const unsubscribe = onSnapshot(ref, (doc) => {
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
					rsvp: data.rsvp,
					guests: data.guests.length ? data.guests.length : '-'
				}
			];
		});
	});

	onDestroy(unsubscribe);
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
	<Table
		headerData={[
			'Name',
			'Email',
			'Phone',
			'Address',
			'RSVP',
			'Guests',
			`<div class="grid place-content-center"><svg
							class="w-6 fill-current"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 -960 960 960"
							><path
								d="m361-299 119-121 120 121 47-48-119-121 119-121-47-48-120 121-119-121-48 48 120 121-120 121 48 48ZM261-120q-24 0-42-18t-18-42v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570Zm-438 0v570-570Z"
							/></svg
						></div>`
		]}
		data={pageData}
	/>
</div>

<style lang="postcss">
	.rsvp {
		@apply px-2 lg:p-4 rounded-2xl border-2 border-megan-800 bg-megan-200 text-center flex justify-center gap-2 lg:block;
	}

	.rsvp p {
		@apply text-2xl lg:text-6xl text-megan-800 font-mono;
	}
</style>
