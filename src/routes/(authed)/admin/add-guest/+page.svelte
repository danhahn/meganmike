<script lang="ts">
	import { slide } from 'svelte/transition';
	import { dev } from '$app/environment';
	import Headline from '$lib/components/Headline.svelte';
	import Button from '$lib/components/forms/Button.svelte';
	import Form from '$lib/components/forms/Form.svelte';
	import Input from '$lib/components/forms/Input.svelte';
	import { db } from '$lib/firebase/firebase.client';
	import { getFormData, getNextValue } from '$lib/utils';
	import { collection, addDoc } from 'firebase/firestore';
	import Dialog from '$lib/components/Dialog.svelte';
	import { goto } from '$app/navigation';
	import {
		firstNames,
		generateFakeStreetAddress,
		generateRandomEmailAddress,
		generateRandomPhoneNumber,
		getRandomTownInNewYork,
		lastNames
	} from '$lib/devUtils';

	let dialog: HTMLDialogElement;

	let showAddGuest = false;
	let additionalGuest = 1;
	let status: 'idle' | 'submitting' | 'error' = 'idle';

	function addAdditionalGuest() {
		if (additionalGuest < 2) additionalGuest++;
	}

	function removeAdditionalGuest() {
		if (additionalGuest > 0) additionalGuest--;
	}

	let firstName: string = '';
	let lastName: string = '';
	let address1: string = '';
	let address2: string;
	let city: string = '';
	let state: string = '';
	let zipCode: string = '';
	let phoneNumber: string = '';
	let email: string = '';

	if (dev) {
		const randomIndex = Math.floor(Math.random() * firstNames.length);

		firstName = firstNames[randomIndex];
		lastName = lastNames[randomIndex];
		address1 = generateFakeStreetAddress();
		city = getRandomTownInNewYork();
		state = 'NY';
		zipCode = '90036';
		phoneNumber = generateRandomPhoneNumber();
		email = generateRandomEmailAddress(randomIndex);
	}

	function generateLastName() {
		// Load a list of last names.

		// Choose a random last name from the list.
		const randomIndex = Math.floor(Math.random() * lastNames.length);
		firstName = firstNames[randomIndex];
		lastName = lastNames[randomIndex];
	}

	function resetForm() {
		firstName = '';
		lastName = '';
		address1 = '';
		address2;
		city = '';
		state = '';
		zipCode = '';
		phoneNumber = '';
		email = '';

		if (dev) {
			const randomIndex = Math.floor(Math.random() * firstNames.length);

			firstName = firstNames[randomIndex];
			lastName = lastNames[randomIndex];
			address1 = generateFakeStreetAddress();
			city = getRandomTownInNewYork();
			state = 'NY';
			zipCode = '90036';
			phoneNumber = generateRandomPhoneNumber();
			email = generateRandomEmailAddress(randomIndex);
		}

		additionalGuest = 0;
		status = 'idle';
	}

	async function addGuest(event: Event) {
		const formData = getFormData(event);

		status = 'submitting';

		try {
			const docRef = await addDoc(collection(db, 'guests'), {
				...formData,
				rsvp: null
			});
			if (dev) {
				console.log('Document written with ID: ', docRef.id);
			}
			dialog.showModal();
		} catch (e) {
			console.error('Error adding document: ', e);
			state = 'error';
		}
	}

	function handleDialogClose() {
		if (dialog.returnValue === 'success') {
			resetForm();
			status = 'idle';
		}
		if (dialog.returnValue === 'cancel') {
			goto('/admin');
		}
	}
</script>

<svelte:head>
	<title>Add Guest</title>
</svelte:head>

<a href="/admin" class="flex gap-1">
	<svg xmlns="http://www.w3.org/2000/svg" class="w-4 fill-megan-900" viewBox="0 96 960 960"
		><path d="M655 976 255 576l400-400 56 57-343 343 343 343-56 57Z" /></svg
	>
	<span class="text-megan-900">Back to View All Guests</span></a
>
<Headline>Add Guest</Headline>

<Form on:submit={addGuest}>
	<p>Guest's Name</p>
	<div class="grid grid-rows-2 lg:grid-rows-1 lg:grid-cols-2 gap-2 lg:gap-3">
		<Input
			id="firstName"
			label="First Name"
			bind:value={firstName}
			required
			disabled={status === 'submitting'}
		/>
		<Input
			id="lastName"
			label="Last Name"
			bind:value={lastName}
			required
			disabled={status === 'submitting'}
		/>
	</div>
	<p>Address</p>
	<Input
		id="address"
		required
		label="Address"
		bind:value={address1}
		disabled={status === 'submitting'}
	/>
	<Input
		id="address2"
		label="Address"
		required={false}
		bind:value={address2}
		disabled={status === 'submitting'}
	/>
	<div class="grid grid-rows-2 lg:grid-rows-1 lg:grid-cols-3 gap-2 lg:gap-3">
		<Input id="city" required label="City" bind:value={city} disabled={status === 'submitting'} />
		<Input
			id="state"
			required
			label="State"
			bind:value={state}
			disabled={status === 'submitting'}
		/>
		<Input
			id="zipCode"
			type="number"
			bind:value={zipCode}
			disabled={status === 'submitting'}
			maxlength={5}
			label="Zip Code"
			required
		/>
	</div>
	<p>Contact Info</p>
	<div class="grid grid-rows-2 lg:grid-rows-1 lg:grid-cols-2 gap-2 lg:gap-3">
		<Input
			id="email"
			label="Email Address"
			type="email"
			bind:value={email}
			disabled={status === 'submitting'}
		/>
		<Input
			id="phone"
			label="Phone Number"
			type="tel"
			maxLength={10}
			bind:value={phoneNumber}
			disabled={status === 'submitting'}
		/>
	</div>
	<div class="flex gap-2 mt-4">
		<Button
			type="button"
			size="small"
			on:click={() => {
				if (showAddGuest) {
					showAddGuest = false;
					additionalGuest = 0;
				} else {
					showAddGuest = true;
					additionalGuest = 1;
				}
			}}
		>
			{#if !showAddGuest}
				Add +1
			{:else}
				Cancel
			{/if}
		</Button>
		{#if showAddGuest}
			<Button
				type="button"
				on:click={() => (additionalGuest = getNextValue(additionalGuest, 'prev'))}
				isRound
				size="small"
				variant="secondary"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="w-5 fill-current" viewBox="0 -960 960 960"
					><path d="M200-450v-60h560v60H200Z" /></svg
				>
			</Button>
			<Button
				type="button"
				on:click={() => (additionalGuest = getNextValue(additionalGuest, 'next'))}
				isRound
				size="small"
				variant="secondary"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="w-5 fill-current" viewBox="0 -960 960 960"
					><path d="M450-200v-250H200v-60h250v-250h60v250h250v60H510v250h-60Z" /></svg
				>
			</Button>
		{/if}
	</div>
	{#if showAddGuest}
		{#each Array.from({ length: additionalGuest }) as _, index}
			<div
				transition:slide
				class="grid grid-rows-2 grid-cols-[auto_1fr] lg:grid-rows-1 lg:grid-cols-[auto_1fr_1fr] lg:items-center gap-2 lg:gap-3"
			>
				<p class="text-2xl tracking-normal row-span-2 lg:row-span-1 m-1 lg:m-0 text-megan-800">
					+{index + 1}
				</p>
				<Input
					id={`guestFirstName${index + 1}`}
					label="First Name"
					disabled={status === 'submitting'}
					required={false}
				/>
				<Input
					id={`guestLastName${index + 1}`}
					label="Last Name"
					disabled={status === 'submitting'}
					required={false}
				/>
			</div>
		{/each}
	{/if}

	<div class="flex flex-col-reverse lg:flex-row lg:justify-end gap-4 mt-12">
		<Button
			variant="secondary"
			disabled={status !== 'idle'}
			type="button"
			on:click={() => goto('/admin')}>Cancel</Button
		>
		<Button disabled={status !== 'idle'} type="submit">
			<svg xmlns="http://www.w3.org/2000/svg" class="w-6 fill-current" viewBox="0 -960 960 960"
				><path d="M450-200v-250H200v-60h250v-250h60v250h250v60H510v250h-60Z" /></svg
			>
			Add Guest To Wedding</Button
		>
	</div>
</Form>

<Dialog id="addGuest" bind:dialog on:close={handleDialogClose} cancel="No" confirm="Yes">
	<h1 class="text-3xl mb-4">
		<span class="text-megan-700 font-extrabold">{firstName} {lastName}</span> Added to the wedding! 💍
	</h1>
	<h3 class="text-xl">Add another guest?</h3>
</Dialog>
