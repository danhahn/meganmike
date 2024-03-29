<script lang="ts">
	export let toggleLike: (id: string) => void;
	export let userLikes: string[];
	export let id: string;
	export let likes: number;
</script>

<button
	class={`col-start-1 relative row-start-1 self-end justify-self-end bg-white/50 text-megan-600 p-[2px] lg:p-1 rounded-full m-2 flex items-center gap-1 ${
		likes ? 'mr-4' : ''
	}`}
	on:click={() => toggleLike(id)}
>
	{#if userLikes.includes(id)}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 -960 960 960"
			class="w-3 lg:w-4 h-3 lg:h-4 fill-current translate-y-[1px] scale-90 lg:scale-100"
			><path
				d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z"
			/></svg
		>
	{:else}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 -960 960 960"
			class="w-3 lg:w-4 h-3 lg:h-4 fill-black translate-y-[1px] scale-90 lg:scale-100"
			><path
				d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"
			/></svg
		>
	{/if}
	{#if likes}
		<p
			class="absolute scale-75 lg:scale-95 -top-2 -right-2 bg-megan-600 text-white p-[1px] rounded-full leading-none text-xs aspect-square w-4"
		>
			{likes}
		</p>
	{/if}
</button>
