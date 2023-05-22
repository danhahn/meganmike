<script>
	import Headline from '$lib/components/Headline.svelte';
	import Table from '$lib/components/admin/table/Table.svelte';
</script>

<Headline class="block">Admin</Headline>

<div class="grid grid-cols-2 gap-4">
	<div class="rsvp">
		<h2>Total Number of guest invited</h2>
		<p>0</p>
	</div>
	<div class="rsvp">
		<h2>Total Number of RSVPed</h2>
		<p>0</p>
	</div>
</div>

<Table headerData={['Name', 'Email', 'Phone', 'Address', 'RSVP', 'Guests']} />

<style lang="postcss">
	.rsvp {
		@apply p-4 rounded-2xl border-2 border-megan-800 bg-megan-200 text-center;
	}

	.rsvp p {
		@apply text-9xl text-megan-800;
	}
</style>
