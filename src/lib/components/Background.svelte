<section class="min-h-full grid">
	<div class="bg-white/80">
		<slot />
	</div>
</section>

<style lang="postcss">
	section {
		--s: 50px; /* control the size */
		--c1: hsl(48 27% 85% / 1);
		--c2: hsl(49 14% 52% / 1);

		--_g: #0000, #0004 5%, var(--c2) 6% 14%, var(--c1) 16% 24%, var(--c2) 26% 34%, var(--c1) 36% 44%,
			var(--c2) 46% 54%, var(--c1) 56% 64%, var(--c2) 66% 74%, var(--c1) 76% 84%, var(--c2) 86% 94%,
			#0004 95%, #0000;
		background: radial-gradient(100% 50% at 100% 0, var(--_g)),
			radial-gradient(100% 50% at 0 50%, var(--_g)),
			radial-gradient(100% 50% at 100% 100%, var(--_g));
		background-size: var(--s) calc(2 * var(--s));
	}
</style>
