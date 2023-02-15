<script lang="ts">
	import Img from '$lib/components/Img.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import { onMount } from 'svelte';

	const end = new Date('2024-08-15T12:17:30');
	let remainingTime = 0;
	let intervalId: any;

	const startTimer = () => {
		intervalId = setInterval(() => {
			remainingTime = end.getTime() - new Date().getTime();
			if (remainingTime <= 0) {
				clearInterval(intervalId);
			}
		}, 1000);
	};

	$: days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));

	onMount(startTimer);
</script>

<div class="flex flex-col gap-6">
	<div class="stack rounded-full sm:rounded-2xl overflow-hidden shadow-xl">
		<Img alt="the ring" src="IMG_3894.jpg" />
		<Logo class="sm:w-72 fill-megan-50" />
	</div>

	<div class="border-2 border-megan-900 bg-megan-400 rounded-lg m-4 p-10">
		<h2 class="m-0 text-megan-700 text-2xl">Count Down</h2>
		<p class="text-megan-100 font-serif text-5xl">
			{#if remainingTime !== 0}
				{days} days
			{:else}
				♥️♥️♥️ days
			{/if}
		</p>
	</div>
</div>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.megan.50);
	}

	.stack {
		display: grid;
	}
	.stack > :global(*) {
		grid-column: 1;
		grid-row: 1;
	}
</style>
