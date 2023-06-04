export const title = '❤️ Megan and Mike 2024 ❤️';

export function getNextValue(currentValue: number, direction: 'prev' | 'next') {
	let nextValue = direction === 'next' ? currentValue + 1 : currentValue - 1;

	if (nextValue > 3) {
		nextValue = 3;
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
