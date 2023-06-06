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
		guests?: Number;
		id?: String;
		delete?: string;
	};

	export let headerData: String[];
	export let data: TableData[];
</script>

<table {...$$props} class="mt-4 w-full border-collapse border border-megan-800">
	<thead>
		<tr>
			{#each headerData as header}
				<Th>{@html header}</Th>
			{/each}
			<Th class="text-center px-0"
				><div class="grid place-content-center">
					<svg xmlns="http://www.w3.org/2000/svg" class="w-6 fill-current" viewBox="0 -960 960 960"
						><path
							d="M180-180h44l443-443-44-44-443 443v44Zm614-486L666-794l42-42q17-17 42-17t42 17l44 44q17 17 17 42t-17 42l-42 42Zm-42 42L248-120H120v-128l504-504 128 128Zm-107-21-22-22 44 44-22-22Z"
						/></svg
					>
				</div></Th
			>
		</tr>
	</thead>
	<tbody>
		{#each data as row}
			<Tr>
				<Td><a href={`/admin/view/${row.id}`}>{row.name}</a></Td>
				<Td>{row.email}</Td>
				<Td>{row.phone}</Td>
				<Td>{row.address}</Td>
				<Td>{row.rsvp ? 'Yes' : 'No'}</Td>
				<Td class="text-center text-2xl">{row.guests}</Td>
				<Td class="text-center px-1"
					><Button variant="warning" on:click={() => console.log(row.id)}
						><svg
							class="w-6 fill-current"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 -960 960 960"
							><path
								d="m361-299 119-121 120 121 47-48-119-121 119-121-47-48-120 121-119-121-48 48 120 121-120 121 48 48ZM261-120q-24 0-42-18t-18-42v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570Zm-438 0v570-570Z"
							/></svg
						></Button
					></Td
				>
				<Td class="px-1"
					><Button variant="success" on:click={() => goto(`/admin/update-guest?id=${row.id}`)}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="w-6 fill-current"
							viewBox="0 -960 960 960"
							><path
								d="M180-180h44l443-443-44-44-443 443v44Zm614-486L666-794l42-42q17-17 42-17t42 17l44 44q17 17 17 42t-17 42l-42 42Zm-42 42L248-120H120v-128l504-504 128 128Zm-107-21-22-22 44 44-22-22Z"
							/></svg
						>
					</Button></Td
				>
			</Tr>
		{/each}
	</tbody>
</table>
