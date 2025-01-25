<script lang="ts">
	import type { Image, Comment as CommentType } from '$lib/types';
	import Comment from './Comment.svelte';

	export let photo: Image;

	$: commentsList = photo.comments?.length
		? photo.comments.sort(
				(a: CommentType, b: CommentType) => Number(b.timestamp) - Number(a.timestamp)
			)
		: [];
</script>

<div class="comments flex flex-col gap-2 bg-white p-2 overflow-auto">
	{#if photo.comments === undefined}
		<p class="text-center p-2">No comments yet</p>
	{:else}
		{#each commentsList as { comment, timestamp } (timestamp)}
			<Comment {comment} {timestamp} />
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
