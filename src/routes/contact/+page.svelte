<script>
	import Headline from '$lib/components/Headline.svelte';
	import Section from '$lib/components/Section.svelte';
	import { title } from '$lib/utils';
</script>

<svelte:head>
	<title>Content | {title}</title>
</svelte:head>

<Headline>Contact</Headline>
<Section>
	<p>
		We would love to hear from you! If you have any questions or just want to say hello, please
		don't hesitate to get in touch with us.
	</p>

	<h2>Email</h2>
	<p>Send us an email at <a href="mailto:mikeandmegan@wedding.com">mikeandmegan@wedding.com</a>.</p>

	<h2>Phone</h2>
	<p>Give us a call at (555) 555-5555.</p>

	<h2>Social Media</h2>
	<p>
		Connect with us on <a href="https://facebook.com/mikeandmegan">Facebook</a> and
		<a href="https://instagram.com/mikeandmegan">Instagram</a>!
	</p>
</Section>
