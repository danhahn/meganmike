import { auth } from '$lib/firebase/firebase.client';
import {
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signOut,
	updateEmail,
	updatePassword,
	type User
} from 'firebase/auth';
import { writable } from 'svelte/store';

export type AuthStore = {
	isLoading: boolean;
	currentUser: User | null;
};

export const authStore = writable<AuthStore>({
	isLoading: true,
	currentUser: null
});

export const authHandlers = {
	login: async (email: string, password: string) => {
		await signInWithEmailAndPassword(auth, email, password);
	},
	signup: async (email: string, password: string) => {
		await createUserWithEmailAndPassword(auth, email, password);
	},
	logout: async () => {
		await signOut(auth);
	},
	resetPassword: async (email: string) => {
		await sendPasswordResetEmail(auth, email);
	},
	updateEmail: async (email: string) => {
		// await updateEmail(auth, email);
	},
	updatePassword: async (password: string) => {
		// await updatePassword(auth, password);
	}
};
