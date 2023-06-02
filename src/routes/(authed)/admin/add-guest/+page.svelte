<script lang="ts">
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
			status = 'idle';
		} catch (e) {
			console.error('Error adding document: ', e);
			state = 'error';
		}
	}
</script>

<Headline>Add Guest</Headline>

<Form on:submit={addGuest}>
	<p>Add a guest to the Wedding</p>
	<div class="grid grid-rows-2 lg:grid-rows-1 lg:grid-cols-2 gap-2 lg:gap-3">
		<Input id="firstName" label="First Name" bind:value={firstName} />
		<Input id="lastName" label="Last Name" bind:value={lastName} />
	</div>
	<Input id="address" label="Address" bind:value={address1} />
	<Input id="address2" label="Address" required={false} bind:value={address2} />
	<div class="grid grid-rows-2 lg:grid-rows-1 lg:grid-cols-3 gap-2 lg:gap-3">
		<Input id="city" label="City" bind:value={city} />
		<Input id="state" label="State" bind:value={state} />
		<Input id="zipCode" type="number" bind:value={zipCode} maxlength={5} label="Zip Code" />
	</div>
	<p>Contact Info</p>
	<div class="grid grid-rows-2 lg:grid-rows-1 lg:grid-cols-2 gap-2 lg:gap-3">
		<Input id="email" label="Email Address" type="email" bind:value={email} />
		<Input id="phone" label="Phone Number" type="tel" maxLength={10} bind:value={phoneNumber} />
	</div>
	<div class="flex gap-2">
		<Button type="button" size="small" on:click={() => (showAddGuest = !showAddGuest)}>
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
				class="grid grid-rows-2 lg:grid-rows-1 lg:grid-cols-[auto_1fr_1fr] lg:items-center gap-2 lg:gap-3"
			>
				<p>Additional Guest {index + 1}</p>
				<Input id={`guestFirstName${index + 1}`} label="First Name" required={false} />
				<Input id={`guestLastName${index + 1}`} label="Last Name" required={false} />
			</div>
		{/each}
	{/if}

	<Button disabled={status !== 'idle'} type="submit">Add Guest</Button>
</Form>
