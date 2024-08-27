<script lang="ts">
	import Background from '$lib/components/Background.svelte';
	import Headline from '$lib/components/Headline.svelte';
	import Img from '$lib/components/Img.svelte';
	import Navigation from '$lib/components/Navigation.svelte';
	import Section from '$lib/components/Section.svelte';
	import Stack from '$lib/components/Stack.svelte';
	import { onMount } from 'svelte';

	const end = new Date('2024-08-15T17:30:00');
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
	// calculate the remaining hours
	$: hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	// calculate the remaining minutes
	$: minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
	// calculate the remaining seconds
	$: seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

	onMount(startTimer);
</script>

<Background>
	<Navigation class="shadow-lg shadow-black/20 fixed lg:static right-0 left-0 z-10" />

	<div class="flex flex-col gap-6 mt-11">
		<div
			class="bg-white max-w-3xl mx-auto lg:mt-16 overflow-hidden lg:rounded-2xl shadow-lg shadow-megan-300/30 lg:p-4"
		>
			<Stack class="overflow-hidden shadow-xl lg:rounded-xl">
				<Img alt="" src="wedding-3.jpg" size="square" />
			</Stack>
		</div>
		<Section>
			<Headline>Congratulation</Headline>
			<p>Congratulation Megan and Mike. We all wish you all the happiness in the world</p>
		</Section>
	</div>
</Background>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.megan.50);
	}

	ul {
		@apply text-center grid grid-rows-1 gap-2 lg:gap-4 text-xl;
	}

	li span {
		@apply text-megan-500 block text-2xl lg:text-3xl mb-1 lg:mb-4;
	}
</style>
