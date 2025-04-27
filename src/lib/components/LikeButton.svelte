<script lang="ts">
	import { userLikes } from '$lib/stores/user';
	import { userStore } from 'sveltefire';
	import TriggerContainer from './TriggerContainer.svelte';
	import { auth } from '$lib/firebase/firebase';
	export let toggleLike: (id: string) => void;
	export let id: string;
	export let likes: number;
	export let size: 'sm' | 'lg' = 'lg';
	export let isBottomNav: boolean = false;
	export let isJoined: boolean = false;

	const user = userStore(auth);

	$: svgSize = size === 'sm' ? 'w-4 h-4' : 'w-6 h-6';
</script>

{#if $user?.uid}
	<TriggerContainer
		{size}
		{isBottomNav}
		itemsCount={likes}
		on:click={() => toggleLike(id)}
		{isJoined}
	>
		{#if $userLikes.includes(id)}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 -960 960 960"
				class={`${svgSize} fill-megan-500`}
				><path
					d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z"
				/></svg
			>
		{:else}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 -960 960 960"
				class={`${svgSize} fill-current`}
				><path
					d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"
				/></svg
			>
		{/if}
	</TriggerContainer>
{/if}
