<script>
	import Headline from '$lib/components/Headline.svelte';
	import Table from '$lib/components/admin/table/Table.svelte';

	const tableData = [
		{
			name: 'John Doe',
			email: 'johndoe@example.com',
			phone: '123-456-7890',
			address: '123 Main Street, Anytown, CA 91234',
			rsvp: true,
			guests: 2,
			id: '123'
		},
		{
			name: 'Jane Doe',
			email: 'janedoe@example.com',
			phone: '555-678-9012',
			address: '456 Elm Street, Anytown, CA 91234',
			rsvp: false,
			guests: 0,
			id: '456'
		}
	];
</script>

<Headline class="block">Admin</Headline>

<div class="grid grid-rows-2 lg:grid-cols-2 gap-4">
	<div class="rsvp">
		<h2>Total Number of guest invited</h2>
		<p>0</p>
	</div>
	<div class="rsvp">
		<h2>Total Number of RSVPed</h2>
		<p>0</p>
	</div>
</div>

<Table headerData={['Name', 'Email', 'Phone', 'Address', 'RSVP', 'Guests']} data={tableData} />

<style lang="postcss">
	.rsvp {
		@apply p-4 rounded-2xl border-2 border-megan-800 bg-megan-200 text-center;
	}

	.rsvp p {
		@apply text-xl lg:text-9xl text-megan-800;
	}
</style>
