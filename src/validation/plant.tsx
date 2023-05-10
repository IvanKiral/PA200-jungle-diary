import dayjs from 'dayjs';
import { any, date, number, object, string } from 'zod';

const today = dayjs().format('YYYY-MM-DD');
const validExtensions = ['.jpg', '.jpeg', '.png'];

const createIntervalSchema = (min: number, max: number, unit: string) =>
	number()
		.min(min, `Interval should be between ${min} and ${max} ${unit}.`)
		.max(max, `Interval should be between ${min} and ${max} ${unit}.`);

const createDateSchema = (minDate: string) =>
	date()
		.min(new Date(minDate), { message: 'This plant would be already dead.' })
		.max(new Date(today), {
			message: 'Time travel has not yet been invented.'
		});

const createImageSchema = () =>
	any().refine(
		file => validExtensions.includes(file?.type),
		`Only ${validExtensions.join(', ')} formats are supported.`
	);

const plantSchema = object({
	name: string()
		.nonempty('Name is required.')
		.max(50, 'Name can be at most 50 characters long.'),
	image: createImageSchema().optional(),
	lastWatered: createDateSchema('2023-01-01'),
	lastFertilized: createDateSchema('2023-01-01'),
	lastRepotted: createDateSchema('2023-01-01'),
	wateringInterval: createIntervalSchema(3, 21, 'days'),
	fertilizingInterval: createIntervalSchema(2, 10, 'weeks'),
	repottingInterval: createIntervalSchema(1, 5, 'years')
}).required();
