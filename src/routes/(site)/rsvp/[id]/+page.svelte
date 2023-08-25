<script lang="ts">
	import Headline from '$lib/components/Headline.svelte';
	import Section from '$lib/components/Section.svelte';
	import Button from '$lib/components/forms/Button.svelte';
	import Input from '$lib/components/forms/Input.svelte';
	import { title } from '$lib/utils';
	import { doc, setDoc } from 'firebase/firestore';

	import type { PageData } from './$types';
	import { auth, db, firestore, storage } from '$lib/firebase/firebase';

	import RsvpInfo from '$lib/components/RsvpInfo.svelte';
	import { dev } from '$app/environment';
	import { Doc, FirebaseApp } from 'sveltefire';
	import Loading from '$lib/components/Loading.svelte';

	export let data: PageData;
	const docRef = doc(db, 'guests', data.id);

	let hasRsvp: boolean = false;

	let confirmed: boolean = false;
	let errorMessage: string;

	let userEnteredPhone: string;

	let selectedGuests = 0;

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

	const validatePhoneNumber = (phone: string) => {
		if (userEnteredPhone === phone) {
			localStorage.setItem(data.id, 'true');
			confirmed = true;
		} else {
			errorMessage = 'The phone number you entered is does not match our records';
		}
	};
</script>

<svelte:head>
	<title>RSVP | {title}</title>
</svelte:head>

<FirebaseApp {firestore} {auth} {storage}>
	<Doc ref={`guests/${data.id}`} let:data>
		<Headline>RSVP</Headline>

		<Section>
			<h1 class="text-2xl text-center text-megan-700">Hey {data.firstName} {data.lastName}!</h1>

			{#if !hasRsvp}
				{#if !confirmed}
					<RsvpInfo />

					<div class="min-w-[300px] mx-auto grid gap-4 text-center" style="text-wrap: balance">
						<p>Please confirm your phone number below to get started</p>
						{#if dev}
							<button on:click={() => navigator.clipboard.writeText(data.phone)}
								>{data.phone}</button
							>
						{/if}
						<Input
							{errorMessage}
							name="phone"
							id="phone"
							label="Confirm Your Phone Number"
							bind:value={userEnteredPhone}
						/>
						<Button on:click={() => validatePhoneNumber(data.phone)}>Next</Button>
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
							class="bg-gray-50 border border-megan-300 text-megan-900 text-sm rounded-lg block w-full p-2.5"
						>
							{#each Array.from({ length: data.guests + 2 }) as _, index}
								<option value={index}>{index}</option>
							{/each}
						</select>

						{#if selectedGuests}
							<Button
								variant="success"
								size="default"
								on:click={rsvpYes}
								disabled={selectedGuests === 0}
								>RSVP YES ({selectedGuests})
							</Button>
						{:else}
							<Button
								variant="warning"
								size="default"
								on:click={rsvpNo}
								disabled={selectedGuests > 0}>RSVP NO</Button
							>
						{/if}
					</div>
					<RsvpInfo />
				{/if}
			{:else}
				<div class="text-center grid gap-4">
					{#if selectedGuests}
						<h2>Congratulations</h2>
						<p class="text-4xl text-green-600">You RSVP Yes ({selectedGuests}) 🎉</p>
						<RsvpInfo short />
					{:else}
						<h2>Don't worry we still love you</h2>
						<p class="text-4xl text-red-600">You RSVPed No ☹️</p>
						<p>We are so sorry you can't make it.</p>
					{/if}
				</div>

				<div class="text-center grid gap-2 border border-megan-500 rounded-md p-4 mt-8">
					<Button on:click={() => (hasRsvp = false)}>Edit your RSVP</Button>
					<p class="text-xs">If you need to edit or RSVP please do so before June 17, 2023</p>
				</div>
			{/if}
		</Section>

		<div class="h-3/4" slot="loading"><Loading /></div>
	</Doc>
</FirebaseApp>

<style lang="postcss">
	h1 {
		@apply text-2xl text-megan-600;
	}
</style>
