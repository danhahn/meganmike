<script lang="ts">
	import { page } from '$app/stores';
	import { nav } from '$lib/stores/navigation';
	import A from './Link.svelte';
	import Logo from './Logo.svelte';
	import Stack from './Stack.svelte';

	const toggleSideBar = () => {
		nav.set(!$nav);
	};

	$: hidden = !$nav ? 'hidden' : '';
	$: showNav = $nav ? '--tw-translate-x: 0;' : '--tw-translate-x: -100%;';

	const checkResize = () => window.innerWidth >= 1024 && nav.set(false);

	type NavData = {
		label: string;
		url: string;
		disabled?: boolean;
	};

	const navData: NavData[] = [
		{ label: 'home', url: '/' },
		{ url: '/about', label: 'About Us' },
		{ url: '/wedding-details', label: 'Wedding Details' },
		{ url: '/accommodations', label: 'Accommodations', disabled: true },
		{ url: '/rsvp', label: 'RSVP', disabled: true },
		{ url: '/gift-registry', label: 'Gift Registry', disabled: true },
		{ url: '/gallery', label: 'Gallery' },
		{ url: '/contact', label: 'Contact Us' },
		{ url: '/faq', label: 'FAQs', disabled: true }
	];
</script>

<svelte:window on:resize={checkResize} />

<nav
	class="p-1 lg:p-2 grid grid-cols-mobile lg:grid-cols-desktop justify-between items-center bg-white"
>
	<div class="lg:hidden">
		<a href="/">
			<Logo size="small" />
		</a>
	</div>
	<div class="justify-self-end lg:hidden">
		{#if !$nav}
			<button class="navbar-burger flex items-center text-megan-100 p-3" on:click={toggleSideBar}>
				<svg
					class="block h-4 w-4 fill-current"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<title>Mobile menu</title>
					<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
				</svg>
			</button>
		{/if}
	</div>
	<div class="hidden lg:grid lg:gap-2">
		<Stack class="items-center justify-center">
			<img src="/butterfly.svg" alt="butterfly" class="opacity-50 z-10 -rotate-12 translate-x-10" />
			<img
				src="/butterfly.svg"
				alt="butterfly"
				class="opacity-50 z-10 rotate-12 translate-x-20 scale-50"
			/>
			<div class="text-megan-100 text-center font-display text-5xl tracking-tighter z-20">
				Megan & Mike
			</div>
		</Stack>
		<ul>
			{#each navData as nav}
				{#if !nav.disabled}
					<li>
						<a href={nav.url} class={`${$page.url.pathname === nav.url ? 'active' : ''}`}
							>{nav.label}</a
						>
					</li>
				{/if}
			{/each}
		</ul>
	</div>
</nav>
<div class="navbar-menu relative z-50 hidden" class:hidden>
	<div class="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25" />
	<aside
		style={showNav}
		class={`-translate-x-full transition-transform fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto`}
	>
		<div class="flex items-center mb-8">
			<div class="mr-auto text-3xl font-bold leading-none">
				<Logo size="small" class="text-megan-700" />
			</div>
			<button class="navbar-close" on:click={toggleSideBar}>
				<svg
					class="h-6 w-6 text-megan-600 cursor-pointer hover:text-megan-800"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>
		</div>
		<div>
			<ul class="grid gap-1">
				{#each navData as nav}
					{#if !nav.disabled}
						<li><a href={nav.url}>{nav.label}</a></li>
					{/if}
				{/each}
			</ul>
		</div>
		<div class="mt-auto">
			<p class="my-4 text-xs text-center text-megan-700">
				<span>Copyright © 2023</span>
			</p>
		</div>
	</aside>
</div>

<style lang="postcss">
	nav {
		@apply bg-megan-800 border-b border-b-megan-900;
	}
	ul {
		@apply lg:flex gap-4 lg:justify-center;
	}
	a {
		@apply font-link block p-2 text-megan-100 uppercase relative;
	}

	a::after {
		content: '';
		@apply border-b-2 border-transparent absolute inset-1 transition-all ease-in-out;
		top: 0;
	}

	a:hover::after {
		@apply border-megan-400;
	}

	a.active::after {
		@apply border-slate-900;
	}
</style>
