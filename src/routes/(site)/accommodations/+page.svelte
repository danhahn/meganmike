<script>
	import { title } from '$lib/utils';
	import Headline from '$lib/components/Headline.svelte';
	import Section from '$lib/components/Section.svelte';
	import Button from '$lib/components/forms/Button.svelte';
</script>

<svelte:head>
	<title>Accommodations| {title}</title>
</svelte:head>

<Headline>Accommodations</Headline>

<Section>
	<div class="hotel grid gap-2">
		<h2>Homewood Suites-Holbrook</h2>
		<ul
			class="flex gap-4 my-4 bg-megan-50/50 justify-around p-2 rounded-md shadow shadow-megan-900/30"
		>
			<li>42 min to venue</li>
			<li>7 min to our house</li>
		</ul>
		<address>
			65 Union Ave.<br />
			Ronkonkoma, NY 11779<br />
		</address>

		<a href="tel:631-585-0080">631-585-0080</a>

		<Button
			rel="noreferrer"
			href="https://www.hilton.com/en/hotels/nycrohw-homewood-suites-ronkonkoma/?SEO_id=GMB-AMER-HW-NYCROHW&y_source=1_MTIzOTE2NzUtNzE1LWxvY2F0aW9uLndlYnNpdGU%3D"
			target="_blank">Website</Button
		>
	</div>

	<div class="hotel grid gap-2">
		<h2>Hyatt Regency Long Island</h2>
		<ul
			class="flex gap-4 my-4 bg-megan-50/50 justify-around p-2 rounded-md shadow shadow-megan-900/30"
		>
			<li>30 min to venue</li>
			<li>10 min to our house</li>
		</ul>
		<address>
			1717 Motor Parkway<br />
			Hauppauge, NY 11788<br />
		</address>
		<a href="tel:631-784-1234">631-784-1234</a>
		<Button
			rel="noreferrer"
			href="https://www.hyatt.com/en-US/hotel/new-york/hyatt-regency-long-island/haupp?src=corp_lclb_gmb_seo_haupp"
			target="_blank">Website</Button
		>
	</div>

	<div class="hotel grid gap-2">
		<h2>Hilton Garden Inn/Islip MacArthur Airport</h2>
		<ul
			class="flex gap-4 my-4 bg-megan-50/50 justify-around p-2 rounded-md shadow shadow-megan-900/30"
		>
			<li>33 min to venue</li>
			<li>10-15 min to our house</li>
		</ul>
		<address>
			3485 Veterans Memorial Highway<br />
			Ronkonkoma, New York, 11779, USA<br />
		</address>
		<a href="tel:+1 631-738-7800">+1 631-738-7800</a>
	</div>

	<div class="hotel grid gap-2">
		<h2>Hampton Inn Long Island Commack</h2>
		<ul
			class="flex gap-4 my-4 bg-megan-50/50 justify-around p-2 rounded-md shadow shadow-megan-900/30"
		>
			<li>16 min to the venue</li>
			<li>30 min to our house</li>
		</ul>
		<address>
			680 Commack Rd.<br />
			Commack, New York, 11725, USA<br />
		</address>
		<a href="tel:+1 631-462-5700">+1 631-462-5700</a>
	</div>

	<div class="hotel grid gap-2">
		<h2>Marriot Melville Long Island</h2>
		<ul
			class="flex gap-4 my-4 bg-megan-50/50 justify-around p-2 rounded-md shadow shadow-megan-900/30"
		>
			<li>22 min to venue</li>
			<li>25 min to our house</li>
		</ul>
		<address>
			1350 Walt Whitman Rd,<br />
			Melville, NY 11747<br />
		</address>
		<a href="tel:+1 631-423-1600">+1 631-423-1600</a>
	</div>
</Section>
