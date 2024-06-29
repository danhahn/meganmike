<script lang="ts">
	import Button from '$lib/components/forms/Button.svelte';
	import { title } from '$lib/utils';
	import { doc, setDoc } from 'firebase/firestore';

	import type { PageData } from './$types';
	import { db, firestore } from '$lib/firebase/firebase';

	import RsvpInfo from '$lib/components/RsvpInfo.svelte';
	import { dev } from '$app/environment';
	import { docStore } from 'sveltefire';
	import Loading from '$lib/components/Loading.svelte';
	import { onMount } from 'svelte';
	import Input from '$lib/components/forms/Input.svelte';

	const RSVPDate = 'July 20, 2024';

	export let data: PageData;
	const docRef = doc(db, 'guests', data.id);

	const guest = docStore(firestore, `guests/${data.id}`);

	let hasRsvp: boolean = false;

	let confirmed: boolean = false;
	let errorMessage: string;

	let selectElement: HTMLSelectElement;

	let phoneNumber: string;

	let selectedGuests: number = 0;

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
		if (phoneNumber === phone) {
			localStorage.setItem(data.id, 'true');
			confirmed = true;
		} else {
			errorMessage = 'The phone number you entered is does not match our records';
		}
	};

	$: if ($guest?.rsvp) {
		hasRsvp = true;
	}

	onMount(() => {
		confirmed = !!localStorage.getItem(data.id);
	});
</script>

<svelte:head>
	<title>RSVP | {title}</title>
</svelte:head>

<div class="my-6 mx-4 lg:h-full grid place-content-center lg:block">
	<section
		class="bg-white p-6 max-w-96 md:max-w-3xl mx-auto rounded-2xl shadow-2xl shadow-black/50"
	>
		{#if $guest}
			<h1 class="text-8xl lg:text-5xl text-center mb-4 text-megan-900">RSVP</h1>
			<hr class="mb-4" />
			<h2 class="text-2xl text-center text-megan-700 mb-4">
				{$guest.firstName}
				{$guest.lastName}!
			</h2>

			{#if !hasRsvp}
				{#if !confirmed}
					<div class="min-w-[300px] mx-auto grid gap-4 text-center" style="text-wrap: balance">
						<p class="text-balance">
							Hello <span class="font-bold">{$guest.firstName} {$guest.lastName}</span>! We're
							excited to have you with us on our big day. To confirm your RSVP, please enter your
							contact number below. Your presence means the world to us!
						</p>
						{#if dev}
							<button on:click={() => navigator.clipboard.writeText($guest.phone)}
								>{$guest.phone}</button
							>
						{/if}
						<div class="grid gap-4 border border-primary bg-primary/20 rounded-md p-4">
							<Input
								label="Phone Number"
								name="phone"
								id="phone"
								type="tel"
								{errorMessage}
								bind:value={phoneNumber}
							/>
							{#if errorMessage}
								<p class="label-text text-red-600 text-left">{errorMessage}</p>
							{/if}
							<Button
								variant="primary"
								disabled={!phoneNumber}
								on:click={() => validatePhoneNumber($guest.phone)}>Confirm</Button
							>
						</div>

						<div role="alert" class="alert flex mt-4">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="stroke-current shrink-0 h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
								/></svg
							>

							<span class="text-lg">Please RSVP by {RSVPDate}</span>
						</div>
					</div>
				{:else}
					<h2 class="mb-4 text-center text-balance">You're cordially invited to join the fun</h2>
					<p class="text-megan-900 mb-4 text-center text-balance">
						We're eager to dance, celebrate, and create memories at our wedding!
					</p>
					<p class="mb-4 font-extrabold text-balance text-center">
						Let us know if you can make it by RSVPing below.
					</p>
					<div
						class="border bg-white/80 border-megan-500 rounded-lg p-4 min-w-[300px] mx-auto grid gap-4 text-center"
						style="text-wrap: balance"
					>
						<p class="font-black text-megan-600">
							Please RSVP with the number of guest that will join us to celebrate!
						</p>

						<select
							bind:this={selectElement}
							bind:value={selectedGuests}
							on:change={() => selectElement.scrollIntoView({ behavior: 'smooth' })}
							class="bg-gray-50 border border-megan-300 text-megan-900 text-sm rounded-lg block w-full p-2.5"
						>
							{#each Array.from({ length: $guest.guests.length + 2 }) as _, index}
								<option value={index}>{index}</option>
							{/each}
						</select>

						<RsvpInfo short />
						{#if selectedGuests > 0}
							<Button variant="success" on:click={rsvpYes} disabled={selectedGuests === 0}
								>RSVP YES ({selectedGuests})
							</Button>
						{:else}
							<Button variant="warning" on:click={rsvpNo} disabled={selectedGuests > 0}
								>RSVP NO</Button
							>
						{/if}
					</div>
				{/if}
			{:else}
				<div class="text-center grid gap-4">
					{#if $guest.rsvp === 'yes'}
						<h2>Congratulations</h2>
						<p class="text-4xl text-green-600">You RSVP Yes ({$guest.totalGuests}) 🎉</p>
						<RsvpInfo short />
					{:else}
						<h2>Don't worry we still love you</h2>
						<p class="text-4xl text-red-600">You RSVPed No ☹️</p>
						<p>We are so sorry you can't make it.</p>
					{/if}
				</div>

				<div class="bg-white/80 text-center grid gap-2 border border-megan-500 rounded-md p-4 mt-8">
					<h3>Need to edit your response</h3>
					<Button class="btn btn-sm btn-secondary" on:click={() => (hasRsvp = false)}
						>Click to Edit your RSVP</Button
					>
					<p class="text-xs">If you need to edit or RSVP please do so before {RSVPDate}</p>
				</div>
			{/if}
		{:else}
			<Loading />
		{/if}
	</section>
</div>
