<script lang="ts">
	import { auth, db, firestore } from '$lib/firebase/firebase';
	import { collection, orderBy, query, where } from 'firebase/firestore';
	import { collectionStore, userStore } from 'sveltefire';
	import Comment from './Comment.svelte';
	import { addComment } from '$lib/utils';
	import { onMount, tick } from 'svelte';
	import type { Comment as CommentType } from '$lib/types';

	export let photoId: string;
	export let count: number;

	export let closeComments: () => void;

	const user = userStore(auth);

	let comment = '';

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		// get the current url
		const currentPhoto = { id: photoId };
		// get the last part of the url

		if (!$user) return;
		if (!currentPhoto.id) return;
		if (!comment) return;

		await addComment({
			photoId: currentPhoto.id,
			comment: comment,
			uid: $user.uid,
			displayName: $user?.displayName || 'anonymous',
			avatar: $user?.photoURL || ''
		});

		await tick();

		comment = '';
	}

	let c: CommentType[] = [];

	onMount(async () => {
		const postsRef = collection(db, 'comments');
		const q = query(postsRef, where('photoId', '==', photoId), orderBy('timestamp', 'desc'));
		const comments = collectionStore<CommentType>(firestore, q as any);
		comments.subscribe((data) => {
			c = data;
		});
	});
</script>

<div
	class="h-96 bg-white dark:bg-slate-900 dark:text-slate-100 fixed bottom-0 left-0 right-0 z-50 py-2 rounded-t-box grid grid-rows-[auto_1fr_auto] gap-2"
>
	<div
		class="flex justify-between items-center px-4 border-b pb-2 border-gray-200 dark:border-gray-700"
	>
		<p>Comments {c.length}</p>
		<button on:click={closeComments}>close</button>
	</div>
	<div class="overflow-y-auto flex flex-col">
		{#if c.length === 0}
			<p class="text-center">No Comments Yet</p>
		{/if}
		{#each c as comment}
			<Comment
				comment={comment.comment}
				timestamp={comment.timestamp}
				displayName={comment.displayName}
				avatar={comment.avatar}
				userId={comment.userId}
				uid={$user?.uid}
			/>
		{/each}
	</div>
	<form on:submit|preventDefault={handleSubmit} class="flex justify-stretch items-center px-2">
		<label
			class="input input-md rounded-r-none outline-none input-bordered flex items-center gap-2 w-full dark:bg-slate-800"
		>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="w-6 h-6 fill-current"
				><path
					d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z"
				/></svg
			>
			<input
				type="text"
				class="grow text-[16px]"
				placeholder="Add A Comment"
				bind:value={comment}
			/>
		</label>
		<button
			class="btn btn-primary btn-md bg-megan-500 dark:bg-megan-800 border-megan-700 dark:border-megan-950 text-white rounded-l-none"
			type="submit"
		>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="w-6 h-6 fill-current"
				><path
					d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z"
				/></svg
			>
		</button>
	</form>
</div>
