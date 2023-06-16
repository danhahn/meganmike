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

	export let data: PageData;
	const docRef = doc(db, 'guests', data.id);

	let status: 'idle' | 'loading' | 'error' | 'confirm' = 'loading';

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

			guests = [...guests, ...docSnap.data().guests];
			status = 'idle';

			if (rsvp) {
				status = 'confirm';
			}
		} else {
			console.log('No such document!');
			status = 'error';
		}
	};

	const rsvpYes = async () => {
		setDoc(docRef, { rsvp: 'yes', totalGuests: selectedGuests }, { merge: true });
		status = 'confirm';
	};
	const rsvpNo = async () => {
		setDoc(docRef, { rsvp: 'no', totalGuests: 0 }, { merge: true });
		status = 'confirm';
	};

	const validatePhoneNumber = () => {
		if (userEnteredPhone === phone) {
			localStorage.setItem(data.id, 'true');
			confirmed = true;
		} else {
			errorMessage = 'Sorry the phone number is not correct please check and try again';
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

	onMount(loadDoc);
</script>

<svelte:head>
	<title>RSVP | {title}</title>
</svelte:head>

<Headline>RSVP</Headline>

<Section>
	{#if status === 'idle'}
		<h2>{firstName} {lastName}</h2>
		{#if !confirmed}
			<p>
				Congratulations! You have been invited to the wedding of Megan and Mike on August 22, 2022.
			</p>

			<p>To RSVP, please enter your phone number below.</p>

			{#if errorMessage}
				<p>{errorMessage}</p>
			{/if}

			{phone}

			<Input name="phone" id="phone" label="phone number" bind:value={userEnteredPhone} />
			<Button on:click={validatePhoneNumber}>Next</Button>
		{:else}
			<p>Please RSVP with the correct number of guest</p>

			<div class="guests" on:mouseleave={() => (hoverSelected = 0)}>
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
			</div>

			<div class="grid grid-cols-2 gap-4">
				<Button variant="warning" on:click={rsvpNo}>RSVP NO</Button>
				<Button variant="success" on:click={rsvpYes}
					>RSVP YES

					{#if selectedGuests}
						({selectedGuests})
					{/if}
				</Button>
			</div>
		{/if}
	{:else if status === 'loading'}
		<p>loading</p>
	{:else if status === 'confirm'}
		<p>you have confirmed your rsvp</p>
		<p>{selectedGuests}</p>
	{:else}
		<p>There was an error</p>
	{/if}
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
</style>
