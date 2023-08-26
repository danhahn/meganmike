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

<Section class="lg:grid-cols-2">
	<iframe
		src="https://www.google.com/maps/d/embed?mid=1xBmshHiZZtDKnr51EkbSbF0BmALBnSA&hl=en&ehbc=2E312F"
		title="Wedding locations"
		class="lg:col-span-2 h-96 w-full"
	></iframe>

	<div class="hotel grid gap-2 bg-megan-50/90 border border-megan-400 p-4 rounded-lg">
		<h2 class="mt-0 text-2xl">Homewood Suites-Holbrook</h2>
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
		<ul
			class="text-sm flex gap-4 bg-megan-300/50 justify-around p-2 rounded-md shadow shadow-megan-900/30"
		>
			<li>42 min to venue</li>
			<li>7 min to our house</li>
		</ul>
	</div>

	<div class="hotel grid gap-2 bg-megan-50/90 border border-megan-400 p-4 rounded-lg">
		<h2 class="mt-0 text-2xl">Hyatt Regency Long Island</h2>
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
		<ul
			class="text-sm flex gap-4 bg-megan-300/50 justify-around p-2 rounded-md shadow shadow-megan-900/30"
		>
			<li>30 min to venue</li>
			<li>10 min to our house</li>
		</ul>
	</div>

	<div class="hotel grid gap-2 bg-megan-50/90 border border-megan-400 p-4 rounded-lg">
		<h2 class="mt-0 text-2xl">Hilton Garden Inn/Islip MacArthur Airport</h2>
		<address>
			3485 Veterans Memorial Highway<br />
			Ronkonkoma, New York, 11779, USA<br />
		</address>
		<a href="tel:+1 631-738-7800">+1 631-738-7800</a>
		<Button
			rel="noreferrer"
			href="https://www.hilton.com/en/hotels/ispahgi-hilton-garden-inn-islip-macarthur-airport/"
			target="_blank">Website</Button
		>
		<ul
			class="text-sm flex gap-4 bg-megan-300/50 justify-around p-2 rounded-md shadow shadow-megan-900/30"
		>
			<li>33 min to venue</li>
			<li>10-15 min to our house</li>
		</ul>
	</div>

	<div class="hotel grid gap-2 bg-megan-50/90 border border-megan-400 p-4 rounded-lg">
		<h2 class="mt-0 text-2xl">Hampton Inn Long Island Commack</h2>
		<address>
			680 Commack Rd.<br />
			Commack, New York, 11725, USA<br />
		</address>
		<a href="tel:+1 631-462-5700">+1 631-462-5700</a>
		<Button
			rel="noreferrer"
			href="https://www.hilton.com/en/hotels/comnyhx-hampton-long-island-commack/"
			target="_blank">Website</Button
		>
		<ul
			class="text-sm flex gap-4 bg-megan-300/50 justify-around p-2 rounded-md shadow shadow-megan-900/30"
		>
			<li>16 min to the venue</li>
			<li>30 min to our house</li>
		</ul>
	</div>

	<div class="hotel grid gap-2 bg-megan-50/90 border border-megan-400 p-4 rounded-lg">
		<h2 class="mt-0 text-2xl">Marriot Melville Long Island</h2>
		<address>
			1350 Walt Whitman Rd,<br />
			Melville, NY 11747<br />
		</address>
		<a href="tel:+1 631-423-1600">+1 631-423-1600</a>
		<Button
			rel="noreferrer"
			href="https://www.marriott.com/en-us/hotels/nycml-marriott-melville-long-island/overview/"
			target="_blank">Website</Button
		>
		<ul
			class="text-sm flex gap-4 bg-megan-300/50 justify-around p-2 rounded-md shadow shadow-megan-900/30"
		>
			<li>22 min to venue</li>
			<li>25 min to our house</li>
		</ul>
	</div>
</Section>
