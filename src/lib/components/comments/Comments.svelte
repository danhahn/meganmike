<script lang="ts">
	import type { Image, Comment as CommentType } from '$lib/types';
	import Comment from './Comment.svelte';
	import { collectionStore } from 'sveltefire';
	import { collection, where, query, orderBy } from 'firebase/firestore';
	import { db, firestore } from '$lib/firebase/firebase';

	export let photo: Image;

	const postsRef = collection(db, 'comments');
	const q = query(postsRef, where('photoId', '==', photo.id), orderBy('timestamp', 'asc'));

	const comments = collectionStore<CommentType>(firestore, q as any);
</script>

<div class="comments flex flex-col gap-2 bg-white p-2 overflow-auto">
	{#if photo.comments === undefined}
		<p class="text-center p-2">No comments yet</p>
	{:else}
		{#each $comments as { comment, timestamp, displayName, avatar } (timestamp)}
			<Comment {comment} {timestamp} {displayName} {avatar} />
		{/each}
	{/if}
</div>

<style>
	.comments {
		align-self: end;
	}

	:global(.comment:last-child) {
		border-bottom: none;
	}
</style>
