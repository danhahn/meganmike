<script lang="ts">
	import Headline from '$lib/components/Headline.svelte';
	import Button from '$lib/components/forms/Button.svelte';
	import Form from '$lib/components/forms/Form.svelte';
	import Input from '$lib/components/forms/Input.svelte';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import { signUpSchema } from '$lib/schema/signUpSchema';
	import { dev } from '$app/environment';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	export let data: PageData;

	const { form, errors, enhance } = superForm(data.form, {
		validators: signUpSchema
	});
</script>

{#if dev}
	<SuperDebug data={$form} />
{/if}

<Headline>Sign Up</Headline>
<form method="post">
	<Form method="POST" size="small">
		<p class="font-bold mb-4 tracking-tight text-megan-800">
			Register to gain access to the admin section of the site
		</p>
		<Input
			id="email"
			type="email"
			label="Email Address"
			bind:value={$form.email}
			errorMessages={$errors.email}
		/>
		<Input
			id="password"
			type="password"
			label="Password"
			bind:value={$form.password}
			errorMessages={$errors.password}
		/>
		<Input
			id="confirm"
			type="password"
			label="Confirm Password"
			bind:value={$form.confirm}
			errorMessages={$errors.confirm}
		/>
		<div class="row">
			<Button width="full">Sign Up</Button>
			<Button variant="naked" on:click={() => goto('/')}>Cancel</Button>
		</div>
		<p>Already have an account <a href="/login" class="underline">Login Here</a></p>
	</Form>
</form>
