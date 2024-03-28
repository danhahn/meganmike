<script>
	import GetStarted from './GetStarted.svelte';
	import InfoHeader from './InfoHeader.svelte';
	import Button from './forms/Button.svelte';

	let showGetStarted = false;
</script>

{#if showGetStarted}
	<div class="p-4"><GetStarted /></div>
{:else}
	<div class="💍 grid place-content-center">
		<div>
			<InfoHeader />
			<article
				class="max-w-96 grid gap-4 text-center p-4 border: 1px solid bg-megan-50 border border-megan-300/50 rounded-lg z-50 shadow-xl"
			>
				<h1 class="mt-8 text-xl text-megan-500">Be the first to add a memory</h1>
				<p class="text-balance">
					Share your memories with the Megan and Mike and the rest of the wedding party. Add your
					photos to the gallery and see them appear on the site instantly.
				</p>

				<p class="mb-8 text-balance">You can add as many photos as you like.</p>
				<Button on:click={() => (showGetStarted = true)}>Get Started</Button>
			</article>
		</div>
	</div>
{/if}
