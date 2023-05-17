<script lang="ts">
	import { nav } from '$lib/stores/navigation';
	export let href: string;
</script>

<a {href} {...$$props} on:click={() => nav.set(false)}><slot /></a>

<style lang="postcss">
	a {
		@apply block p-2 text-megan-600 uppercase relative;
	}

	a::after {
		content: '';
		@apply border-transparent absolute inset-1 transition-all ease-in-out;
		left: 0;
		width: 2px;
		transform: translateX(-5px);
	}

	a:hover::after {
		@apply bg-megan-700;
	}

	a.active::after {
		@apply bg-megan-400;
	}
</style>
