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

	<div class="grid grid-rows-[auto_1fr]">
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
