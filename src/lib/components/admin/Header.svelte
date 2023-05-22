<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { authHandlers } from '$lib/stores/authStore';
	import Logo from '../Logo.svelte';
	import Button from '../forms/Button.svelte';

	type NavData = {
		label: string;
		url: string;
		disabled?: boolean;
		offset?: boolean;
	};

	const navData: NavData[] = [
		{ label: 'View All Guest', url: '/admin' },
		{ label: 'Add Guest', url: '/admin/add-guest' },
		{ label: 'Update Guest', url: '/admin/update-guest' },
		{ label: 'Tables', url: '/admin/tables' },
		{
			label: `
			<svg xmlns="http://www.w3.org/2000/svg" class="h-4 fill-megan-900" viewBox="0 96 960 960"><path d="M655 976 255 576l400-400 56 57-343 343 343 343-56 57Z"/></svg>
			<span class="text-megan-900">Back to Site</span>`,
			url: '/',
			offset: true
		}
	];
</script>

<header class="bg-megan-300 grid grid-rows-[auto_1fr_auto]">
	<div class="px-4 py-5">
		<Logo size="small" />
	</div>
	<ul class="flex flex-col">
		{#each navData as nav}
			{#if !nav.disabled}
				<li class={`px-8 py-1 ${nav.offset ? 'mt-8' : ''}`}>
					<a
						href={nav.url}
						class={`grid grid-cols-[auto_1fr] gap-1 items-center hover:underline ${
							$page.url.pathname === nav.url ? 'active' : ''
						}`}>{@html nav.label}</a
					>
				</li>
			{/if}
		{/each}
	</ul>
	<div class="px-4 py-5">
		<Button
			on:click={async () => {
				console.log('try to logout');
				await authHandlers.logout();
				goto('/');
			}}>Logout</Button
		>
	</div>
</header>

<style lang="postcss">
	a.active {
		@apply font-bold;
	}
</style>
