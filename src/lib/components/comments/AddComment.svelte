<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let dispatch = createEventDispatcher();
	export let comment: string = '';
	$: localComment = comment;
</script>

<div class="bg-megan-300 p-2 add-comment">
	<form on:submit|preventDefault class="flex justify-stretch items-center">
		<input
			type="text"
			class="input w-full focus:outline-none rounded-r-none"
			placeholder="Add Comment"
			bind:value={localComment}
		/>
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
