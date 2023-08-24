export type LoadingProps = 'loading' | 'error' | 'idle' | 'submitting';
export type RsvpProps = 'yes' | 'no' | null;

export type Guest = {
	name: string;
	email: string;
	phone: string;
	address: string;
	rsvp: RsvpProps;
	guests?: { firstName: string; lastName: string }[];
	id: string;
	totalGuests?: number;
};

export type FirebaseResponse = {
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
};
