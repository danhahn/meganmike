<script lang="ts">
	import Headline from '$lib/components/Headline.svelte';
	import Section from '$lib/components/Section.svelte';
	import Button from '$lib/components/forms/Button.svelte';
	import Form from '$lib/components/forms/Form.svelte';
	import Input from '$lib/components/forms/Input.svelte';
</script>

<Headline>Update Guest</Headline>

<Form>
	<p>Add a guest to the Wedding</p>
	<div class="grid grid-rows-2 lg:grid-rows-1 lg:grid-cols-2 gap-2 lg:gap-4">
		<Input id="firstName" label="First Name" disabled />
		<Input id="lastName" label="Last Name" disabled />
	</div>
	<Input id="address" label="Address" />
	<Input id="address2" label="Address" required={false} />
	<div class="grid grid-rows-2 lg:grid-rows-1 lg:grid-cols-3 gap-2 lg:gap-4">
		<Input id="city" label="City" />
		<Input id="state" label="State" />
		<Input id="zipCode" type="number" maxlength={5} label="Zip Code" />
	</div>
	<p>Contact Info</p>
	<Input id="email" label="Email Address" type="email" value="dan@dan.com" disabled />
	<Input id="phone" label="Phone Number" type="number" disabled />

	<p>Additional Guests</p>
	<div class="grid grid-rows-2 lg:grid-rows-1 lg:grid-cols-2 gap-2 lg:gap-4">
		<Input id="firstName" label="First Name" required={false} />
		<Input id="lastName" label="Last Name" required={false} />
	</div>
	<div class="grid grid-rows-2 lg:grid-rows-1 lg:grid-cols-2 gap-2 lg:gap-4">
		<Input id="firstName" label="First Name" required={false} />
		<Input id="lastName" label="Last Name" required={false} />
	</div>
	<Button>Add Guest</Button>
</Form>
