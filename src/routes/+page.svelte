<script lang="ts">
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
	$: hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	$: minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
	$: seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

	onMount(startTimer);
</script>

<div class="flex flex-col gap-6">
	<div class="stack">
		<h1 class="text-8xl text-white/90">
			<span>M</span>
			<span>&</span>
			<span>M</span>
		</h1>
		<h1 class="text-8xl text-pink-400" style="translate: -2px -2px;">
			<span>M</span>
			<span>&</span>
			<span>M</span>
		</h1>
	</div>

	<h2 class="text-4xl text-white">Megan and Mike</h2>

	<p class="text-white font-serif">
		{#if remainingTime !== 0}
			{days} day
		{/if}
	</p>
</div>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.800);
	}

	.stack {
		display: grid;
	}

	.stack > * {
		grid-column: 1;
		grid-row: 1;
	}

	h1 {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	span {
		display: block;
	}

	span:nth-of-type(1) {
		translate: -50px 0;
	}
	span:nth-of-type(2) {
		font-size: 0.5em;
		margin: -0.5em 0;
	}
	span:nth-of-type(3) {
		translate: 50px 0;
	}
</style>
