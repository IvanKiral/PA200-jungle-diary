import dayjs, { Dayjs } from 'dayjs';

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

export const defaultToday = () => dayjs().format('YYYY-MM-DD');

export const nextDate = (date: Dayjs, interval: number) =>
	dayjs(date).add(interval, 'days').format('YYYY-MM-DD');
