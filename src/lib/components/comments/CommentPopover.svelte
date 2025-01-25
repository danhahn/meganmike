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
	<div class="grid grid-rows-[auto_1fr_auto] h-full">
		<div class="flex justify-between p-2 bg-megan-400">
			<h3>Comments</h3>
			<button popovertarget={`photo-${photo.id}`} popovertargetaction="hide">close</button>
		</div>
		<div class="overflow-auto">
			<Comments {photo} />
		</div>
		<AddComment on:add-comment={handleSubmit} {comment} />
	</div>
</div>

<style lang="postcss">
	:global(body:has([popover]:popover-open)) {
		overflow: hidden;
	}

	[popover] {
		@apply m-0 ml-auto h-screen p-0 lg:w-[500px] w-full;
	}

	[popover]::backdrop {
		background-color: rgb(0 0 0 / 50%);
	}

	/*   IS-OPEN STATE   */
	[popover]:popover-open {
		translate: 0 0;
	}

	/*   EXIT STATE   */
	[popover] {
		transition:
			translate 0.2s ease-out,
			display 0.2s ease-out allow-discrete,
			overlay 0.2s ease-out allow-discrete;
		translate: 100% 0;
	}

	/*   0. BEFORE-OPEN STATE   */
	@starting-style {
		[popover]:popover-open {
			translate: 100% 0;
		}
	}
</style>
