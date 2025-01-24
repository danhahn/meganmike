<script lang="ts">
	import type { Image } from '$lib/types';

	export let photo: Image;
</script>

<div class="comments flex flex-col gap-2 bg-white p-2">
	{#if photo.comments === undefined}
		<p class="text-center p-2">No comments yet</p>
	{:else}
		{#each photo.comments.reverse() as { comment, timestamp }}
			<div class="border-b border-base-300 p-1">
				<p class="font-bold">{comment}</p>
				<p class="text-sm opacity-50 text-right">
					{new Date(timestamp.seconds * 1000).toLocaleString('en-US', {
						month: '2-digit',
						day: '2-digit',
						year: 'numeric',
						hour: '2-digit',
						minute: '2-digit'
					})}
				</p>
			</div>
		{/each}
	{/if}
</div>
