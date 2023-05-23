<script lang="ts">
	import Header from '$lib/components/admin/Header.svelte';
	import { auth } from '$lib/firebase/firebase.client';
	import { authStore } from '$lib/stores/authStore';

	import { onMount } from 'svelte';

	$: className = $authStore.currentUser ? 'grid-cols-[200px_1fr]' : '';

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
			console.log(user);
			authStore.update((curr) => ({
				...curr,
				isLoading: false,
				currentUser: user
			}));
		});
		startTimer();
	});
</script>

<section class="grid min-h-full" class:multiColumn>
	{#if $authStore.currentUser}
		<Header />
	{/if}

	<div class="grid grid-rows-[auto_1fr]">
		<div class="px-4 py-2 bg-megan-900 text-megan-100 flex justify-between">
			<p><span>Welcome back</span> Admin</p>
			<p>{days} Days <span>until the wedding</span></p>
		</div>
		<div class="p-4 sm:p-12 grid grid-rows-[auto_1fr] items-center lg:block">
			<slot />
		</div>
	</div>
</section>

<style lang="postcss">
	span {
		@apply hidden sm:inline-block;
	}

	section:not(.multiColumn) {
		@apply grid-cols-1;
	}

	section.multiColumn {
		@apply grid-cols-[250px_1fr];
	}
</style>
