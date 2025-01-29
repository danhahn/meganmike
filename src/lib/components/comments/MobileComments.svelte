<script lang="ts">
	import { db, firestore } from '$lib/firebase/firebase';
	import { collection, orderBy, query, where } from 'firebase/firestore';
	import { collectionStore } from 'sveltefire';
	import Comment from './Comment.svelte';

	export let photoId: string;

	// create a ref to the comments with the photoId to select from firebase
	$: postsRef = collection(db, 'comments');
	$: q = query(postsRef, where('photoId', '==', photoId), orderBy('timestamp', 'asc'));

	$: comments = collectionStore(firestore, q);
</script>

{#each $comments as comment}
	<Comment comment={comment.comment} timestamp={comment.timestamp} />
{/each}
