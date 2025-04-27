<script lang="ts">
	import { auth } from '$lib/firebase/firebase';
	import { userStore } from 'sveltefire';

	export let size: 'small' | 'medium' | 'large' = 'medium';

	$: avatarSize = {
		small: 'w-6 h-6',
		medium: 'w-9 h-9',
		large: 'w-24 h-24'
	}[size];

	$: fontSize = {
		small: 'text-xs',
		medium: 'text-sm',
		large: 'text-3xl'
	}[size];

	const user = userStore(auth);

	function createAvatar() {
		// if the user has a display name, return the first letter of the first and last name
		if ($user?.displayName) {
			const [firstName, lastName] = $user.displayName.split(' ');
			return `${firstName.charAt(0)}${lastName.charAt(0)}`;
		}
	}
</script>

{#if $user}
	<div class="avatar">
		<div class={`rounded-full bg-megan-50 border border-megan-500 ${avatarSize}`}>
			{#if $user.photoURL}
				<img src={$user.photoURL} alt={$user.displayName} />
			{:else if $user.displayName}
				<p class={`text-megan-700 text-center grid place-content-center h-full ${fontSize}`}>
					{createAvatar()}
				</p>
			{:else}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 -960 960 960"
					class="w-6 h-6 fill-current"
					><path
						d="m384-334 96-74 96 74-36-122 90-64H518l-38-124-38 124H330l90 64-36 122ZM233-120l93-304L80-600h304l96-320 96 320h304L634-424l93 304-247-188-247 188Zm247-369Z"
					/></svg
				>
			{/if}
		</div>
	</div>
{/if}
