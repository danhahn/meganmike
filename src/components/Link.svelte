<script lang="ts">
	import { nav } from '../stores/navigation';
	export let href: string;
</script>

<a {href} on:click={() => nav.set(false)}><slot /></a>

<style lang="postcss">
	a {
		@apply block p-2 text-megan-600 uppercase;
	}
</style>
