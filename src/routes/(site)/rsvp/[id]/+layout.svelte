<script lang="ts">
	import { firestore, auth, storage } from '$lib/firebase/firebase';
	import { FirebaseApp } from 'sveltefire';
</script>

<FirebaseApp {firestore} {auth} {storage}>
	<slot />
</FirebaseApp>
