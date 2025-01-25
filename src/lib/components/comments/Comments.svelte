<script lang="ts">
	import type { Image } from '$lib/types';
	import { timeSince } from '$lib/utils';

	export let photo: Image;
</script>

<div class="comments flex flex-col gap-2 bg-white p-2 overflow-auto">
	{#if photo.comments === undefined}
		<p class="text-center p-2">No comments yet</p>
	{:else}
		{#each photo.comments.reverse() as { comment, timestamp }}
			<div class="comment border-b border-base-300 p-1 flex gap-2">
				<div>
					<div class="avatar rows">
						<div class="w-12 rounded-full">
							<img
								src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
							/>
						</div>
					</div>
				</div>
				<div class="grid flex-1">
					<div class="flex justify-between">
						<p>UserName</p>
						<p class="text-sm opacity-50 text-right">
							{@html timeSince(timestamp)}
						</p>
					</div>
					<p class="font-bold">{comment}</p>
				</div>
			</div>
		{/each}
	{/if}
</div>

<style>
	.comments {
		align-self: end;
	}

	.comment:last-child {
		border-bottom: none;
	}
</style>
