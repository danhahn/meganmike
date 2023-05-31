<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import type { PageData } from './$types';
	import Headline from '$lib/components/Headline.svelte';
	import Button from '$lib/components/forms/Button.svelte';
	import Form from '$lib/components/forms/Form.svelte';
	import Input from '$lib/components/forms/Input.svelte';
	import { goto } from '$app/navigation';
	import { dev } from '$app/environment';

	export let data: PageData;

	const { form } = superForm(data.form);
</script>

{#if dev}
	<SuperDebug data={$form} />
{/if}

<Headline>log in</Headline>
<form method="POST">
	<Form size="small">
		<p class="font-bold mb-4 tracking-tight text-megan-800">Login to Admin Section</p>
		<Input id="email" type="email" label="Email Address" bind:value={$form.email} />
		<Input id="password" type="password" label="Password" bind:value={$form.password} />
		<div class="row">
			<Button width="full">log in</Button>
			<Button variant="naked" type="button" on:click={() => goto('/')}>Cancel</Button>
		</div>
		<p>Don't Have an account <a href="/signup" class="underline">Sign Up</a></p>
	</Form>
</form>
