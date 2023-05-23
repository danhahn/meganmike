<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/forms/Button.svelte';
	import Td from './Td.svelte';
	import Th from './Th.svelte';
	import Tr from './Tr.svelte';

	type TableData = {
		name: String;
		email: String;
		phone: String;
		address: String;
		rsvp: Boolean;
		guests: Number;
		id?: String;
	};

	export let headerData: String[];
	export let data: TableData[];
</script>

<table {...$$props} class="mt-4 w-full border-collapse border border-megan-800">
	<thead>
		<tr>
			{#each headerData as header}
				<Th>{header}</Th>
			{/each}
			<Th>Edit</Th>
		</tr>
	</thead>
	<tbody>
		{#each data as row}
			<Tr>
				<Td>{row.name}</Td>
				<Td>{row.email}</Td>
				<Td>{row.phone}</Td>
				<Td>{row.address}</Td>
				<Td>{row.rsvp ? 'Yes' : 'No'}</Td>
				<Td>{row.guests}</Td>
				<Td><Button on:click={() => goto(`/admin/update-guest?id=${row.id}`)}>Edit</Button></Td>
			</Tr>
		{/each}
	</tbody>
</table>
