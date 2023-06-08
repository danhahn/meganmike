<script lang="ts">
	import Headline from '$lib/components/Headline.svelte';
	import Button from '$lib/components/forms/Button.svelte';
	import Form from '$lib/components/forms/Form.svelte';
	import Input from '$lib/components/forms/Input.svelte';
	import { db } from '$lib/firebase/firebase.client';
	import type { LoadingProps } from '$lib/types';
	import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
	import { onMount } from 'svelte';
	import type { PageData } from '../$types';
	import Loading from '$lib/components/Loading.svelte';
	import Dialog from '$lib/components/Dialog.svelte';
	export let data: PageData;

	const firebaseDoc = 'guests';
	const ref = doc(db, firebaseDoc, data.id);

	let guestFirstName: string = '';
	let guestLastName: string = '';

	let dialog: HTMLDialogElement;

	type Guest = {
		firstName: string;
		lastName: string;
	};

	let firstName: string = '';
	let lastName: string = '';
	let address1: string = '';
	let address2: string;
	let city: string = '';
	let state: string = '';
	let zipCode: string = '';
	let phoneNumber: string = '';
	let email: string = '';
	let guests: Guest[] = [];

	let status: LoadingProps = 'loading';

	async function getDocumentFromFirebase(id: string) {
		status = 'loading';

		try {
			const unsub = await onSnapshot(ref, (doc) => {
				const snapshot = doc.data();
				if (snapshot) {
					firstName = snapshot.firstName;
					lastName = snapshot.lastName;
					address1 = snapshot.address;
					address2 = snapshot.address2;
					city = snapshot.city;
					state = snapshot.state;
					zipCode = snapshot.zipCode;
					phoneNumber = snapshot.phone;
					email = snapshot.email;
					guests = snapshot.guests;
					status = 'idle';
				} else {
					status = 'error';
					console.log('no doc found');
				}
			});
		} catch (error) {
			console.log('No such document!');
			status = 'error';
		}
	}

	onMount(() => {
		getDocumentFromFirebase(data.id);
	});

	async function addGuestToWedding() {
		const newGuest: Guest = {
			firstName: guestFirstName,
			lastName: guestLastName
		};

		await updateDoc(ref, {
			guests: [...guests, newGuest]
		});
	}
	async function removeGuestFromWedding(guest: Guest) {
		const updateGuests = guests.filter((g) => g !== guest);

		await updateDoc(ref, {
			guests: updateGuests
		});
	}

	async function cancelAddGuest() {
		guestFirstName = '';
		guestLastName = '';
	}

	function handleDialogClose() {
		if (dialog.returnValue === 'success') {
			addGuestToWedding();
		}
		if (dialog.returnValue === 'cancel') {
			cancelAddGuest();
		}
	}
</script>

<Headline>Update Guest</Headline>

<Loading {status}>
	<Form>
		<p>Update Wedding guest</p>
		<div class="grid grid-rows-2 lg:grid-rows-1 lg:grid-cols-2 gap-2 lg:gap-3">
			<Input id="firstName" label="First Name" bind:value={firstName} required disabled />
			<Input id="lastName" label="Last Name" bind:value={lastName} required disabled />
		</div>
		<Input
			id="address"
			required
			label="Address"
			bind:value={address1}
			disabled={status === 'loading'}
		/>
		<Input
			id="address2"
			label="Address"
			required={false}
			bind:value={address2}
			disabled={status === 'loading'}
		/>
		<div class="grid grid-rows-2 lg:grid-rows-1 lg:grid-cols-3 gap-2 lg:gap-3">
			<Input id="city" required label="City" bind:value={city} disabled={status === 'loading'} />
			<Input id="state" required label="State" bind:value={state} disabled={status === 'loading'} />
			<Input
				id="zipCode"
				type="number"
				bind:value={zipCode}
				disabled={status === 'loading'}
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
				disabled={status === 'loading'}
			/>
			<Input
				id="phone"
				label="Phone Number"
				type="tel"
				maxLength={10}
				bind:value={phoneNumber}
				disabled={status === 'loading'}
			/>
		</div>

		<div class="flex gap-4">
			<p>Additional Guests</p>
			<Button
				type="button"
				isRound
				size="small"
				variant="secondary"
				on:click={() => dialog.showModal()}
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="w-5 fill-current" viewBox="0 -960 960 960"
					><path d="M450-200v-250H200v-60h250v-250h60v250h250v60H510v250h-60Z" /></svg
				>
			</Button>
		</div>
		<div>
			<ul class="flex gap-2">
				{#each guests as guest}
					<li class="border-2 border-megan-200 p-2 bg-megan-50 rounded-lg flex gap-2">
						<p class="leading-none text-sm">
							{guest.firstName}
							{guest.lastName}
						</p>
						<Button size="tiny" variant="warning" on:click={() => removeGuestFromWedding(guest)}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="w-3 fill-white"
								viewBox="0 -960 960 960"
								><path
									d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"
								/></svg
							>
						</Button>
					</li>
				{/each}
			</ul>
		</div>

		<Button>Update Guest</Button>
	</Form>

	<Dialog
		id="addGuest"
		bind:dialog
		on:close={handleDialogClose}
		cancel="Cancel"
		confirm="Add Guest"
	>
		<div class="grid gap-4">
			<h1 class="text-2xl">Add another guest</h1>
			<div class="grid grid-cols-2 gap-4">
				<Input id="guestFirstName" bind:value={guestFirstName} label="First Name" required={true} />
				<Input id="guestLastName" bind:value={guestLastName} label="Last Name" required={true} />
			</div>
		</div>
	</Dialog>
</Loading>
