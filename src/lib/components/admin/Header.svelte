<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { authHandlers } from '$lib/stores/authStore';
	import { adminNav } from '$lib/stores/navigation';
	import Logo from '../Logo.svelte';
	import Button from '../forms/Button.svelte';

	type NavData = {
		label: string;
		url: string;
		disabled?: boolean;
		offset?: boolean;
		type: 'button' | 'link';
	};

	const navData: NavData[] = [
		{
			label: `
			<svg xmlns="http://www.w3.org/2000/svg" class="w-6 fill-current"  viewBox="0 -960 960 960" ><path d="M450-200v-250H200v-60h250v-250h60v250h250v60H510v250h-60Z"/></svg>
			Add Guest`,
			url: '/admin/add-guest',
			type: 'button'
		},
		{ label: 'View All Guest', url: '/admin', type: 'link' },
		{ label: 'Organize Tables', url: '/admin/tables', type: 'link' },
		{ label: 'Print QR Codes', url: '/admin/print-qr', type: 'link' },
		{ label: 'Add Photo Gallery', url: '/admin/add-photo-gallery', type: 'link' },
		{
			label: `
			<svg xmlns="http://www.w3.org/2000/svg" class="w-6 fill-megan-900" viewBox="0 96 960 960"><path d="M655 976 255 576l400-400 56 57-343 343 343 343-56 57Z"/></svg>
			<span class="text-megan-900">Back to Site</span>`,
			url: '/',
			offset: true,
			type: 'link'
		}
	];

	$: isOpen = $adminNav;

	const closeNav = () => {
		adminNav.set(false);
	};
</script>

<header
	class:isOpen
	class="absolute lg:static z-50 inset-0 lg:inset-auto right-12 sm:fixed bg-megan-300 grid grid-rows-[auto_1fr_auto]"
>
	<div class="px-4 py-5 flex justify-between items-start">
		<Logo size="small" />
		<button class="lg:hidden" on:click={closeNav}>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="w-8"
				><path
					d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"
				/></svg
			>
		</button>
	</div>
	<ul class="flex flex-col">
		{#each navData as nav}
			{#if !nav.disabled}
				<li class={`px-8 py-1 ${nav.offset ? 'mt-8' : ''}`}>
					{#if nav.type === 'link'}
						<a
							href={nav.url}
							on:click={() => adminNav.set(false)}
							class={`grid grid-cols-[auto_1fr] gap-1 items-center hover:underline ${
								$page.url.pathname === nav.url ? 'active' : ''
							}`}>{@html nav.label}</a
						>
					{:else if nav.type === 'button'}
						<Button
							width="full"
							on:click={() => adminNav.set(false)}
							class="flex gap-2 px-2"
							on:click={() => goto(nav.url)}>{@html nav.label}</Button
						>
					{/if}
				</li>
			{/if}
		{/each}
	</ul>
	<div class="px-4 py-5">
		<Button
			width="full"
			on:click={async () => {
				await authHandlers.logout();
				goto('/');
			}}
		>
			<svg xmlns="http://www.w3.org/2000/svg" class="w-6 fill-current" viewBox="0 -960 960 960"
				><path
					d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h291v60H180v600h291v60H180Zm486-185-43-43 102-102H375v-60h348L621-612l43-43 176 176-174 174Z"
				/></svg
			>
			Logout</Button
		>
	</div>
</header>

<style lang="postcss">
	header {
		@apply -translate-x-full transition-transform ease-in-out lg:translate-x-0 lg:transition-none;
	}

	header.isOpen {
		@apply translate-x-0;
	}

	a.active {
		@apply font-bold;
	}
</style>
