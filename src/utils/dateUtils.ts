import dayjs, { Dayjs, ManipulateType } from 'dayjs';

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

export const nextDate = (date: Dayjs, interval: number, unit: ManipulateType) =>
	dayjs(date).add(interval, unit).format('YYYY-MM-DD');
