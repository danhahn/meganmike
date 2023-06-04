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

	let showAddGuest = false;
	let additionalGuest = 1;
	let status: 'idle' | 'submitting' | 'error' = 'idle';

	function addAdditionalGuest() {
		if (additionalGuest < 2) additionalGuest++;
	}

	function removeAdditionalGuest() {
		if (additionalGuest > 0) additionalGuest--;
	}

	let firstName: string = 'Dan';
	let lastName: string = 'Hahn';
	let address1: string = '59 Stanley St';
	let address2: string;
	let city: string = 'Pleasantville';
	let state: string = 'NY';
	let zipCode: string = '10570';
	let phoneNumber: string = '914262433';
	let email: string = 'danielhahn@gmail.com';

	function resetForm() {
		firstName = '';
		lastName = '';
		address1 = '';
		address2 = '';
		city = '';
		state = '';
		zipCode = '';
		phoneNumber = '';
		email = '';
		additionalGuest = 0;
		status = 'idle';
	}

	async function addGuest(event: any) {
		const formData = getFormData(event);

		status = 'submitting';

		try {
			const docRef = await addDoc(collection(db, 'guests'), {
				...formData,
				rsvp: false
			});
			if (dev) {
				console.log('Document written with ID: ', docRef.id);
			}
			setTimeout(resetForm, 1000);
		} catch (e) {
			console.error('Error adding document: ', e);
			state = 'error';
		}
	}
</script>

<Headline>Add Guest</Headline>

{#if status === 'submitting'}
	<p class="text-2xl text-center m-6">{firstName} {lastName} Added to your wedding</p>
{/if}

<Form on:submit={addGuest}>
	<p>Add a guest to the Wedding</p>
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
				Add Guest
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
				class="grid grid-rows-2 lg:grid-rows-1 lg:grid-cols-[auto_1fr_1fr] lg:items-center gap-2 lg:gap-3"
			>
				<p>Additional Guest {index + 1}</p>
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

	<Button disabled={status !== 'idle'} type="submit">Add Guest</Button>
</Form>
