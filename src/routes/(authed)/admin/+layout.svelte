<script lang="ts">
	import { goto } from '$app/navigation';
	import { authStore } from '$lib/stores/authStore';
	import { onMount } from 'svelte';

	onMount(() => {
		if (!$authStore.currentUser) {
			goto('/login');
		}
	});
</script>

<slot />
