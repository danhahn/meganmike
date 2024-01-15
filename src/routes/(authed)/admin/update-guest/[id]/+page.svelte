<script lang="ts">
	import Headline from '$lib/components/Headline.svelte';
	import Button from '$lib/components/forms/Button.svelte';
	import Form from '$lib/components/forms/Form.svelte';
	import Input from '$lib/components/forms/Input.svelte';
	import { db, firestore } from '$lib/firebase/firebase';
	import type { Guest, LoadingProps } from '$lib/types';
	import { doc, updateDoc } from 'firebase/firestore';
	import type { PageData } from './$types';
	import Dialog from '$lib/components/Dialog.svelte';
	import { goto } from '$app/navigation';
	import { getDoc } from 'firebase/firestore';

	import { title } from '$lib/utils';
	import { onMount } from 'svelte';
	export let data: PageData;

	const firebaseDoc = 'guests';
	const ref = doc(db, firebaseDoc, data.id);

	let msg = '';

	let guestFirstName = '';
	let guestLastName: string = '';
	let unknownGuest: boolean = false;

	let dialog: HTMLDialogElement;

	let firstName = '';
	let lastName = '';
	let address1 = '';
	let address2 = '';
	let city = '';
	let state = '';
	let zipCode = '';
	let phoneNumber = '';
	let email = '';
	let guests: Guest['guests'] = [];

	let status: LoadingProps = 'loading';

	async function updateGuest() {
		status = 'submitting';
		try {
			await updateDoc(ref, {
				firstName,
				lastName,
				address: address1,
				address2,
				city,
				state,
				zipCode,
				email,
				phone: phoneNumber
			});
			msg = `Guest was successfully updated! 🎉`;
			status = 'idle';
			setTimeout(() => {
				msg = '';
			}, 2000);
		} catch (error) {}
	}

	type NewGuest = {
		firstName: string;
		lastName: string;
	};

	async function addGuestToWedding() {
		const newGuest: NewGuest = {
			firstName: guestFirstName,
			lastName: guestLastName
		};

		status = 'submitting';
		await updateDoc(ref, {
			guests: [...guests, newGuest]
		});
		msg = `${guestFirstName} ${guestLastName} was added as a guest 🎉`;
		status = 'idle';
		resetDialog();
		setTimeout(() => {
			msg = '';
		}, 2000);
	}

	async function removeGuestFromWedding(guest: NewGuest) {
		const updateGuests = guests.filter((g) => g !== guest);

		await updateDoc(ref, {
			guests: updateGuests
		});
	}

	async function resetDialog() {
		guestFirstName = '';
		guestLastName = '';
		unknownGuest = false;
	}

	function handleDialogClose() {
		if (dialog.returnValue === 'success') {
			addGuestToWedding();
		}
		if (dialog.returnValue === 'cancel') {
			resetDialog();
			dialog.close();
		}
	}

	function handleKeyboardPress(event: KeyboardEventInit) {
		if (event.key === 'Enter' && dialog.open) {
			if (guestFirstName || unknownGuest) {
				addGuestToWedding();
			} else {
				msg = 'No one was added';
				setTimeout(() => {
					msg = '';
				}, 2000);
			}
		}
	}

	onMount(async () => {
		const docSnap = await getDoc(ref);
		if (docSnap.exists()) {
			const data = docSnap.data();
			firstName = data.firstName;
			lastName = data.lastName;
			address1 = data.address;
			address2 = data.address2;
			city = data.city;
			state = data.state;
			zipCode = data.zipCode;
			phoneNumber = data.phone;
			email = data.email;
			guests = data.guests;
			status = 'idle';
		}
	});
</script>

<svelte:head>
	<title>Update Guest | {title}</title>
</svelte:head>

<svelte:body on:keypress={handleKeyboardPress} />

<a href="/admin" class="flex gap-1">
	<svg xmlns="http://www.w3.org/2000/svg" class="w-4 fill-megan-900" viewBox="0 96 960 960"
		><path d="M655 976 255 576l400-400 56 57-343 343 343 343-56 57Z" /></svg
	>
	<span class="text-megan-900">Back to View All Guests</span></a
>
<Headline>Update Guest</Headline>

{#if msg}
	<p class="text-center text-2xl text-megan-600">{msg}</p>
{/if}

<Form on:submit={updateGuest}>
	<p>Update Wedding guest</p>
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
			id="phone"
			label="Phone Number"
			type="tel"
			maxLength={10}
			bind:value={phoneNumber}
			disabled={status === 'submitting'}
		/>
		<Input
			id="email"
			label="Email Address"
			type="email"
			bind:value={email}
			disabled={status === 'submitting'}
			required={false}
		/>
	</div>

	<div class="flex gap-4">
		<Button type="button" variant="primary" on:click={() => dialog.showModal()}>Add +1</Button>
	</div>
	<div>
		<ul class="flex gap-2">
			{#each guests as guest}
				<li class="border-2 border-megan-200 p-2 bg-megan-50 rounded-lg flex gap-2 items-center">
					{#if guest.firstName || guest.lastName}
						<p class="leading-none text-sm">
							{guest.firstName}
							{guest.lastName}
						</p>
					{:else}
						<p>+1 guest</p>
					{/if}
					<Button size="tiny" variant="warning" on:click={() => removeGuestFromWedding(guest)}>
						<svg xmlns="http://www.w3.org/2000/svg" class="w-3 fill-white" viewBox="0 -960 960 960"
							><path
								d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"
							/></svg
						>
					</Button>
				</li>
			{/each}
		</ul>
	</div>

	<div class="flex justify-end gap-4">
		<Button
			variant="secondary"
			disabled={status !== 'idle'}
			type="button"
			on:click={() => goto('/admin')}>Cancel</Button
		>
		<Button type="submit" disabled={status !== 'idle'}>Update Guest</Button>
	</div>
</Form>

<Dialog
	id="addGuest"
	bind:dialog
	on:close={handleDialogClose}
	cancel="Cancel"
	confirm="Add Guest"
	disabled={!(!!guestFirstName || unknownGuest)}
>
	<div class="grid gap-4">
		<h1 class="text-2xl">Add +1</h1>
		<div class="grid lg:grid-cols-2 gap-4">
			<Input
				id="guestFirstName"
				bind:value={guestFirstName}
				label="First Name"
				disabled={unknownGuest}
				required={false}
			/>
			<Input
				id="guestLastName"
				bind:value={guestLastName}
				label="Last Name"
				disabled={unknownGuest}
				required={false}
			/>
		</div>
		<div class="flex gap-4">
			<input type="checkbox" class="accent-megan-600" id="unknown" bind:checked={unknownGuest} />
			<label for="unknown">Don't know the name of +1 guest</label>
		</div>
	</div>
</Dialog>
