import {
	addDoc,
	arrayUnion,
	collection,
	deleteDoc,
	doc,
	increment,
	setDoc,
	Timestamp
} from 'firebase/firestore';
import { db } from './firebase/firebase';
import { dev } from '$app/environment';
import { goto } from '$app/navigation';
import { userId, userLikes } from './stores/user';
import type { SortField } from './stores/sortStore';
import type { Comment } from './types';

export const title = '❤️ Megan and Mike 2024 ❤️';
const imageUrl = 'https://ik.imagekit.io/hahnster';

export const breakpoint = 1024;

export function getNextValue(currentValue: number, direction: 'prev' | 'next') {
	let nextValue = direction === 'next' ? currentValue + 1 : currentValue - 1;

	if (nextValue > 6) {
		nextValue = 6;
	} else if (nextValue === 0) {
		nextValue = 1;
	}

	return nextValue;
}

type FormData = {
	[name: string]: string;
};

export function getFormData(event: Event) {
	const target = event.target as HTMLFormElement;
	const formData: FormData = {};
	const guestsArray: FormData[] = [];

	Array.from(target.elements).forEach((element) => {
		if (element instanceof HTMLInputElement) {
			if (element.name.includes('guest')) {
				guestsArray.push({ [element.name]: element.value });
			} else {
				formData[element.name] = element.value;
			}
		}
	});

	const guests = convertArrayToObject(guestsArray);

	return { ...formData, guests };
}

export async function deleteGuest(id: string | undefined) {
	if (id === undefined) return;
	await deleteDoc(doc(db, 'guests', id));
}

interface Guest {
	firstName: string;
	lastName: string;
	[key: string]: string;
}

function convertArrayToObject(arr: object[]): Guest[] {
	const result: Guest[] = [];

	let currentIndex = 1;
	let guestObj: Guest = {
		firstName: '',
		lastName: ''
	};

	arr.forEach((obj: object) => {
		const keys = Object.keys(obj);
		const values = Object.values(obj);

		keys.forEach((key: string) => {
			const propertyName = key.substring(0, key.length - 1);
			const propertyValue = values[0];

			if (propertyName === 'guestFirstName') {
				guestObj.firstName = propertyValue;
			}

			if (propertyName === 'guestLastName') {
				guestObj.lastName = propertyValue;
			}
		});

		if (currentIndex % 2 === 0) {
			result.push(guestObj);
			guestObj = {
				firstName: '',
				lastName: ''
			};
		}

		currentIndex++;
	});

	// Push the last guest object if it hasn't been pushed yet
	if (guestObj.firstName !== '' || guestObj.lastName !== '') {
		result.push(guestObj);
	}

	return result;
}

export function formatPhoneNumber(phoneNumber: string): string {
	// Check if the phone number is a valid number
	if (!/^[0-9]{10}$/.test(phoneNumber)) {
		return 'invalid phone number';
	}

	// Format the phone number
	const formattedPhoneNumber = `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
		3,
		6
	)}-${phoneNumber.slice(6)}`;

	// Return the formatted phone number
	return formattedPhoneNumber;
}

export const states = [
	{ label: 'Alabama', value: 'AL' },
	{ label: 'Alaska', value: 'AK' },
	{ label: 'Arizona', value: 'AZ' },
	{ label: 'Arkansas', value: 'AR' },
	{ label: 'California', value: 'CA' },
	{ label: 'Colorado', value: 'CO' },
	{ label: 'Connecticut', value: 'CT' },
	{ label: 'Delaware', value: 'DE' },
	{ label: 'Florida', value: 'FL' },
	{ label: 'Georgia', value: 'GA' },
	{ label: 'Hawaii', value: 'HI' },
	{ label: 'Idaho', value: 'ID' },
	{ label: 'Illinois', value: 'IL' },
	{ label: 'Indiana', value: 'IN' },
	{ label: 'Iowa', value: 'IA' },
	{ label: 'Kansas', value: 'KS' },
	{ label: 'Kentucky', value: 'KY' },
	{ label: 'Louisiana', value: 'LA' },
	{ label: 'Maine', value: 'ME' },
	{ label: 'Maryland', value: 'MD' },
	{ label: 'Massachusetts', value: 'MA' },
	{ label: 'Michigan', value: 'MI' },
	{ label: 'Minnesota', value: 'MN' },
	{ label: 'Mississippi', value: 'MS' },
	{ label: 'Missouri', value: 'MO' },
	{ label: 'Montana', value: 'MT' },
	{ label: 'Nebraska', value: 'NE' },
	{ label: 'Nevada', value: 'NV' },
	{ label: 'New Hampshire', value: 'NH' },
	{ label: 'New Jersey', value: 'NJ' },
	{ label: 'New Mexico', value: 'NM' },
	{ label: 'New York', value: 'NY' },
	{ label: 'North Carolina', value: 'NC' },
	{ label: 'North Dakota', value: 'ND' },
	{ label: 'Ohio', value: 'OH' },
	{ label: 'Oklahoma', value: 'OK' },
	{ label: 'Oregon', value: 'OR' },
	{ label: 'Pennsylvania', value: 'PA' },
	{ label: 'Rhode Island', value: 'RI' },
	{ label: 'South Carolina', value: 'SC' },
	{ label: 'South Dakota', value: 'SD' },
	{ label: 'Tennessee', value: 'TN' },
	{ label: 'Texas', value: 'TX' },
	{ label: 'Utah', value: 'UT' },
	{ label: 'Vermont', value: 'VT' },
	{ label: 'Virginia', value: 'VA' },
	{ label: 'Washington', value: 'WA' },
	{ label: 'West Virginia', value: 'WV' },
	{ label: 'Wisconsin', value: 'WI' },
	{ label: 'Wyoming', value: 'WY' }
];

interface Table {
	tableNumber: number;
	guests: (string | null)[];
}

export function createTableDataSet(numTables: number, guestsPerTable: number): Table[] {
	if (numTables <= 0 || guestsPerTable <= 0) {
		throw new Error('Both the number of tables and guests per table must be greater than 0.');
	}

	const tableDataSet: Table[] = [];

	for (let tableNumber = 1; tableNumber <= numTables; tableNumber++) {
		const table: Table = {
			tableNumber,
			guests: new Array(guestsPerTable).fill(null)
		};
		tableDataSet.push(table);
	}

	return tableDataSet;
}

export async function addTableToFirebase(table: Table) {
	try {
		const docRef = await addDoc(collection(db, 'tables'), table);
		if (dev) {
			console.log('Document written with ID: ', docRef.id);
		}
	} catch (e) {
		console.error('Error adding document: ', e);
	}
}

export const checkIfTableIsOpen = (seats: number, partySize: number): boolean =>
	!(seats <= 0 || seats < partySize);

export const debounce = (fn: (...args: unknown[]) => void, ms = 300) => {
	let timeoutId: ReturnType<typeof setTimeout>;
	return function (this: unknown, ...args: unknown[]) {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => fn.apply(this, args), ms);
	};
};

export function rewriteUrl(url: string | null) {
	if (!url) return;
	if (dev) {
		return url;
	}
	const splitString = '/o/';
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, path] = url.split(splitString);
	const newUrl = imageUrl + splitString + path;
	return newUrl;
}

let fullscreen: boolean;

export async function gotoAndScroll(
	url: string | undefined,
	photo?: HTMLDivElement,
	icons?: HTMLDivElement,
	selectedIcon?: string
) {
	if (!url) return;
	if (fullscreen) document.documentElement.requestFullscreen();
	await goto(url);
	if (icons) {
		const currentIcon = icons.querySelector(`#${selectedIcon}`);

		currentIcon?.scrollIntoView({ block: 'start' });
	}
	if (photo) window.scrollTo({ top: photo.getBoundingClientRect().top, left: 0, behavior: 'auto' });
}

let uid = '';
userId.subscribe((value) => {
	uid = value || '';
});

let ulikes: string[] = [];
userLikes.subscribe((value) => {
	ulikes = value;
});

export async function toggleLike(id: string) {
	if (!uid) {
		return;
	}
	if (ulikes.includes(id)) {
		userLikes.set(ulikes.filter((like) => like !== id));
	} else {
		userLikes.set([...ulikes, id]);
	}
	// update the document
	const add = ulikes.includes(id);
	const docRef = doc(db, 'likes', uid);

	await setDoc(docRef, { likes: ulikes });
	// get the current document
	const imageRef = doc(db, 'photos', id);
	await setDoc(imageRef, { likes: increment(add ? 1 : -1) }, { merge: true });
}

export async function addComment(
	photoId: string,
	comment: string,
	displayName?: string,
	avatar?: string
) {
	if (!uid || !comment || !photoId) return;

	// get a uuid for the comment
	const newComment: Comment = {
		photoId,
		userId: uid,
		displayName: displayName || 'Anonymous',
		avatar: avatar || '',
		comment,
		timestamp: Timestamp.now()
	};

	// each comment should be in a its own document.  This way we can query for all comments for a specific image
	try {
		const docRef = await addDoc(collection(db, 'comments'), newComment);
		if (dev) {
			console.log('Document written with ID: ', docRef.id);
		}
	} catch (e) {
		console.error('Error adding comment: ', e);
	}
	// update the comments number in the image document
	try {
		const imageRef = doc(db, 'photos', photoId);
		await setDoc(imageRef, { comments: increment(1) }, { merge: true });
	} catch (e) {
		console.error('Error updating comments count: ', e);
	}
}

export const toggleOptions: Array<{ field: SortField; label: string }> = [
	{ field: 'dateAdded', label: 'Date Added' },
	{ field: 'dateTaken', label: 'Date Taken' },
	{ field: 'likes', label: 'Likes' }
];

// function that takes a date and return the amount time since that date
// e.g. 2 days ago, 3 hours ago, 4 minutes ago, 5 seconds ago
export function timeSince(date: Timestamp) {
	const now = new Date();
	const elapsed = now.getTime() - date.seconds * 1000; // Difference in milliseconds

	const seconds = Math.floor(elapsed / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);

	if (days > 0) {
		return `<span class="font-bold">${days}</span> day${days === 1 ? '' : 's'} ago`;
	} else if (hours > 0) {
		return `<span class="font-bold">${hours}</span> hour${hours === 1 ? '' : 's'} ago`;
	} else if (minutes > 0) {
		return `<span class="font-bold">${minutes}</span> minute${minutes === 1 ? '' : 's'} ago`;
	} else if (seconds > 0) {
		return `<span class="font-bold">${seconds}</span> second${seconds === 1 ? '' : 's'} ago`;
	} else {
		return 'now';
	}
}

export function createSlug(title: string): string {
	return title
		.toLowerCase() // Convert to lowercase
		.replace(/[^\w\s-]/g, '') // Remove special characters (except spaces and hyphens)
		.replace(/\s+/g, '-') // Replace spaces with hyphens
		.replace(/-+/g, '-') // Replace multiple hyphens with a single hyphen
		.replace(/^-+/, '') // Remove leading hyphen
		.replace(/-+$/, ''); // Remove trailing hyphen
}
