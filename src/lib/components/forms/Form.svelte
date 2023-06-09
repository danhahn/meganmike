<script lang="ts">
	export let size: 'full' | 'small' = 'full';
	export let centered: boolean = true;

	const sizeClass = size === 'full' ? 'w-full lg:w-[80%]' : 'w-[80%] md:w-[50%] lg:max-w-[30%]';
	const centeredClass = centered ? 'mx-auto' : '';
</script>

<form
	{...$$props}
	class={`flex flex-col gap-2 sm:gap-3 text-center lg:text-start mb-32 md:mb-64 lg:mb-0 ${sizeClass} ${centeredClass}`}
	on:submit|preventDefault
>
	<slot />
</form>
