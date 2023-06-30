<script lang="ts">
	import Background from '$lib/components/Background.svelte';
	import Headline from '$lib/components/Headline.svelte';
	import Img from '$lib/components/Img.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import Navigation from '$lib/components/Navigation.svelte';
	import Section from '$lib/components/Section.svelte';
	import Stack from '$lib/components/Stack.svelte';
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

<Background>
	<Navigation class="shadow-lg shadow-black/20 fixed lg:static right-0 left-0 z-10" />

	<div class="flex flex-col gap-6 mt-11">
		<div
			class="bg-white max-w-3xl mx-auto lg:mt-16 overflow-hidden lg:rounded-2xl shadow-2xl shadow-megan-800 lg:p-4"
		>
			<Stack class="overflow-hidden shadow-xl lg:rounded-xl">
				<Img alt="" src="engagment/love.jpg" size="square" />
			</Stack>
		</div>

		<Section>
			<Headline>Event Details</Headline>

			<ul>
				<li><span>Date</span> <date>August 15, 2024</date></li>
				<li><span>Time</span> 5:00 PM - 11:00 PM</li>
				<li><span>Venue</span> Larkfield Manor</li>
				<li>
					<span>Address</span>
					<address>507 Larkfield Rd East <br class="lg:inline" />Northport, NY 11731</address>
				</li>
			</ul>

			<div
				class="border-2 border-megan-300 bg-megan-100 rounded-lg m-4 p-10 flex flex-col lg:flex-row items-center gap-4 justify-center"
			>
				<h2 class="m-0 text-megan-700 text-2xl lg:text-5xl">Count Down</h2>
				<p class="text-megan-500 font-serif text-2xl lg:text-5xl">
					{#if remainingTime !== 0}
						{days} days
					{:else}
						♥️♥️♥️ days
					{/if}
				</p>
			</div>
			<Headline>Schedule</Headline>

			<ul>
				<li>5:00 PM - 5:30 PM: Doors Open</li>
				<li>5:30 PM - 6:00 PM: Ceremony</li>
				<li>6:00 PM - 7:00 PM: Cocktail Hour</li>
				<li>7:00 PM - 11:00 PM: Dinner and Dancing</li>
			</ul>
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
