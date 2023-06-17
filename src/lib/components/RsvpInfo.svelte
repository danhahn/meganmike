<script lang="ts">
	export let short: boolean = false;
</script>

<div class="text-center grid gap-4 max-w-md mx-auto">
	{#if !short}
		<p class="text-megan-900">
			We can't wait to dance, celebrate, and create amazing memories at our wedding! You're
			cordially invited to join the fun. Let us know if you can make it by RSVPing below.
		</p>
	{/if}

	<ul class="text-megan-900">
		<li><span>Date</span> <date>August 15, 2024</date></li>
		<li><span>Time</span>5:00 PM - 11:00 PM</li>
		<li><span>Venue</span>Larkfield Manor</li>
		<li class="mt-4">
			<span>Address</span>
			<address>507 Larkfield Rd East <br class="lg:inline" />Northport, NY 11731</address>
		</li>
	</ul>
</div>

<style lang="postcss">
	span {
		@apply block text-megan-600 uppercase text-xl;
	}
</style>
