<script lang="ts">
	import type { Image } from '$lib/types';
	import { addComment } from '$lib/utils';
	import AddComment from './AddComment.svelte';
	import Comments from './Comments.svelte';
	export let photo: Image;
	export let currentPhotoId: string | undefined;

	let comment: string = '🍑';

	async function handleSubmit(event: CustomEvent<string>) {
		comment = event.detail;
		if (!currentPhotoId) return;
		if (!comment) return;
		await addComment(currentPhotoId, comment);
		console.log('update');
		comment = '';
	}
</script>

<div id={`photo-${photo.id}`} popover>
	<div class="h-1/2"></div>
	<div class="flex flex-col">
		<div class="flex justify-between p-2 bg-megan-400">
			<h3>Comments</h3>
			<button popovertarget={`photo-${photo.id}`} popovertargetaction="hide">close</button>
		</div>
		<Comments {photo} />
	</div>
	<AddComment on:add-comment={handleSubmit} {comment} />
</div>

<style>
	:global(body:has([popover]:popover-open)) {
		overflow: hidden;
	}

	[popover] {
		background: transparent;
		width: 100vw;
		min-height: calc(100vh - 64px);
		height: clamp(10rem, 50vh, 80vh);

		position: relative;
		margin: 0;
		margin-top: 77px;
		padding: 0;
	}

	:global([popover] .add-comment) {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
	}

	[popover]::backdrop {
		background-color: rgb(0 0 0 / 50%);
	}
</style>
