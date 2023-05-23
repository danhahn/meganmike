<script lang="ts">
	import { goto } from '$app/navigation';
	import { authStore } from '$lib/stores/authStore';
	import { onMount } from 'svelte';
	import Section from '$lib/components/Section.svelte';

	onMount(() => {
		if ($authStore.currentUser) {
			goto('/admin');
		}
	});
</script>

<slot />
