<script lang="ts">
	import Headline from '$lib/components/Headline.svelte';
	import Button from '$lib/components/forms/Button.svelte';
	import Form from '$lib/components/forms/Form.svelte';
	import Input from '$lib/components/forms/Input.svelte';
	import Section from '$lib/components/Section.svelte';
	import { authHandlers } from '$lib/stores/authStore';
	import { goto } from '$app/navigation';

	const errorMessages = {
		msg: ''
	};

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
</script>

<Section>
	<Headline>log in</Headline>

	{#if errorMessages.msg}
		<p class="text-red-600">{errorMessages.msg}</p>
	{/if}
	<Form method="POST" size="small" on:submit={handleSubmit}>
		<p>Login to Admin Section</p>
		<Input id="email" type="email" label="Email Address" required />
		<Input id="password" type="password" label="Password" required />
		<div class="row">
			<Button width="full">log in</Button>
			<Button variant="naked" type="button" on:click={() => goto('/')}>Cancel</Button>
		</div>
		<p>Don't Have an account <a href="/signup" class="underline">Sign Up</a></p>
	</Form>
</Section>
