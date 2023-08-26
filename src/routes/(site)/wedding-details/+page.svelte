<script>
	import Headline from '$lib/components/Headline.svelte';
	import Section from '$lib/components/Section.svelte';
	import Img from '$lib/components/Img.svelte';
	import { title } from '$lib/utils';
</script>

<svelte:head>
	<title>Wedding Details | {title}</title>
</svelte:head>

<Headline>Wedding Details</Headline>
<Img src="engagment/hero.jpg" alt="" size="small" gravity="faces" />

<Section>
	<p>
		Join Mike and Megan as they exchange their vows and become husband and wife at the beautiful
		Larkfield Manor. The day will be filled with love, laughter, and lots of celebration!
	</p>

	<address class="text-center">
		<p class="font-extrabold text-megan-700">Larkfield Manor</p>
		<p>507 Larkfield Rd,</p>
		<p>East Northport, NY 11731</p>
	</address>

	<iframe
		src="https://www.google.com/maps/d/embed?mid=1-IfJPHRehjiNe2x0VpPLFgWG893Ja7k&hl=en&ehbc=2E312F&noprof=1"
		title="Wedding locations"
		width="100%"
		height="450"
		loading="lazy"
		class="rounded-xl shadow-lg shadow-megan-800 lg:-mx-32 w-full lg:w-[calc(100%_+_(128px_*_2))]"
	></iframe>

	<h2>Ceremony</h2>

	<p>
		The ceremony will take place on site at Larkfield Manor at 5:30 PM. Please arrive by 5:00 PM to
		take your seat and enjoy the pre-ceremony music. We will kindly be asking guests to not have any
		phones on or being occupied during the ceremony.
	</p>

	<p>
		Following the ceremony, a reception will be held in the grand ballroom at Larkfield Manor,
		starting at 7:00 PM. There will be dinner, dancing, and lots of fun to be had by all!
	</p>

	<h2>Dress Code</h2>

	<p>
		Attire for the ceremony and reception is formal attire (suits for men and cocktail dresses or
		evening gowns for women) in any color, including black.
	</p>

	<!-- <h2>Accommodations</h2>

	<p>Hotel rooms... TBD</p> -->

	<h2>RSVP</h2>

	<p>
		Please RSVP by June 15th, 2024, to let us know if you can join us on our special day. We can't
		wait to celebrate with you!
	</p>

	<h2>Wedding Registry</h2>

	<p>
		Mike and Megan have registered at several retailers for their wedding gifts. If you would like
		to contribute to their new life together, please visit their <a
			class="text-megan-800 underline"
			href="/gift-registry">registry page</a
		> for more information.
	</p>

	<h2>Contact Us</h2>

	<p>
		For any questions or additional information, please don't hesitate to contact us at <a
			href="tel:+16315211224">631-521-1224</a
		>. We can't wait to celebrate with you!
	</p>
</Section>
