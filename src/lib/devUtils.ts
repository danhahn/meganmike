export const firstNames = [
	'Michael',
	'James',
	'William',
	'David',
	'John',
	'Robert',
	'Thomas',
	'Joseph',
	'Charles',
	'George',
	'Daniel',
	'Christopher',
	'Matthew',
	'Anthony',
	'Joseph',
	'Andrew',
	'Steven',
	'Brandon',
	'Zachary',
	'Lucas',
	'Noah',
	'Elijah',
	'Benjamin',
	'Mason',
	'William',
	'Liam',
	'Oliver',
	'James',
	'Logan',
	'Alexander',
	'Ethan',
	'Henry',
	'Aiden',
	'Jackson',
	'Daniel',
	'Samuel',
	'David',
	'Elijah',
	'Caleb',
	'Owen',
	'Matthew',
	'Lucas',
	'Jayden',
	'William',
	'Asher',
	'Jacob',
	'Michael',
	'Christopher',
	'Olivia',
	'Emma',
	'Ava',
	'Sophia',
	'Isabella',
	'Charlotte',
	'Amelia',
	'Mia',
	'Abigail',
	'Emily',
	'Madison',
	'Chloe',
	'Ella',
	'Sophia',
	'Elizabeth',
	'Ava',
	'Lily',
	'Isabella',
	'Charlotte',
	'Evelyn',
	'Abigail',
	'Olivia',
	'Mia',
	'Sophia',
	'Amelia',
	'Isabella',
	'Chloe',
	'Ella',
	'Madison',
	'Evelyn',
	'Lily',
	'Charlotte',
	'Elizabeth',
	'Ava',
	'Harper',
	'Amelia',
	'Emily',
	'Chloe',
	'Ella',
	'Abigail',
	'Sophia',
	'Avery',
	'Brooklyn',
	'Lily'
];

export const lastNames = [
	'Smith',
	'Jones',
	'Williams',
	'Brown',
	'Davis',
	'Wilson',
	'Johnson',
	'Miller',
	'White',
	'Anderson',
	'Thomas',
	'Jackson',
	'Garcia',
	'Martinez',
	'Brown',
	'Hernandez',
	'Moore',
	'Lee',
	'Green',
	'Walker',
	'Thompson',
	'White',
	'Clark',
	'Lewis',
	'Wilson',
	'Walker',
	'Peterson',
	'Hall',
	'Young',
	'Hernandez',
	'Carter',
	'Anderson',
	'Green',
	'Davis',
	'Miller',
	'Smith',
	'Williams',
	'Brown',
	'Johnson',
	'Jones',
	'Garcia',
	'Martin',
	'Gonzalez',
	'Williams',
	'Wilson',
	'Moore',
	'Taylor',
	'Thomas',
	'Jackson',
	'White',
	'Harris',
	'Martinez',
	'Thompson',
	'Lee',
	'Hernandez',
	'Lopez',
	'Green',
	'Walker',
	'Clark',
	'Davis',
	'Miller',
	'Smith',
	'Williams',
	'Brown',
	'Johnson',
	'Jones',
	'Garcia',
	'Martin',
	'Gonzalez',
	'Williams',
	'Wilson',
	'Moore',
	'Taylor',
	'Thomas',
	'Jackson',
	'White',
	'Harris',
	'Martinez',
	'Thompson',
	'Lee',
	'Hernandez',
	'Lopez',
	'Green',
	'Walker',
	'Clark',
	'Davis',
	'Miller',
	'Smith',
	'Williams',
	'Brown'
];

export function generateRandomPhoneNumber(): string {
	let phoneNumber = '';

	// Generate the area code (e.g., 3 digits)
	const areaCode = Math.floor(Math.random() * 1000)
		.toString()
		.padStart(3, '0');
	phoneNumber += areaCode;

	// Generate the remaining digits (e.g., 7 digits)
	const remainingDigits = Math.floor(Math.random() * 10000000)
		.toString()
		.padStart(7, '0');
	phoneNumber += remainingDigits;

	return phoneNumber;
}

export function generateRandomEmailAddress(num: number): string {
	const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'];
	const randomDomainIndex = Math.floor(Math.random() * domains.length);
	const randomDomain = domains[randomDomainIndex];

	const randomString = `${firstNames[num].toLocaleLowerCase()}.${lastNames[
		num
	].toLocaleLowerCase()}`;
	const randomEmail = `${randomString}@${randomDomain}`;

	return randomEmail;
}

export function getRandomTownInNewYork(): string {
	const towns = [
		'Hempstead',
		'Islip',
		'Brookhaven',
		'Oyster Bay',
		'Babylon',
		'Huntington',
		'Smithtown',
		'North Hempstead',
		'Glen Cove',
		'Long Beach'
		// Add more town names here
	];

	const randomIndex = Math.floor(Math.random() * towns.length);
	const randomTown = towns[randomIndex];

	return randomTown;
}

export function generateFakeStreetAddress(): string {
	const streets = [
		'Main Street',
		'Park Avenue',
		'Elm Street',
		'Cedar Lane',
		'Oak Street',
		'Maple Avenue',
		'Pine Street',
		'Washington Boulevard'
		// Add more street names here
	];

	const randomStreetIndex = Math.floor(Math.random() * streets.length);
	const randomStreet = streets[randomStreetIndex];

	const randomHouseNumber = Math.floor(Math.random() * 100) + 1;

	return `${randomHouseNumber} ${randomStreet}`;
}
