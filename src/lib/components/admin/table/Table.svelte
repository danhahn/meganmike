<script lang="ts">
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
	export let data: TableData[] = [];
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
		<Tr>
			<Td>John Doe</Td>
			<Td>johndoe@example.com</Td>
			<Td>123-456-7890</Td>
			<Td>123 Main Street, Anytown, CA 91234</Td>
			<Td>Yes</Td>
			<Td>2</Td>
			<Td><Button>Edit</Button></Td>
		</Tr>
		<Tr>
			<Td>Jane Doe</Td>
			<Td>janedoe@example.com</Td>
			<Td>555-678-9012</Td>
			<Td>456 Elm Street, Anytown, CA 91234</Td>
			<Td>No</Td>
			<Td>0</Td>
			<Td><Button>Edit</Button></Td>
		</Tr>
	</tbody>
</table>
