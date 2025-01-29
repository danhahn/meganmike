<script lang="ts">
	import { auth, db, firestore } from '$lib/firebase/firebase';
	import { collection, orderBy, query, where } from 'firebase/firestore';
	import { collectionStore, userStore } from 'sveltefire';
	import Comment from './Comment.svelte';

	export let photoId: string;

	const user = userStore(auth);

	// create a ref to the comments with the photoId to select from firebase
	$: postsRef = collection(db, 'comments');
	$: q = query(postsRef, where('photoId', '==', photoId), orderBy('timestamp', 'asc'));

	$: comments = collectionStore(firestore, q);
</script>

{#each $comments as comment}
	<Comment
		comment={comment.comment}
		timestamp={comment.timestamp}
		displayName={comment.displayName}
		avatar={comment.avatar}
		userId={comment.userId}
		uid={$user?.uid}
	/>
{/each}
