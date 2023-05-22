<script lang="ts">
	import Header from '$lib/components/admin/Header.svelte';
	import { auth } from '$lib/firebase/firebase.client';
	import { authStore } from '$lib/stores/authStore';

	import { onMount } from 'svelte';

	$: className = $authStore.currentUser ? 'grid grid-cols-[200px_1fr]' : '';

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

<div class={` min-h-full ${className}`}>
	{#if !!className}
		<Header />
	{/if}

	<div>
		<div class="px-4 py-2 bg-megan-900 text-megan-100 flex justify-between">
			<p>Welcome back Admin</p>
			<p>{days} Days until the wedding</p>
		</div>
		<div class="p-4 sm:p-12">
			<slot />
		</div>
	</div>
</div>
