<script lang="ts">
	export let id: string;
	export let label: string;
	export let value: string = '';
	export let required: boolean = false;
	export let errorMessage: string = '';

	$: isActive = !!value;

	const handleFocus = () => (isActive = true);

	const handleBlur = () => {
		if (value !== '') return;
		isActive = false;
	};
</script>

<div class={`relative w-full ${$$props.class}`}>
	<label class="transition-all absolute left-4 top-[13px]" class:isActive for={id}
		>{label}
		{#if required}
			<span class="text-red-600">*</span>
		{/if}
	</label>
	<input
		{...$$props}
		{id}
		name={id}
		bind:value
		on:focus={handleFocus}
		on:blur={handleBlur}
		{required}
		class:errorMessage
		class:isActive
		class="bg-white rounded-md py-3 px-4 border-2 w-full border-gray-400 focus:outline-none focus:border-megan-500"
	/>
	{#if errorMessage}
		<p class="text-red-700">{errorMessage}</p>
	{/if}
</div>

<style lang="postcss">
	label.isActive {
		@apply text-[10px] top-1 text-megan-800;
	}

	input.isActive {
		@apply pt-[18px] pb-[6px];
	}

	input.errorMessage {
		@apply border-red-700;
	}
</style>
