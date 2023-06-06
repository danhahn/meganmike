<script lang="ts">
	import { doc, getDoc } from 'firebase/firestore';
	import type { PageData } from './$types';
	import { db } from '$lib/firebase/firebase.client';
	import { onMount } from 'svelte';

	export let data: PageData;

	type Snapshot = {
		[val: string]: any;
	};

	let snapshot: Snapshot = {};

	async function getDocumentFromFirebase(id: string) {
		const docRef = doc(db, 'guests', id);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			snapshot = docSnap.data();
		} else {
			// docSnap.data() will be undefined in this case
			console.log('No such document!');
		}
	}

	onMount(() => {
		getDocumentFromFirebase(data.id);
	});
</script>

<pre>{JSON.stringify(snapshot, null, 2)}</pre>

<p>{snapshot.firstName} {snapshot.lastName}</p>
