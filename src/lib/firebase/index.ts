import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from './firebase';

export async function functionSignInWithGoogle() {
	await signInWithPopup(auth, provider);
}
