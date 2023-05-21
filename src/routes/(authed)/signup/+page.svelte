<script lang="ts">
	import Headline from '$lib/components/Headline.svelte';
	import Button from '$lib/components/forms/Button.svelte';
	import Form from '$lib/components/forms/Form.svelte';
	import Input from '$lib/components/forms/Input.svelte';
	import Section from '$lib/components/Section.svelte';
	import { authHandlers } from '$lib/stores/authStore';
	import { goto } from '$app/navigation';

	const errorMessages = {
		name: '',
		email: '',
		password: '',
		confirm: '',
		msg: ''
	};

	const handleSubmit = async (event: any) => {
		const firstName = event.target?.name.value;
		const email = event.target?.email.value;
		const password = event.target?.password.value;
		const confirm = event.target?.confirm.value;

		if (password !== confirm) {
			errorMessages.confirm = 'Please ensure your password match';
			errorMessages.password = 'Please ensure your password match';
			return;
		}

		try {
			await authHandlers.signup(email, password);
			goto('/admin');
		} catch (error) {
			errorMessages.msg = error as string;
		}
	};
</script>

<Section>
	<Headline>Sign Up</Headline>

	{#if errorMessages.msg}
		<p class="text-red-600">{errorMessages.msg}</p>
	{/if}

	<Form method="POST" size="small" on:submit={handleSubmit}>
		<p>Register to gain access to the admin section of the site</p>
		<Input id="name" type="text" label="Full Name" errorMessages={errorMessages.name} />
		<Input id="email" type="email" label="Email Address" errorMessage={errorMessages.email} />
		<Input id="password" type="password" label="Password" errorMessage={errorMessages.password} />
		<Input
			id="confirm"
			type="password"
			label="confirm password"
			errorMessage={errorMessages.confirm}
		/>
		<Button>Sign Up</Button>
		<p>Already have an account <a href="/login" class="underline">Login Here</a></p>
	</Form>
</Section>
