<script lang="ts">
	import { user } from '$lib/firebase';
	import Login from './Login.svelte';
	import Navigation from './Navigation.svelte';
</script>

{#if $user}
	<slot />
{:else}
	<Login />
{/if}
