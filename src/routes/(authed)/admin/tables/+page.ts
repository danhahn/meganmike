import type { PageLoad } from './$types';

interface Table {
	tableNumber: number;
	guests: (string | null)[];
}

function createTableDataSet(numTables: number, guestsPerTable: number): Table[] {
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

export const load = (async () => {
	const numTables = 12;
	const guestsPerTable = 12;
	const dataSet = createTableDataSet(numTables, guestsPerTable);

	return { tables: dataSet };
}) satisfies PageLoad;
