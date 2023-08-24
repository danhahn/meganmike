<script lang="ts">
	import { FirebaseApp, SignedIn, SignedOut } from 'sveltefire';
	import Background from '$lib/components/Background.svelte';
	import SideBar from '$lib/components/admin/Header.svelte';
	import { auth, firestore, storage } from '$lib/firebase/firebase';
	import { adminNav } from '$lib/stores/navigation';
	import Login from '$lib/components/Login.svelte';
	import { onMount } from 'svelte';

	const end = new Date('2024-08-15T12:17:30');
	let remainingTime = 0;
	let intervalId: any;

	const startTimer = () => {
		intervalId = setInterval(() => {
			remainingTime = end.getTime() - new Date().getTime();
			if (remainingTime <= 0) {
				clearInterval(intervalId);
			}
		}, 1000);
	};

	$: days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));

	onMount(startTimer);

	const handleAdminNavigation = () => {
		adminNav.set(true);
	};
</script>

<FirebaseApp {auth} {firestore} {storage}>
	<SignedOut let:auth>
		<Login />
	</SignedOut>

	<SignedIn let:user let:signOut>
		<Background>
			<div class="grid lg:grid-cols-[250px_1fr] min-h-full">
				<SideBar />

				<div class="grid grid-rows-[auto_1fr]">
					<div
						class="px-4 py-2 bg-megan-900 text-megan-100 grid grid-cols-[auto_auto_1fr] lg:grid-cols-[auto_1fr] gap-4 items-center"
					>
						<button class="lg:hidden" on:click={handleAdminNavigation}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="w-8 fill-megan-50"
								viewBox="0 -960 960 960"
								><path
									d="M120-240v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z"
								/></svg
							>
						</button>

						<p><span>Welcome Back</span> {user?.displayName}</p>
						<p class="justify-self-end">{days} Days <span>until the wedding</span></p>
					</div>
					<div class="p-4 sm:p-12 grid grid-rows-[auto_1fr] items-center lg:block">
						<slot />
					</div>
				</div>
			</div>
		</Background>
	</SignedIn>
</FirebaseApp>

<style lang="postcss">
	span {
		@apply hidden sm:inline-block;
	}
</style>
