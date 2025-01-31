<script lang="ts">
	import { timeSince } from '$lib/utils';
	import type { Timestamp } from 'firebase/firestore';
	import type { Comment as CommentType } from '$lib/types';
	import type { User } from 'firebase/auth';

	export let comment: CommentType['comment'];
	export let timestamp: Timestamp;
	export let displayName: CommentType['displayName'];
	export let avatar: CommentType['avatar'];
	export let uid: User['uid'] = '';
	export let userId: CommentType['userId'] = '';
	import { onMount } from 'svelte';

	let timeDisplay = timeSince(timestamp);

	onMount(() => {
		const interval = setInterval(() => {
			timeDisplay = timeSince(timestamp);
		}, 30000);

		return () => clearInterval(interval);
	});
</script>

<div class="comment border-b border-base-300 p-1 flex gap-4 px-4">
	<div>
		<div class="avatar rows">
			<div class="w-8 rounded-full mt-2">
				{#if avatar}
					<img src={avatar} alt={displayName || ''} />
				{:else}
					<img
						src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
						alt=""
					/>
				{/if}
			</div>
		</div>
	</div>
	<div class="grid flex-1">
		<div class="flex gap-2 items-center">
			<p class="font-semibold">{displayName}</p>
			<p class="text-xs opacity-50 text-right">
				{@html timeDisplay}
			</p>
		</div>
		<p>{comment}</p>
	</div>
	<div class="pt-2 flex gap-2">
		<p>100</p>
		<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 fill-current" viewBox="0 -960 960 960"
			><path
				d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"
			/></svg
		>
	</div>
</div>
