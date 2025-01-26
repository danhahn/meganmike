<script lang="ts">
	import { timeSince } from '$lib/utils';
	import type { Timestamp } from 'firebase/firestore';

	export let comment: string;
	export let timestamp: Timestamp;
	import { onMount } from 'svelte';

	let timeDisplay = timeSince(timestamp);

	onMount(() => {
		const interval = setInterval(() => {
			timeDisplay = timeSince(timestamp);
		}, 30000);

		return () => clearInterval(interval);
	});
</script>

<div class="comment border-b border-base-300 p-1 flex gap-2">
	<div>
		<div class="avatar rows">
			<div class="w-12 rounded-full">
				<img
					src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
					alt=""
				/>
			</div>
		</div>
	</div>
	<div class="grid flex-1">
		<div class="flex justify-between">
			<p>UserName</p>
			<p class="text-sm opacity-50 text-right">
				{@html timeDisplay}
			</p>
		</div>
		<p class="font-bold">{comment}</p>
	</div>
</div>
