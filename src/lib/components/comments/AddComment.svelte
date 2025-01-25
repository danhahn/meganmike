<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let dispatch = createEventDispatcher();
	export let comment: string = '';
	$: localComment = comment;
</script>

<div class="bg-megan-300 p-2 add-comment">
	<form on:submit|preventDefault class="flex justify-stretch items-center">
		<label class="input input-bordered flex items-center gap-2 w-full">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="w-6 h-6 fill-current"
				><path
					d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z"
				/></svg
			>
			<input
				type="text"
				class="grow focus:outline-none rounded-r-none"
				placeholder="Add A Comment"
				bind:value={localComment}
			/>
		</label>
		<button
			class="btn btn-primary bg-megan-500 border-megan-700 text-white rounded-l-none"
			type="submit"
			on:click={() => dispatch('add-comment', localComment)}
		>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="w-6 h-6 fill-current"
				><path
					d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z"
				/></svg
			>
		</button>
	</form>
</div>
