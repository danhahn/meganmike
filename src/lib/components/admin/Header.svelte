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
			
			<span class="text-megan-900">Back to Site</span>`,
			url: '/',
			offset: true
		}
	];
</script>

<header class="absolute z-50 inset-0 right-12 sm:fixed bg-megan-300 grid grid-rows-[auto_1fr_auto]">
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
	header {
		@apply -translate-x-full;
	}
	a.active {
		@apply font-bold;
	}
</style>
