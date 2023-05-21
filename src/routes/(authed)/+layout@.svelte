<script>
	import Section from '$lib/components/Section.svelte';
	import Header from '$lib/components/admin/Header.svelte';
	import { auth } from '$lib/firebase/firebase.client';
	import { authStore } from '$lib/stores/authStore';

	import { onMount } from 'svelte';

	$: className = $authStore.currentUser ? 'grid grid-cols-[200px_1fr]' : '';

	onMount(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			console.log(user);
			authStore.update((curr) => ({
				...curr,
				isLoading: false,
				currentUser: user
			}));
		});
	});
</script>

<div class={` min-h-full ${className}`}>
	{#if !!className}
		<Header />
	{/if}

	<Section>
		<slot />
	</Section>
</div>
