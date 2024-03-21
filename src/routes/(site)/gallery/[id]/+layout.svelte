<script lang="ts">
	import { FirebaseApp } from 'sveltefire';
	import { auth, firestore, storage } from '$lib/firebase/firebase';
</script>

<FirebaseApp {auth} {firestore} {storage}>
	<slot />
</FirebaseApp>
