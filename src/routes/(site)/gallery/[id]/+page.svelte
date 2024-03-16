<script lang="ts">
	import { DownloadURL, StorageList, UploadTask } from 'sveltefire';
	import type { PageData } from './$types';
	import Dialog from '$lib/components/Dialog.svelte';
	import { dev } from '$app/environment';

	const imageUrl = 'https://ik.imagekit.io/hahnster';

	export let data: PageData;

	let dialog: HTMLDialogElement;
	let input: HTMLInputElement;

	let files: FileList | null = null;

	const handleFileChange = (event: Event) => {
		const input = event.target as HTMLInputElement;
		files = input.files;
		// check if files is not null
		if (files) {
			dialog.showModal();
		}
	};

	let status: 'loading' | PageData['status'] = 'loading';

	$: status = data.status;

	function handleDialogClose() {
		if (dialog.returnValue === 'success') {
			console.log('success');
			files = null;
		}
		if (dialog.returnValue === 'cancel') {
			files = null;
		}
		window.location.reload();
	}

	function rewriteUrl(url: string | null) {
		if (!url) return;

		// if (dev) {
		// 	return url;
		// }

		// https://firebasestorage.googleapis.com/v0/b/hahnster-dd647.appspot.com/o/test%2FIMG_3207.jpeg?alt=media&token=a630a006-bf52-46a7-ac9b-1f4c20907baa

		const splitString = '/o/';

		const [_, path] = url.split(splitString);

		const newUrl = imageUrl + splitString + path + '?tr=w-300,h-300';

		console.log(newUrl);

		return newUrl;
	}
</script>

<svelte:head>
	<title>Gallery | {data.id}</title>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
	/>
</svelte:head>

{#if status === 'loading'}
	<p>Loading...</p>
{:else if status === 'idle'}
	<h3 class="p-4 uppercase bg-megan-300/35 text-center text-megan-700">{data.id}</h3>

	<input
		type="file"
		multiple
		on:change={handleFileChange}
		bind:this={input}
		class="hidden invisible"
	/>

	<button
		on:click={() => {
			input.click();
		}}
		class="bg-megan-600 hover:bg-megan-800 w-14 aspect-square grid place-content-center rounded-full fixed bottom-8 lg:bottom-20 right-4"
	>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="w-8 h-8 fill-white"
			><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" /></svg
		>
	</button>

	<StorageList ref={data.id} let:list>
		{#if list === null}
			<li>Loading...</li>
		{:else if list.prefixes.length === 0 && list.items.length === 0}
			<li>Empty</li>
		{:else}
			<!-- <ul class="grid grid-cols-3 lg:grid-cols-8">
				 -->
			<ul class="grid gap-4">
				{#each list.items as item}
					<li>
						<DownloadURL ref={`${data.id}/${item.name}`} let:link let:ref>
							{@const test = rewriteUrl(link)}
							{#if test}
								{test}
							{/if}
							<!-- <a href={link} download
								><img src={test} alt="" class="aspect-square overflow-hidden object-cover" /></a
							> -->
						</DownloadURL>
					</li>
				{/each}
			</ul>
		{/if}
	</StorageList>
{:else if status === 'error'}
	<p>Invalid gallery ID</p>
{/if}

<Dialog id="addGuest" bind:dialog on:close={handleDialogClose} cancel="Cancel" confirm="Done">
	{#if files}
		<ul class="grid gap-1 overflow-scroll">
			{#each Array.from(files) as file}
				<li class="bg-megan-50 p-4">
					<UploadTask ref={`${data.id}/${file.name}`} data={file} let:progress let:snapshot>
						{#if snapshot?.state === 'running'}
							<p class="text-xs mb-2 text-left font-bold">{file.name}</p>
							<div class="flex items-center gap-4">
								<progress value={progress.toFixed(2)} max="100" class="flex-1" />
								<p class="text-lg">{progress.toFixed(2)}%</p>
							</div>
						{/if}

						{#if snapshot?.state === 'success'}
							<p class="text-xs mb-2 text-left font-bold">{file.name}</p>

							<div class="flex items-center gap-4">
								<progress value={progress.toFixed(2)} max="100" class="flex-1" />

								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 -960 960 960"
									class="w-8 h-8 fill-green-800"
									><path
										d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
									/></svg
								>
							</div>
						{/if}

						{#if snapshot?.state === 'error'}
							<p>Error: {file.name} did not upload</p>
						{/if}
					</UploadTask>
				</li>
			{/each}
		</ul>
	{/if}
</Dialog>

<style lang="postcss">
	progress[value] {
		--color: rgb(147, 31, 62); /* the progress color */
		--background: rgb(255, 255, 255); /* the background color */

		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		height: 20px;
		border: 1px solid var(--color);
		border-radius: 10em;
		background: var(--background);
	}
	progress[value]::-webkit-progress-bar {
		border-radius: 10em;
		background: var(--background);
	}
	progress[value]::-webkit-progress-value {
		border-radius: 10em;
		background: var(--color);
	}
	progress[value]::-moz-progress-bar {
		border-radius: 10em;
		background: var(--color);
	}

	button {
		box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.5);
	}

	button:active {
		translate: 1px 1px;
		box-shadow: none;
	}
</style>
