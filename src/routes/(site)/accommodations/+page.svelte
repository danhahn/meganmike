<script>
	import { formatPhoneNumber, title } from '$lib/utils';
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
		src="https://www.google.com/maps/d/u/0/embed?mid=1xBmshHiZZtDKnr51EkbSbF0BmALBnSA&ehbc=2E312F&noprof=1"
		title="Wedding locations"
		class="lg:col-span-2 h-96 w-full rounded-xl shadow-lg shadow-megan-800 lg:-mx-32 lg:w-[calc(100%_+_(128px_*_2))]"
	></iframe>

	<div class="hotel grid gap-2 bg-megan-50/90 border border-megan-400 p-4 rounded-lg">
		<h2 class="mt-0 text-2xl">Homewood Suites-Holbrook</h2>
		<address>
			65 Union Ave.<br />
			Ronkonkoma, NY 11779<br />
		</address>

		<a href="tel:631-585-0080" class="flex gap-2"
			><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="w-4 fill-current"
				><path
					d="M260-40q-24 0-42-18t-18-42v-760q0-24 18-42t42-18h440q24 0 42 18t18 42v760q0 24-18 42t-42 18H260Zm0-150v90h440v-90H260Zm220.175 75q12.825 0 21.325-8.675 8.5-8.676 8.5-21.5 0-12.825-8.675-21.325-8.676-8.5-21.5-8.5-12.825 0-21.325 8.675-8.5 8.676-8.5 21.5 0 12.825 8.675 21.325 8.676 8.5 21.5 8.5ZM260-250h440v-520H260v520Zm0-580h440v-30H260v30Zm0 640v90-90Zm0-640v-30 30Z"
				/></svg
			>{formatPhoneNumber('6315850080')}</a
		>

		<Button
			rel="noreferrer"
			href="https://www.hilton.com/en/hotels/nycrohw-homewood-suites-ronkonkoma/?SEO_id=GMB-AMER-HW-NYCROHW&y_source=1_MTIzOTE2NzUtNzE1LWxvY2F0aW9uLndlYnNpdGU%3D"
			target="_blank"
			>Website <svg
				xmlns="http://www.w3.org/2000/svg"
				class="w-4 fill-current"
				viewBox="0 -960 960 960"
				><path
					d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h279v60H180v600h600v-279h60v279q0 24-18 42t-42 18H180Zm202-219-42-43 398-398H519v-60h321v321h-60v-218L382-339Z"
				/></svg
			></Button
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
		<a href="tel:631-784-1234" class="flex gap-2"
			><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="w-4 fill-current"
				><path
					d="M260-40q-24 0-42-18t-18-42v-760q0-24 18-42t42-18h440q24 0 42 18t18 42v760q0 24-18 42t-42 18H260Zm0-150v90h440v-90H260Zm220.175 75q12.825 0 21.325-8.675 8.5-8.676 8.5-21.5 0-12.825-8.675-21.325-8.676-8.5-21.5-8.5-12.825 0-21.325 8.675-8.5 8.676-8.5 21.5 0 12.825 8.675 21.325 8.676 8.5 21.5 8.5ZM260-250h440v-520H260v520Zm0-580h440v-30H260v30Zm0 640v90-90Zm0-640v-30 30Z"
				/></svg
			>{formatPhoneNumber('6317841234')}</a
		>
		<Button
			rel="noreferrer"
			href="https://www.hyatt.com/en-US/hotel/new-york/hyatt-regency-long-island/haupp?src=corp_lclb_gmb_seo_haupp"
			target="_blank"
			>Website <svg
				xmlns="http://www.w3.org/2000/svg"
				class="w-4 fill-current"
				viewBox="0 -960 960 960"
				><path
					d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h279v60H180v600h600v-279h60v279q0 24-18 42t-42 18H180Zm202-219-42-43 398-398H519v-60h321v321h-60v-218L382-339Z"
				/></svg
			></Button
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
		<a href="tel:631-738-7800" class="flex gap-2"
			><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="w-4 fill-current"
				><path
					d="M260-40q-24 0-42-18t-18-42v-760q0-24 18-42t42-18h440q24 0 42 18t18 42v760q0 24-18 42t-42 18H260Zm0-150v90h440v-90H260Zm220.175 75q12.825 0 21.325-8.675 8.5-8.676 8.5-21.5 0-12.825-8.675-21.325-8.676-8.5-21.5-8.5-12.825 0-21.325 8.675-8.5 8.676-8.5 21.5 0 12.825 8.675 21.325 8.676 8.5 21.5 8.5ZM260-250h440v-520H260v520Zm0-580h440v-30H260v30Zm0 640v90-90Zm0-640v-30 30Z"
				/></svg
			>{formatPhoneNumber('6317387800')}</a
		>
		<Button
			rel="noreferrer"
			href="https://www.hilton.com/en/hotels/ispahgi-hilton-garden-inn-islip-macarthur-airport/"
			target="_blank"
			>Website <svg
				xmlns="http://www.w3.org/2000/svg"
				class="w-4 fill-current"
				viewBox="0 -960 960 960"
				><path
					d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h279v60H180v600h600v-279h60v279q0 24-18 42t-42 18H180Zm202-219-42-43 398-398H519v-60h321v321h-60v-218L382-339Z"
				/></svg
			></Button
		>
		<ul
			class="text-sm flex gap-4 bg-megan-300/50 justify-around p-2 rounded-md shadow shadow-megan-900/30"
		>
			<li>33 min to venue</li>
			<li>10-15 min to our house</li>
		</ul>
	</div>

	<div class="hotel flex flex-col gap-2 bg-megan-50/90 border border-megan-400 p-4 rounded-lg">
		<h2 class="mt-0 text-2xl">Hampton Inn Long Island Commack</h2>
		<address class="flex-1">
			680 Commack Rd.<br />
			Commack, New York, 11725, USA<br />
		</address>
		<a href="tel:631-462-5700" class="flex gap-2"
			><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="w-4 fill-current"
				><path
					d="M260-40q-24 0-42-18t-18-42v-760q0-24 18-42t42-18h440q24 0 42 18t18 42v760q0 24-18 42t-42 18H260Zm0-150v90h440v-90H260Zm220.175 75q12.825 0 21.325-8.675 8.5-8.676 8.5-21.5 0-12.825-8.675-21.325-8.676-8.5-21.5-8.5-12.825 0-21.325 8.675-8.5 8.676-8.5 21.5 0 12.825 8.675 21.325 8.676 8.5 21.5 8.5ZM260-250h440v-520H260v520Zm0-580h440v-30H260v30Zm0 640v90-90Zm0-640v-30 30Z"
				/></svg
			>{formatPhoneNumber('6314625700')}</a
		>
		<Button
			rel="noreferrer"
			href="https://www.hilton.com/en/hotels/comnyhx-hampton-long-island-commack/"
			target="_blank"
			>Website <svg
				xmlns="http://www.w3.org/2000/svg"
				class="w-4 fill-current"
				viewBox="0 -960 960 960"
				><path
					d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h279v60H180v600h600v-279h60v279q0 24-18 42t-42 18H180Zm202-219-42-43 398-398H519v-60h321v321h-60v-218L382-339Z"
				/></svg
			></Button
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
		<a href="tel:631-423-1600" class="flex gap-2"
			><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="w-4 fill-current"
				><path
					d="M260-40q-24 0-42-18t-18-42v-760q0-24 18-42t42-18h440q24 0 42 18t18 42v760q0 24-18 42t-42 18H260Zm0-150v90h440v-90H260Zm220.175 75q12.825 0 21.325-8.675 8.5-8.676 8.5-21.5 0-12.825-8.675-21.325-8.676-8.5-21.5-8.5-12.825 0-21.325 8.675-8.5 8.676-8.5 21.5 0 12.825 8.675 21.325 8.676 8.5 21.5 8.5ZM260-250h440v-520H260v520Zm0-580h440v-30H260v30Zm0 640v90-90Zm0-640v-30 30Z"
				/></svg
			>{formatPhoneNumber('6314231600')}</a
		>
		<Button
			rel="noreferrer"
			href="https://www.marriott.com/en-us/hotels/nycml-marriott-melville-long-island/overview/"
			target="_blank"
			>Website <svg
				xmlns="http://www.w3.org/2000/svg"
				class="w-4 fill-current"
				viewBox="0 -960 960 960"
				><path
					d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h279v60H180v600h600v-279h60v279q0 24-18 42t-42 18H180Zm202-219-42-43 398-398H519v-60h321v321h-60v-218L382-339Z"
				/></svg
			></Button
		>
		<ul
			class="text-sm flex gap-4 bg-megan-300/50 justify-around p-2 rounded-md shadow shadow-megan-900/30"
		>
			<li>22 min to venue</li>
			<li>25 min to our house</li>
		</ul>
	</div>
</Section>
