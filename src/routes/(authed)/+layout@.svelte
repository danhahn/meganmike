<script lang="ts">
	import Header from '$lib/components/admin/Header.svelte';
	import { auth } from '$lib/firebase/firebase.client';
	import { authStore } from '$lib/stores/authStore';
	import { adminNav } from '$lib/stores/navigation';

	import { onMount } from 'svelte';

	$: notLoggedIn = !$authStore.currentUser;

	$: multiColumn = !!$authStore.currentUser;

	const end = new Date('2024-08-15T12:17:30');
	let remainingTime = 0;
	let intervalId: any;

	const startTimer = () => {
		intervalId = setInterval(() => {
			remainingTime = end.getTime() - new Date().getTime();
			if (remainingTime <= 0) {
				clearInterval(intervalId);
			}
		}, 1000);
	};

	$: days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));

	onMount(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			authStore.update((curr) => ({
				...curr,
				isLoading: false,
				currentUser: user
			}));
		});
		startTimer();
	});

	const handleAdminNavigation = () => {
		adminNav.set(true);
	};
</script>

<section class="grid min-h-full" class:multiColumn>
	{#if $authStore.currentUser}
		<Header />
	{/if}

	<div class="main grid grid-rows-[auto_1fr]">
		<div
			class="px-4 py-2 bg-megan-900 text-megan-100 grid grid-cols-[auto_auto_1fr] lg:grid-cols-[auto_1fr] gap-4 items-center"
		>
			{#if $authStore.currentUser}
				<button class="lg:hidden" on:click={handleAdminNavigation}>
					<svg xmlns="http://www.w3.org/2000/svg" class="w-8 fill-megan-50" viewBox="0 -960 960 960"
						><path d="M120-240v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z" /></svg
					>
				</button>
			{/if}
			{#if multiColumn}
				<p><span>Welcome Back</span> Admin</p>
			{:else}
				<div />
			{/if}
			<p class="justify-self-end">{days} Days <span>until the wedding</span></p>
		</div>
		<div class="p-4 sm:p-12 grid grid-rows-[auto_1fr] items-center lg:block" class:notLoggedIn>
			<slot />
		</div>
	</div>
</section>

<style lang="postcss">
	section {
		--s: 50px; /* control the size */
		--c1: hsl(48 27% 85% / 1);
		--c2: hsl(49 14% 52% / 1);

		--_g: #0000, #0004 5%, var(--c2) 6% 14%, var(--c1) 16% 24%, var(--c2) 26% 34%, var(--c1) 36% 44%,
			var(--c2) 46% 54%, var(--c1) 56% 64%, var(--c2) 66% 74%, var(--c1) 76% 84%, var(--c2) 86% 94%,
			#0004 95%, #0000;
		background: radial-gradient(100% 50% at 100% 0, var(--_g)),
			radial-gradient(100% 50% at 0 50%, var(--_g)),
			radial-gradient(100% 50% at 100% 100%, var(--_g));
		background-size: var(--s) calc(2 * var(--s));
	}

	.main {
		@apply bg-white/80;
	}

	.notLoggedIn {
		@apply lg:mt-24;
	}
	span {
		@apply hidden sm:inline-block;
	}

	section:not(.multiColumn) {
		@apply grid-cols-1;
	}

	section.multiColumn {
		@apply lg:grid-cols-[250px_1fr];
	}
</style>
