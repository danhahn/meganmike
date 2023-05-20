<script lang="ts">
	import { page } from '$app/stores';
	import Logo from '../Logo.svelte';
	import Button from '../forms/Button.svelte';

	type NavData = {
		label: string;
		url: string;
		disabled?: boolean;
	};

	const navData: NavData[] = [
		{ label: 'View All Guest', url: '/admin' },
		{ label: 'Add Guest', url: '/admin/add-guest' },
		{ label: 'Update Guest', url: '/admin/update-guest' }
	];
</script>

<header class="bg-megan-300">
	<div class="px-4 py-5">
		<Logo size="small" />
	</div>
	<ul class="flex flex-col">
		{#each navData as nav}
			{#if !nav.disabled}
				<li class="px-8 py-1">
					<a
						href={nav.url}
						class={`hover:underline ${$page.url.pathname === nav.url ? 'active' : ''}`}
						>{nav.label}</a
					>
				</li>
			{/if}
		{/each}
	</ul>
	<div class="px-4 py-5">
		<form method="POST" action="/logout">
			<Button>Logout</Button>
		</form>
	</div>
</header>

<style lang="postcss">
	a.active {
		@apply font-bold;
	}
</style>
