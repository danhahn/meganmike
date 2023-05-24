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
<Img src="flowers-ring.jpg" alt="" size="small" />

<Section>
	<p>
		Join Mike and Megan as they exchange their vows and become husband and wife on the beautiful
		beach at Sunset Cove Resort. The day will be filled with love, laughter, and lots of
		celebration!
	</p>

	<h2>Ceremony</h2>
	<p>
		The ceremony will take place on the beach at Sunset Cove Resort on August 20, 2023, at 5 PM.
		Please arrive by 4:30 PM to take your seat and enjoy the pre-ceremony music.
	</p>

	<h2>Reception</h2>
	<p>
		Following the ceremony, a reception will be held in the grand ballroom at Sunset Cove Resort,
		starting at 6:30 PM. There will be dinner, dancing, and lots of fun to be had by all!
	</p>

	<h2>Dress Code</h2>
	<p>
		Attire for the ceremony and reception is beach formal. We recommend light and airy summer styles
		for the ladies and linen or cotton suits for the gentlemen.
	</p>

	<h2>Accommodations</h2>
	<p>
		Sunset Cove Resort is offering a special room rate for wedding guests. Please contact the resort
		directly to book your stay.
	</p>

	<h2>RSVP</h2>
	<p>
		Please RSVP by June 1, 2023, to let us know if you can join us on our special day. We can't wait
		to celebrate with you!
	</p>

	<h2>Wedding Registry</h2>
	<p>
		Mike and Megan have registered at several retailers for their wedding gifts. If you would like
		to contribute to their new life together, please visit their registry page for more information.
	</p>

	<h2>Contact Us</h2>
	<p>
		For any questions or additional information, please don't hesitate to contact us at [contact
		email or phone number]. We can't wait to celebrate with you!
	</p>

	<p class="text-sm text-gray-400">
		NOTE: this is not there real story I had chap GPT write it as filler
	</p>
</Section>
