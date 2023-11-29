<script lang="ts">
	import Headline from './Headline.svelte';
	import Button from './forms/Button.svelte';

	export let id: string;
	export let cancel: string | null = 'Cancel';
	export let confirm: string = 'Confirm';
	export let title: string = 'Megan and Mike';

	export let dialog: HTMLDialogElement;

	export let disabled: boolean = false;
</script>

<dialog {id} bind:this={dialog} on:close on:cancel>
	<Headline size="small" padding={false}>{title}</Headline>
	<form method="dialog" class="grid grid-rows-[1fr_auto]">
		<div class="lg:min-h-[100px] text-center border-t border-t-megan-500 py-8">
			<slot />
		</div>
		<div class="flex justify-end gap-2 border-t border-t-megan-500 pt-4">
			{#if cancel !== null}
				<Button value="cancel" formmethod="dialog" variant="secondary">{cancel}</Button>
			{/if}
			<Button
				id="confirmBtn"
				value="default"
				type="submit"
				{disabled}
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
	dialog::backdrop {
		@apply bg-black/50;
	}
</style>
