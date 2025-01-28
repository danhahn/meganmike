<script lang="ts">
	export let size: 'sm' | 'lg' = 'lg';
	export let isBottomNav: boolean = false;
	export let itemsCount: number | undefined = 0;
	export let popovertarget: string = '';
	export let isJoined: boolean = false;

	$: buttonType = size === 'sm' ? 'btn-ghost' : '';
	$: buttonStyles = isBottomNav ? '' : `btn btn-${size} ${buttonType}`;
</script>

<div class="comment-trigger">
	<div class="indicator">
		{#if itemsCount}
			<span
				class="indicator-item p-1 badge badge-secondary font-mono"
				class:scale-50={size === 'sm'}
				><span class="text-[0.6rem]" class:hidden={size === 'sm'}>{itemsCount}</span></span
			>
		{/if}
		<button class={buttonStyles} {popovertarget} class:join-item={isJoined} on:click>
			<slot />
		</button>
	</div>
</div>
