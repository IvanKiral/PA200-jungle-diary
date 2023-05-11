export const daysInWeek = [
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
	'Sunday'
];

export const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];

export const defaultToday = () => {
	const today = new Date();
	const formattedDate = `${today.getFullYear()}-${String(
		today.getMonth() + 1
	).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

	return formattedDate;
};
