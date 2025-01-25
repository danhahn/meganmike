<script lang="ts">
	import type { Image } from '$lib/types';
	export let photo: Image;
	export let size: 'sm' | 'lg' = 'lg';

	$: svgSize = size === 'sm' ? 'w-4 h-4' : 'w-6 h-6';
	$: buttonType = size === 'sm' ? 'btn-ghost' : '';
</script>

<div class="comment-trigger">
	<div class="indicator">
		{#if photo.comments?.length}
			<span class="indicator-item badge badge-primary font-mono" class:scale-50={size === 'sm'}
				><span class:hidden={size === 'sm'}>{photo.comments.length}</span></span
			>
		{/if}
		<button class={`btn btn-${size} ${buttonType}`} popovertarget={`comment-layer`}
			><svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 -960 960 960"
				class={`${svgSize} fill-current`}
				><path
					d="M240-400h480v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM880-80 720-240H160q-33 0-56.5-23.5T80-320v-480q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v720ZM160-320h594l46 45v-525H160v480Zm0 0v-480 480Z"
				/></svg
			></button
		>
	</div>
</div>
