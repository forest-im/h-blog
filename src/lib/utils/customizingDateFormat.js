export default function customizingDateFormat(date) {
	const stringDate = date.toISOString();

	const dateObj = {
		year: stringDate.slice(0, 4),
		month: stringDate.slice(5, 7),
		date: stringDate.slice(8, 10)
	};

	return `${dateObj.year}-${dateObj.month}-${dateObj.date}`;
}
