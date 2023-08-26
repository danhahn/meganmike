// Import the functions you need from the SDKs you need
import { dev } from '$app/environment';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
	apiKey: import.meta.env.VITE_APIKEY,
	authDomain: import.meta.env.VITE_AUTHDOMAIN,
	projectId: import.meta.env.VITE_PROJECTID,
	storageBucket: import.meta.env.VITE_STORAGEBUCKET,
	messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
	appId: import.meta.env.VITE_APPID,
	measurementId: import.meta.env.VITE_MEASUREMENTID
};

export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);


export const provider = new GoogleAuthProvider();

if (dev) {
	connectAuthEmulator(auth, 'http://localhost:9099');
	connectFirestoreEmulator(db, 'localhost', 8080);
}
