<script lang="ts">
	import Headline from '$lib/components/Headline.svelte';
	import Button from '$lib/components/forms/Button.svelte';
	import Form from '$lib/components/forms/Form.svelte';
	import Input from '$lib/components/forms/Input.svelte';
	import { authHandlers } from '$lib/stores/authStore';
	import { goto } from '$app/navigation';
	import { getAuth, signInWithPopup } from 'firebase/auth';
	import { provider } from '$lib/firebase/firebase.client';

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

<Headline>log in</Headline>

{#if errorMessages.msg}
	<p class="text-red-600 text-center mb-4 font-black">{errorMessages.msg}</p>
{/if}
<Form method="POST" size="small" on:submit={handleSubmit}>
	<p class="font-bold mb-4 tracking-tight text-megan-800">Login to Admin Section</p>
	<p>Log in with your Google account for a more secure and seamless experience.</p>

	<Button type="button" variant="light" on:click={signInWithGoogle}>
		<div class="flex justify-center gap-4">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				viewBox="0 0 32 32"
				class="w-7"
				><defs
					><path
						id="A"
						d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
					/></defs
				><clipPath id="B"><use xlink:href="#A" /></clipPath><g
					transform="matrix(.727273 0 0 .727273 -.954545 -1.45455)"
					><path d="M0 37V11l17 13z" clip-path="url(#B)" fill="#fbbc05" /><path
						d="M0 11l17 13 7-6.1L48 14V0H0z"
						clip-path="url(#B)"
						fill="#ea4335"
					/><path d="M0 37l30-23 7.9 1L48 0v48H0z" clip-path="url(#B)" fill="#34a853" /><path
						d="M48 48L17 24l-4-3 35-10z"
						clip-path="url(#B)"
						fill="#4285f4"
					/></g
				></svg
			>
			<p class="grid place-content-center">Sign in with Google</p>
		</div>
	</Button>
	<Button variant="naked" size="small" class="mt-12" on:click={() => (showOldLogin = !showOldLogin)}
		>Login in with email and password</Button
	>
	{#if showOldLogin}
		<Input id="email" type="email" label="Email Address" required />
		<Input id="password" type="password" label="Password" required />
		<div class="row">
			<Button width="full">log in</Button>
			<Button variant="naked" type="button" on:click={() => goto('/')}>Cancel</Button>
		</div>
		<p>Don't Have an account <a href="/signup" class="underline">Sign Up</a></p>
	{/if}
</Form>
