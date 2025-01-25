<script lang="ts">
	import { currentPhoto } from '$lib/stores/galleryStore';
	import type { Image } from '$lib/types';
	import { addComment } from '$lib/utils';
	import AddComment from './AddComment.svelte';
	import Comments from './Comments.svelte';

	let comment: string = '';

	$: photo = $currentPhoto;

	async function handleSubmit(event: CustomEvent<string>) {
		comment = event.detail;
		if (!photo?.id) return;
		if (!comment) return;
		await addComment(photo.id, comment);
		console.log('update');
		comment = '';
	}
</script>

{#if photo}
	<div id="comment-layer" popover>
		<div class="grid grid-rows-[auto_1fr_auto] h-full">
			<div class="flex justify-between p-2 bg-megan-400">
				<h3>Comments</h3>
				<button popovertarget="comment-layer" popovertargetaction="hide">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 -960 960 960"
						class="w-6 h-6 fill-current"
						><path
							d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
						/></svg
					>
				</button>
			</div>
			<div class="overflow-auto">
				<Comments {photo} />
			</div>
			<AddComment on:add-comment={handleSubmit} {comment} />
		</div>
	</div>
{/if}

<style lang="postcss">
	:global(body:has([popover]:popover-open)) {
		overflow: hidden;
	}

	[popover] {
		@apply m-0 ml-auto h-dvh p-0 lg:w-[500px] w-full shadow-2xl shadow-black;
	}

	[popover]::backdrop {
		background-color: rgb(0 0 0 / 25%);
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
