<script>
	import Section from '$lib/components/Section.svelte';
</script>

<Section>
	<slot />
</Section>

<form method="POST" action="/logout">
	<button class="bg-megan-600 text-megan-900 px-10 py-2 rounded-md">Logout</button>
</form>
