<script lang="ts">
	import Button from './forms/Button.svelte';

	export let close: () => void = () => {};
	export let showCloseButton: boolean = false;
	export let isInline: boolean = false;
</script>

<div
	class={`get-started mt-4 p-4 bg-megan-50 border border-megan-300/50 rounded-lg z-50 shadow-xl mb-7 max-w-96 lg:w-1/3 lg:max-w-none mx-auto relative ${
		showCloseButton ? 'lg:w-2/3' : ''
	} ${isInline ? 'lg:w-full lg:mt-0 print:mt-0' : ''}`}
>
	{#if showCloseButton}
		<button on:click={close} class="absolute top-4 right-4">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 -960 960 960"
				class="w-6 h-6 fill-megan-700"
				><path
					d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
				/></svg
			>
		</button>
	{/if}
	<h3 class="font-bold text-megan-700 text-3xl">Help Downloading</h3>

	<hr class="my-5" />
	<ol class="list-decimal text-left ml-4 grid gap-2">
		<li>
			<strong>Click Download Button</strong>: To download an image on your iPhone, tap on the
			download button. This will open a new tab.
		</li>
		<li>
			<strong>Hold and Tap</strong>: After clicking the download button, press and hold your finger
			on the image. After a moment, a menu will appear on the screen.
			<img
				class="rounded-xl shadow-lg"
				src="https://ik.imagekit.io/hahnster/ios-download.png?updatedAt=1711742672508&tr=w-100,h-100,c-at_least"
				alt=""
			/>
		</li>
		<li>
			<strong>Download Image</strong>: In the menu that appears, tap on "Save Image" or "Save Photo"
			(depending on your browser). This will download the image to your iPhone's Photos app.
		</li>
		<li>
			<strong>Access the Image</strong>: Exit the web browser and open the "Photos" app on your View
			the Image
		</li>
		<li>
			<strong>View the Image</strong>: In the Photos app, navigate to the "Recent" or "Downloads"
			album. The downloaded image should appear there. Tap on the image to view it.
		</li>
	</ol>
</div>

<style lang="postcss">
	.add-btn {
		box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.5);
	}
</style>
