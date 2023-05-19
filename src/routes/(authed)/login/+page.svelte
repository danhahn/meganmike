<script>
	import Headline from '$lib/components/Headline.svelte';
	import Button from '$lib/components/forms/Button.svelte';
	import Form from '$lib/components/forms/Form.svelte';
	import Input from '$lib/components/forms/Input.svelte';
</script>

<Headline>log in</Headline>

<Form method="POST" size="full">
	<div>
		<label for="email">Email Address</label>
		<Input id="email" type="email" />
	</div>
	<div>
		<label for="password">Password</label>
		<Input id="password" type="password" />
	</div>
	<Button>log in</Button>
</Form>
