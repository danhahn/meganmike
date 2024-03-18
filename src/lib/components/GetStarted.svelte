<script lang="ts">
	export let close: () => void = () => {};
	export let showCloseButton: boolean = false;
</script>

<div
	class="mt-4 p-4 borderborder: 1px solid bg-megan-50/50 border border-megan-300/50 rounded-lg z-50 shadow-xl bg-megan-50 mb-7 max-w-96 mx-auto relative"
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
	<h3 class="font-bold text-megan-700 text-3xl">Get started</h3>

	<hr class="my-5" />
	<ol class="list-decimal text-left ml-4">
		<li>
			Just click the
			<div
				class="inline-grid align-middle add-btn bg-megan-600 w-7 aspect-square place-content-center rounded-full"
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="w-4 h-4 fill-white"
					><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" /></svg
				>
			</div>
			button to add your photos at the bottom of the page.
		</li>
		<li>
			You will need to enter your name and press "Next"

			<img src="https://ik.imagekit.io/hahnster/set-name.png?tr=w-100,h-100,c-at_least" alt="" />

			<ul class="list-disc ml-4">
				<li>
					If you are on a mobile phone you might need to press the <div
						class="inline-grid align-middle add-btn bg-megan-600 w-7 aspect-square place-content-center rounded-full"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 -960 960 960"
							class="w-4 h-4 fill-white"
							><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" /></svg
						>
					</div>
					again
				</li>
				<li>
					<img
						src="https://ik.imagekit.io/hahnster/ios-choose.png?tr=w-50,h-50,c-at_least"
						alt=""
					/>
				</li>
			</ul>
		</li>

		<li>Then you can select your photos</li>
		<li>
			Click the upload button
			<ul class="list-disc ml-4">
				<li>Note: if you are on iOS you will need to click the "add" button at the top right</li>
				<li>
					<img src="https://ik.imagekit.io/hahnster/ios-add.png?tr=w-150,h-150,c-at_least" alt="" />
				</li>
			</ul>
		</li>
	</ol>
</div>

<style lang="postcss">
	.add-btn {
		box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.5);
	}
</style>
