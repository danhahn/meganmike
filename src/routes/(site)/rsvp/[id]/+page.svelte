<script lang="ts">
	import Headline from '$lib/components/Headline.svelte';
	import Section from '$lib/components/Section.svelte';
	import Button from '$lib/components/forms/Button.svelte';
	import Input from '$lib/components/forms/Input.svelte';
	import { title } from '$lib/utils';
	import { doc, getDoc, setDoc } from 'firebase/firestore';

	import type { PageData } from './$types';
	import { db } from '$lib/firebase/firebase.client';
	import { onMount } from 'svelte';
	import RsvpButton from '$lib/components/RsvpButton.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import type { LoadingProps } from '$lib/types';
	import RsvpInfo from '$lib/components/RsvpInfo.svelte';
	import { dev } from '$app/environment';

	export let data: PageData;
	const docRef = doc(db, 'guests', data.id);

	let status: LoadingProps = 'loading';

	let hasRsvp: boolean = false;

	let confirmed: boolean = false;
	let errorMessage: string;

	let firstName: string;
	let lastName: string;
	let rsvp: string;
	let phone: string;
	let guests: string[] = ['one'];

	let userEnteredPhone: string;

	const loadDoc = async () => {
		const isConfirmed = localStorage.getItem(data.id);
		if (isConfirmed) confirmed = JSON.parse(isConfirmed);

		status = 'loading';

		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			firstName = docSnap.data().firstName;
			lastName = docSnap.data().lastName;
			phone = docSnap.data().phone;
			rsvp = docSnap.data().rsvp;
			selectedGuests = docSnap.data().totalGuests || 0;

			guests = [...guests, ...docSnap.data().guests];
			status = 'idle';

			if (rsvp) {
				hasRsvp = true;
			}
		} else {
			console.log('No such document!');
			status = 'error';
		}
	};

	const rsvpYes = async () => {
		if (selectedGuests === 0) {
			errorMessage = 'Please select the number of guest ';
			return;
		}
		setDoc(docRef, { rsvp: 'yes', totalGuests: selectedGuests }, { merge: true });
		hasRsvp = true;
	};
	const rsvpNo = async () => {
		if (selectedGuests) {
			errorMessage = 'It looks like you selected guest';
			return;
		}
		setDoc(docRef, { rsvp: 'no', totalGuests: 0 }, { merge: true });
		hasRsvp = true;
	};

	const validatePhoneNumber = () => {
		if (userEnteredPhone === phone) {
			localStorage.setItem(data.id, 'true');
			confirmed = true;
		} else {
			errorMessage = 'The phone number you entered is does not match our records';
		}
	};

	let hoverSelected = 0;
	let selectedGuests = 0;

	const handleMouseOver = (item: number) => {
		if (!selectedGuests) {
			hoverSelected = item;
		}
	};
	const selectGuest = (item: number) => {
		selectedGuests = item;
	};

	$: name = `${firstName} ${lastName}`;

	onMount(loadDoc);
</script>

<svelte:head>
	<title>RSVP | {title}</title>
</svelte:head>

<Headline>RSVP</Headline>

<Section>
	<Loading {status}>
		<h1 class="text-2xl text-center text-megan-700">Hey {name}!</h1>

		{#if !hasRsvp}
			{#if !confirmed}
				<RsvpInfo />

				<div class="min-w-[300px] mx-auto grid gap-4 text-center" style="text-wrap: balance">
					<p>Please confirm your phone number below to get started</p>
					{#if dev}
						<button on:click={() => navigator.clipboard.writeText(phone)}>{phone}</button>
					{/if}
					<Input
						{errorMessage}
						name="phone"
						id="phone"
						label="phone number"
						bind:value={userEnteredPhone}
					/>
					<Button on:click={validatePhoneNumber}>Next</Button>
				</div>
			{:else}
				<div
					class="border border-megan-500 rounded-md p-4 min-w-[300px] mx-auto grid gap-4 text-center"
					style="text-wrap: balance"
				>
					<p class="font-black text-megan-600">
						Please RSVP with the number of guest that will join us to celebrate!
					</p>

					<select
						bind:value={selectedGuests}
						class="bg-gray-50 border border-megan-300 text-megan-900 text-sm rounded-lg  block w-full p-2.5"
					>
						<option value="0">Sorry I can't make it</option>

						{#each guests as _, index}
							<option value={index + 1}>{index + 1}</option>
						{/each}
					</select>

					<div class="guests" on:mouseleave={() => (hoverSelected = 0)}>
						<RsvpButton
							on:mouseenter={() => handleMouseOver(0)}
							on:click={() => selectGuest(0)}
							selected={selectedGuests !== 0}
							hover={hoverSelected !== 0}
						>
							{0}
						</RsvpButton>
						{#each guests as _, index}
							<RsvpButton
								on:mouseenter={() => handleMouseOver(index + 1)}
								on:click={() => selectGuest(index + 1)}
								selected={selectedGuests >= index + 1}
								hover={hoverSelected >= index + 1}
							>
								{index + 1}
							</RsvpButton>
						{/each}
						<Button variant="naked" on:click={() => (selectedGuests = 0)}>Reset</Button>
					</div>

					{#if selectedGuests}
						<Button
							variant="success"
							size="default"
							on:click={rsvpYes}
							disabled={selectedGuests === 0}
							>RSVP YES ({selectedGuests})
						</Button>
					{:else}
						<Button variant="warning" size="default" on:click={rsvpNo} disabled={selectedGuests > 0}
							>RSVP NO</Button
						>
					{/if}
				</div>
				<RsvpInfo />
			{/if}
		{:else}
			{#if selectedGuests}
				<div class="text-center">
					<h2>Congratulations</h2>
					<p>You RSVP Yes 🎉</p>
				</div>
				<RsvpInfo short />
			{:else}
				<p>You RSVPed No</p>
			{/if}

			<div class="text-center grid gap-2 border border-megan-500 rounded-md p-4 mt-8">
				<Button on:click={() => (hasRsvp = false)}>Edit your RSVP</Button>
				<p class="text-xs">If you need to edit or RSVP please do so before June 17, 2023</p>
			</div>
		{/if}
		<span slot="error">
			<h1>Looks like there was an error</h1>
			<p>We were unable to find your RSVP</p>
			<p>Please check your invitation</p>
			<p>If there there is still an issue contact support</p>
		</span>
	</Loading>
</Section>

<style lang="postcss">
	.guests {
		display: grid;
		grid-template-columns: 3rem;
		grid-auto-flow: column;
		grid-auto-columns: 3rem;
		gap: 0.5rem;
		justify-self: center;
	}

	h1 {
		@apply text-2xl text-megan-600;
	}
</style>
