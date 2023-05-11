import dayjs from 'dayjs';
import { any, object, string } from 'zod';

const today = dayjs().format('YYYY-MM-DD');

const createIntervalSchema = (min: number, max: number, unit: string) =>
	string()
		.nonempty('Interval is required.')
		.transform(value => Number(value))
		.refine(
			value => value >= min && value <= max,
			`Interval should be between ${min} and ${max} ${unit}.`
		);

const createDateSchema = () =>
	string().refine(
		date =>
			dayjs(date).isBefore(dayjs(today)) || dayjs(date).isSame(dayjs(today)),
		{
			message: 'Time travel has not yet been invented.'
		}
	);

export const plantSchema = object({
	name: string()
		.nonempty('Name is required.')
		.max(50, 'Name can be at most 50 characters long.'),
	image: any().optional(),
	lastWater: createDateSchema(),
	lastFertilize: createDateSchema(),
	lastRepot: createDateSchema(),
	waterInterval: createIntervalSchema(3, 21, 'days'),
	fertilizeInterval: createIntervalSchema(2, 10, 'weeks'),
	repotInterval: createIntervalSchema(1, 5, 'years')
}).required();
