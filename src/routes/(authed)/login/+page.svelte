<script lang="ts">
	import Headline from '$lib/components/Headline.svelte';
	import Button from '$lib/components/forms/Button.svelte';
	import Form from '$lib/components/forms/Form.svelte';
	import Input from '$lib/components/forms/Input.svelte';
	import { authHandlers } from '$lib/stores/authStore';
	import { goto } from '$app/navigation';
	import { getAuth, signInWithPopup } from 'firebase/auth';
	import { provider } from '$lib/firebase/firebase';

	const errorMessages = {
		msg: ''
	};

	let showOldLogin = false;

	const handleSubmit = async (event: any) => {
		const email = event.target?.email.value;
		const password = event.target?.password.value;

		try {
			await authHandlers.login(email, password);
			goto('/admin');
		} catch (error) {
			errorMessages.msg = error as string;
		}
	};

	const auth = getAuth();
	async function signInWithGoogle() {
		try {
			// Sign in with Google
			await signInWithPopup(auth, provider);
			goto('/admin');
		} catch (error) {
			// Handle error
			errorMessages.msg = 'There was an error trying to login';
		}
	}
</script>
