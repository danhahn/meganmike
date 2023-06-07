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

	export let data: PageData;

	type Snapshot = {
		[val: string]: any;
	};

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

<Loading {status}>
	<Headline>{snapshot.firstName} {snapshot.lastName}</Headline>
	<div
		class="max-w-lg mx-auto grid grid-cols-[64px_1fr] gap-4 items-center border-2 border-megan-800 rounded-lg p-12 bg-megan-50"
	>
		{#if snapshot.rsvp === null}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="w-16 fill-megan-500 justify-self-center"
				viewBox="0 -960 960 960"
				><path
					d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Zm0-60q142 0 241-99.5T820-480q0-142-99-241t-241-99q-141 0-240.5 99T140-480q0 141 99.5 240.5T480-140Zm0-340Z"
				/></svg
			>
			<p class="text-4xl select-none">Has not RSVPed yet</p>
		{:else if snapshot.rsvp === 'yes'}
			<svg xmlns="http://www.w3.org/2000/svg" class="w-16 fill-green-600" viewBox="0 -960 960 960"
				><path d="M378-246 154-470l43-43 181 181 384-384 43 43-427 427Z" /></svg
			>
			<p class="text-4xl">RSVPed Yes 🎉</p>
		{:else}
			<svg xmlns="http://www.w3.org/2000/svg" class="w-16 fill-red-600" viewBox="0 -960 960 960"
				><path
					d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-60q142.375 0 241.188-98.812Q820-337.625 820-480q0-60.662-21-116.831Q778-653 740-699L261-220q45 39 101.493 59.5Q418.987-140 480-140ZM221-261l478-478q-46-39-102.169-60T480-820q-142.375 0-241.188 98.812Q140-622.375 140-480q0 61.013 22 117.507Q184-306 221-261Z"
				/></svg
			>
			<p class="text-4xl">RSVPed No ☹️</p>
		{/if}
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
		{:else}
			<Button>Add Guests</Button>
		{/if}
	</div>
</Loading>
