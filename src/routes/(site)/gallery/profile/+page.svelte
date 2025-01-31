<script lang="ts">
	import Avatar from '$lib/components/Avatar.svelte';
	import Button from '$lib/components/forms/Button.svelte';
	import Headline from '$lib/components/Headline.svelte';
	import Section from '$lib/components/Section.svelte';
	import { auth } from '$lib/firebase/firebase';
	import { signOut } from 'firebase/auth';
	import { userStore } from 'sveltefire';

	const user = userStore(auth);

	function goBack() {
		window.history.back();
	}
</script>

{#if $user}
	<Headline>Profile</Headline>
	<Section>
		<div class="flex flex-col gap-4 h-[calc(100dvh-20rem)]">
			<!-- back to gallery -->
			<Button variant="naked" on:click={goBack}>Back to Gallery</Button>
			<div class="flex-1 self-center text-center">
				<Avatar size="large" />
				<p>{$user.displayName}</p>
				<!-- email address -->
				<p>{$user.email}</p>
			</div>
			<!-- sign out button -->
			<Button on:click={() => signOut(auth)}>Sign Out</Button>
		</div>
	</Section>
{:else}
	<p>Please log in to see your profile.</p>
{/if}
