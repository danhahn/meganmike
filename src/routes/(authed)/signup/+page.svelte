<script>
	import Headline from '$lib/components/Headline.svelte';
	import Button from '$lib/components/forms/Button.svelte';
	import Form from '$lib/components/forms/Form.svelte';
	import Input from '$lib/components/forms/Input.svelte';
	import Section from '$lib/components/Section.svelte';
</script>

<Section>
	<Headline>Sign Up</Headline>

	<Form method="POST" size="small">
		<Input id="email" type="email" label="Email Address" />
		<Input id="password" type="password" label="Password" />
		<Input id="confirm" type="password" label="confirm password" />
		<Button>Sign Up</Button>
	</Form>
</Section>
