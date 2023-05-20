<script lang="ts">
	export let id: string;
	export let label: string;
	export let value: string = '';

	$: isActive = !!value;

	const handleFocus = () => (isActive = true);

	const handleBlur = () => {
		if (value !== '') return;
		isActive = false;
	};
</script>

<div class="relative w-96">
	<label class="transition-all absolute left-4 top-[9px]" class:isActive for={id}>{label}</label>
	<input
		{...$$props}
		{id}
		bind:value
		on:focus={handleFocus}
		on:blur={handleBlur}
		class:isActive
		class="transition-all bg-white rounded-md py-2 px-4 border-2 w-full border-gray-400 focus:outline-none focus:shadow-outline-purple focus:border-megan-500"
	/>
</div>

<style lang="postcss">
	label.isActive {
		@apply text-[10px] top-1 text-megan-800;
	}

	input.isActive {
		@apply pt-[10px] pb-[6px];
	}
</style>
