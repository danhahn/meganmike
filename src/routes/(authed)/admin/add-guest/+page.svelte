<script lang="ts">
	import Headline from '$lib/components/Headline.svelte';
	import Section from '$lib/components/Section.svelte';
	import Button from '$lib/components/forms/Button.svelte';
	import Form from '$lib/components/forms/Form.svelte';
	import Input from '$lib/components/forms/Input.svelte';
</script>

<Headline>Add Guest</Headline>

<Form size="small">
	<p>Add a guest to the Wedding</p>
	<div class="grid grid-rows-2 lg:grid-cols-2 gap-2 lg:gap-4">
		<Input id="firstName" label="First Name" />
		<Input id="lastName" label="Last Name" />
	</div>
	<Input id="address" label="Address" />
	<Input id="address2" label="Address" required={false} />
	<div class="grid grid-rows-2 lg:grid-cols-[auto_1fr_1fr] gap-2 lg:gap-4">
		<Input id="city" label="City" class="w-56" />
		<Input id="state" label="State" class="w-auto" />
		<Input id="zipCode" type="number" maxlength={5} label="Zip Code" class="w-auto" />
	</div>
	<p>Contact Info</p>
	<Input id="email" label="Email Address" type="email" />
	<Input id="phone" label="Phone Number" type="number" />

	<p>Additional Guests</p>
	<div class="grid grid-rows-2 lg:grid-cols-2 gap-2 lg:gap-4">
		<Input id="firstName" label="First Name" required={false} />
		<Input id="lastName" label="Last Name" required={false} />
	</div>
	<div class="grid grid-rows-2 lg:grid-cols-2 gap-2 lg:gap-4">
		<Input id="firstName" label="First Name" required={false} />
		<Input id="lastName" label="Last Name" required={false} />
	</div>
	<Button>Add Guest</Button>
</Form>
