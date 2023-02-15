<script lang="ts">
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
			<li><a href="/">Home</a></li>
			<li><a href="/about">About Us</a></li>
			<li><a href="/wedding-details">Wedding Details</a></li>
			<!-- <li><a href="/accommodations">Accommodations</a></li> -->
			<!-- <li><a href="/rsvp">RSVP</a></li> -->
			<!-- <li><a href="/gift-registry">Gift Registry</a></li> -->
			<li><a href="/gallery">Gallery</a></li>
			<li><a href="/contact">Contact Us</a></li>
			<!-- <li><a href="/faq">FAQs</a></li> -->
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
				<li><A href="/">Home</A></li>
				<li><A href="/about">About Us</A></li>
				<li><A href="/wedding-details">Wedding Details</A></li>
				<!-- <li><a href="/accommodations">Accommodations</a></li> -->
				<!-- <li><a href="/rsvp">RSVP</a></li> -->
				<!-- <li><a href="/gift-registry">Gift Registry</a></li> -->
				<li><A href="/gallery">Gallery</A></li>
				<li><A href="/contact">Contact Us</A></li>
				<!-- <li><a href="/faq">FAQs</a></li> -->
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
		@apply font-link block p-2 text-megan-100 uppercase;
	}
</style>
