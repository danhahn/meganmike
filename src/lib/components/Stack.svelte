<div class={$$props.class}><slot /></div>

<style lang="postcss">
	div {
		display: grid;
	}
	div > :global(*) {
		grid-column: 1;
		grid-row: 1;
	}
</style>
