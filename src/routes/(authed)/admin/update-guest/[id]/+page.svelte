<script lang="ts">
	import Headline from '$lib/components/Headline.svelte';
	import Button from '$lib/components/forms/Button.svelte';
	import Form from '$lib/components/forms/Form.svelte';
	import Input from '$lib/components/forms/Input.svelte';
	import { db } from '$lib/firebase/firebase.client';
	import type { LoadingProps } from '$lib/types';
	import { doc, getDoc } from 'firebase/firestore';
	import { onMount } from 'svelte';
	import type { PageData } from '../$types';
	import Loading from '$lib/components/Loading.svelte';
	export let data: PageData;

	type Snapshot = {
		[val: string]: any;
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

	let status: LoadingProps = 'loading';

	let snapshot: Snapshot = {};

	async function getDocumentFromFirebase(id: string) {
		const docRef = doc(db, 'guests', id);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			snapshot = docSnap.data();
			status = 'idle';
		} else {
			console.log('No such document!');
			status = 'error';
		}
	}

	onMount(() => {
		getDocumentFromFirebase(data.id);
	});
</script>

<Headline>Update Guest</Headline>

<Loading {status}>
	<Form>
		<p>Update Wedding guest</p>
		<div class="grid grid-rows-2 lg:grid-rows-1 lg:grid-cols-2 gap-2 lg:gap-3">
			<Input
				id="firstName"
				label="First Name"
				bind:value={firstName}
				required
				disabled={status === 'loading'}
			/>
			<Input
				id="lastName"
				label="Last Name"
				bind:value={lastName}
				required
				disabled={status === 'loading'}
			/>
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

		<Button disabled={status !== 'idle'} type="submit">Add Guest</Button>
	</Form>
</Loading>
