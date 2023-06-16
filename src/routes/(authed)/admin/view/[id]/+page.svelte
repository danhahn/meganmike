<script lang="ts">
	import { doc, getDoc } from 'firebase/firestore';
	import type { PageData } from './$types';
	import { db } from '$lib/firebase/firebase.client';
	import { onMount } from 'svelte';
	import Headline from '$lib/components/Headline.svelte';
	import { formatPhoneNumber } from '$lib/utils';
	import Button from '$lib/components/forms/Button.svelte';
	import type { LoadingProps } from '$lib/types';
	import Loading from '$lib/components/Loading.svelte';
	import { goto } from '$app/navigation';
	import Rsvp from '$lib/components/Rsvp.svelte';

	export let data: PageData;

	type Snapshot = {
		[val: string]: any;
	};

	const qrSize = 300;

	var url = new URL(window.location.href);
	var baseUrl = url.origin;

	let snapshot: Snapshot = {};

	let status: LoadingProps = 'loading';

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

<a href="/admin" class="flex gap-1">
	<svg xmlns="http://www.w3.org/2000/svg" class="w-4 fill-megan-900" viewBox="0 96 960 960"
		><path d="M655 976 255 576l400-400 56 57-343 343 343 343-56 57Z" /></svg
	>
	<span class="text-megan-900">Back to View All Guests</span></a
>
<Headline>{snapshot.firstName} {snapshot.lastName}</Headline>

<Loading {status}>
	<div
		class="max-w-lg mx-auto grid grid-cols-[64px_1fr] gap-4 items-center border-2 border-megan-800 rounded-lg p-12 bg-megan-50"
	>
		<Rsvp rsvp={snapshot.rsvp} size="large" row />

		<div class="col-span-2 flex flex-col gap-4">
			<img
				alt=""
				src={`https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${baseUrl}/rsvp/${snapshot.phone}`}
			/>
			<a href={`${baseUrl}/rsvp/${snapshot.phone}`}>{baseUrl}/rsvp/{snapshot.phone}</a>
		</div>

		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="w-8 fill-megan-900 justify-self-center"
			viewBox="0 -960 960 960"
			><path
				d="M562-524h268v-186H562v186Zm135-37-105-79v-40l104 79 104-79v40l-103 79ZM60-120q-24 0-42-18T0-180v-600q0-24 18-42t42-18h840q24 0 42 18t18 42v600q0 24-18 42t-42 18H60Zm531-60h309v-600H60v600h7q44-69 112.5-109T329-329q81 0 149.5 40T591-180ZM329-400q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM143-180h372q-35.606-42.275-84.303-65.637Q382-269 329-269t-101.5 23.5Q179-222 143-180Zm186-280q-25.5 0-42.75-17.25T269-520q0-25.5 17.25-42.75T329-580q25.5 0 42.75 17.25T389-520q0 25.5-17.25 42.75T329-460Zm151-20Z"
			/></svg
		>
		<address>
			<p>{snapshot.address}</p>
			{#if snapshot.address2}
				<p>{snapshot.address2}</p>
			{/if}
			<p>{snapshot.city} {snapshot.state} {snapshot.zipCode}</p>
		</address>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="w-8 fill-megan-900 justify-self-center"
			viewBox="0 -960 960 960"
			><path
				d="M140-160q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18H140Zm340-302L140-685v465h680v-465L480-462Zm0-60 336-218H145l335 218ZM140-685v-55 520-465Z"
			/></svg
		>
		<a href={`mailto:${snapshot.email}`}>{snapshot.email}</a>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="w-8 fill-megan-900 justify-self-center"
			viewBox="0 -960 960 960"
			><path
				d="M260-40q-24 0-42-18t-18-42v-760q0-24 18-42t42-18h440q24 0 42 18t18 42v760q0 24-18 42t-42 18H260Zm0-150v90h440v-90H260Zm220.175 75q12.825 0 21.325-8.675 8.5-8.676 8.5-21.5 0-12.825-8.675-21.325-8.676-8.5-21.5-8.5-12.825 0-21.325 8.675-8.5 8.676-8.5 21.5 0 12.825 8.675 21.325 8.676 8.5 21.5 8.5ZM260-250h440v-520H260v520Zm0-580h440v-30H260v30Zm0 640v90-90Zm0-640v-30 30Z"
			/></svg
		>
		<a href={`tel:+1${snapshot.phone}`}>{formatPhoneNumber(snapshot.phone)}</a>
		{#if snapshot?.guests?.length}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="w-8 fill-megan-900 justify-self-center"
				viewBox="0 -960 960 960"
				><path
					d="M38-160v-94q0-35 18-63.5t50-42.5q73-32 131.5-46T358-420q62 0 120 14t131 46q32 14 50.5 42.5T678-254v94H38Zm700 0v-94q0-63-32-103.5T622-423q69 8 130 23.5t99 35.5q33 19 52 47t19 63v94H738ZM358-481q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42Zm360-150q0 66-42 108t-108 42q-11 0-24.5-1.5T519-488q24-25 36.5-61.5T568-631q0-45-12.5-79.5T519-774q11-3 24.5-5t24.5-2q66 0 108 42t42 108ZM98-220h520v-34q0-16-9.5-31T585-306q-72-32-121-43t-106-11q-57 0-106.5 11T130-306q-14 6-23 21t-9 31v34Zm260-321q39 0 64.5-25.5T448-631q0-39-25.5-64.5T358-721q-39 0-64.5 25.5T268-631q0 39 25.5 64.5T358-541Zm0 321Zm0-411Z"
				/></svg
			>
			<div>
				<ul>
					{#each snapshot.guests as guest}
						<li>{guest.firstName} {guest.lastName}</li>
					{/each}
				</ul>
			</div>
		{/if}
		<div />
	</div>
	<div class="mt-11 flex justify-center">
		<Button
			size="small"
			variant="secondary"
			on:click={() => goto(`/admin/update-guest/${data.id}`)}
			class="flex gap-2"
		>
			<svg xmlns="http://www.w3.org/2000/svg" class="w-4 fill-current" viewBox="0 -960 960 960"
				><path
					d="M180-180h44l443-443-44-44-443 443v44Zm614-486L666-794l42-42q17-17 42-17t42 17l44 44q17 17 17 42t-17 42l-42 42Zm-42 42L248-120H120v-128l504-504 128 128Zm-107-21-22-22 44 44-22-22Z"
				/></svg
			>
			Edit</Button
		>
	</div>
</Loading>
