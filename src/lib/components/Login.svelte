<script>
	import { getAuth, signInWithPopup } from 'firebase/auth';
	import Headline from './Headline.svelte';
	import Button from './forms/Button.svelte';
	import { provider } from '$lib/firebase/firebase.client';
	import { goto } from '$app/navigation';
	import Background from './Background.svelte';

	const errorMessages = {
		msg: ''
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

<Background>
	<div class="min-h-full grid grid-rows-[auto_1fr] px-10">
		<Headline>log in</Headline>
		<div
			class="container max-w-md mx-auto grid place-content-center gap-4 text-center -translate-y-36"
		>
			{#if errorMessages.msg}
				<p class="text-red-600 text-center mb-4 font-black">{errorMessages.msg}</p>
			{/if}

			<p class="font-bold mb-4 tracking-tight text-megan-800 text-3xl">Login to Admin Section</p>
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
		</div>
	</div>
</Background>
