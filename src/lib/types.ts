import type { Timestamp } from 'firebase/firestore';

export type LoadingProps = 'loading' | 'error' | 'idle' | 'submitting';
export type RsvpProps = 'yes' | 'no' | null;

export type Guest = {
	address: string;
	address2: string;
	city: string;
	email: string;
	firstName: string;
	guests: { firstName: string; lastName: string }[];
	lastName: string;
	phone: string;
	rsvp: RsvpProps;
	state: string;
	totalGuests?: number;
	zipCode: string;
	id: string;
	table?: number;
};

export type Table = {
	tableNumber: number;
	guests: (string | null)[];
	id: string;
};

export type Gallery = {
	name: string;
	photos: string[];
};

export type Image = {
	name: string;
	dateTaken: Timestamp;
	dateAdded: Timestamp;
	uploadedBy: string;
	likes: number;
	size: string;
	gallery: string;
};
