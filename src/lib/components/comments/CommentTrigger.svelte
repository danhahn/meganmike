<script lang="ts">
	import type { Image } from '$lib/types';
	export let photo: Image;
</script>

<div class="z-20 col-start-1 row-start-1 flex justify-start items-end p-6 pointer-events-none">
	<div class="indicator">
		{#if photo.comments?.length}
			<span class="indicator-item badge badge-primary font-mono">{photo.comments.length}</span>
		{/if}
		<button class="btn pointer-events-auto" popovertarget={`photo-${photo.id}`}
			><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="w-6 h-6 fill-current"
				><path
					d="M240-400h480v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM880-80 720-240H160q-33 0-56.5-23.5T80-320v-480q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v720ZM160-320h594l46 45v-525H160v480Zm0 0v-480 480Z"
				/></svg
			></button
		>
	</div>
</div>
