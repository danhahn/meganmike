<script lang="ts">
	import Headline from './Headline.svelte';
	import Button from './forms/Button.svelte';

	export let id: string;
	export let cancel: string = 'Cancel';
	export let confirm: string = 'Confirm';

	export let dialog: HTMLDialogElement;
</script>

<dialog {id} bind:this={dialog} on:close on:cancel>
	<Headline size="small" padding={false}>Megan and Mike</Headline>
	<form class="grid grid-rows-[1fr_auto]">
		<div class="lg:min-h-[100px] text-center border-t border-t-megan-500 py-8">
			<slot />
		</div>
		<div class="flex justify-end gap-2 border-t border-t-megan-500 pt-4">
			<Button value="cancel" formmethod="dialog" variant="secondary">{cancel}</Button>
			<Button
				id="confirmBtn"
				value="default"
				type="submit"
				on:click={() => {
					dialog.close('success');
				}}>{confirm}</Button
			>
		</div>
	</form>
</dialog>

<style lang="postcss">
	dialog {
		@apply rounded-xl shadow-xl shadow-megan-900/50 lg:min-w-[50%] p-4 border-4 border-megan-600;
	}
	dialog:backdrop {
		@apply bg-black/20;
	}
</style>
