<script>
	import { FirebaseApp } from 'sveltefire';
	import { initializeApp } from 'firebase/app';
	import { getFirestore } from 'firebase/firestore';
	import { getAuth } from 'firebase/auth';
	import { auth, firestore, storage } from '$lib/firebase/firebase';
</script>

<FirebaseApp {auth} {firestore} {storage}>
	<slot />
</FirebaseApp>
