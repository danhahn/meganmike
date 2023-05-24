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
		},
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
		},
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
		},
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

<div class="grid grid-cols-2 gap-4">
	<div class="rsvp">
		<h2>Total <span class="hidden lg:inline-block">Number of guest invited</span></h2>
		<p>{tableData.length}</p>
	</div>
	<div class="rsvp">
		<h2><span class="hidden lg:inline-block">Total Number of </span>RSVP</h2>
		<p>{tableData.filter((item) => item.rsvp).length}</p>
	</div>
</div>

<div class="overflow-auto">
	<Table headerData={['Name', 'Email', 'Phone', 'Address', 'RSVP', 'Guests']} data={tableData} />
</div>

<style lang="postcss">
	.rsvp {
		@apply px-2 lg:p-4 rounded-2xl border-2 border-megan-800 bg-megan-200 text-center flex justify-center gap-2 lg:block;
	}

	.rsvp p {
		@apply text-2xl lg:text-6xl text-megan-800 font-mono;
	}
</style>
