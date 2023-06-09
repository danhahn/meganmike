<script lang="ts">
	import type { RsvpProps } from '$lib/types';

	export let rsvp: RsvpProps;
	export let size: 'small' | 'large' = 'small';
	export let row: boolean = false;
	$: isSmall = size === 'small';
	$: isLarge = size === 'large';
</script>

<div class="flex gap-2 items-center" class:row>
	{#if rsvp === null}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="fill-megan-500 justify-self-center"
			viewBox="0 -960 960 960"
			class:isLarge
			class:isSmall
			><path
				d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Zm0-60q142 0 241-99.5T820-480q0-142-99-241t-241-99q-141 0-240.5 99T140-480q0 141 99.5 240.5T480-140Zm0-340Z"
			/></svg
		>
		<p class:isLarge class:isSmall>No Response</p>
	{:else if rsvp === 'yes'}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="fill-green-600"
			viewBox="0 -960 960 960"
			class:isLarge
			class:isSmall><path d="M378-246 154-470l43-43 181 181 384-384 43 43-427 427Z" /></svg
		>
		<p class:isLarge class:isSmall>Yes 🎉</p>
	{:else}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="fill-red-600"
			viewBox="0 -960 960 960"
			class:isLarge
			class:isSmall
			><path
				d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-60q142.375 0 241.188-98.812Q820-337.625 820-480q0-60.662-21-116.831Q778-653 740-699L261-220q45 39 101.493 59.5Q418.987-140 480-140ZM221-261l478-478q-46-39-102.169-60T480-820q-142.375 0-241.188 98.812Q140-622.375 140-480q0 61.013 22 117.507Q184-306 221-261Z"
			/></svg
		>
		<p class:isLarge class:isSmall>No ☹️</p>
	{/if}
</div>

<style lang="postcss">
	.isSmall {
		@apply text-base;
	}

	.isLarge {
		@apply text-4xl;
	}

	svg.isSmall {
		@apply w-8;
	}

	svg.isLarge {
		@apply w-16;
	}

	.row {
		grid-column: 1 / -1;
	}
</style>
