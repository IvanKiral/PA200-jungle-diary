import dayjs from 'dayjs';
import { any, date, number, object, string } from 'zod';

const today = dayjs().format('YYYY-MM-DD');
const validExtensions = ['.jpg', '.jpeg', '.png'];

const plantSchema = object({
	name: string()
		.nonempty('Name is required.')
		.max(50, 'Name can be at most 50 characters long.'),
	image: any()
		.refine(file => file?.size <= 500000, `Max image size is 5MB.`)
		.refine(
			file => validExtensions.includes(file?.type),
			'Only .jpg, .jpeg and .png formats are supported.'
		),
	lastWatered: date()
		.min(new Date('2023-01-01'), {
			message: 'This plant would be already dead.'
		})
		.max(new Date(today), {
			message: 'Time travel has not yet been invented.'
		}),
	lastFertilized: date().max(new Date(today), {
		message: 'Time travel has not yet been invented.'
	}),
	lastRepotted: date().max(new Date(today), {
		message: 'Time travel has not yet been invented.'
	}),
	wateringInterval: number()
		.min(3, 'Watering interval should be between 3 and 21 days.')
		.max(21, 'Watering interval should be between 3 and 21 days.'),
	fertilizingInterval: number()
		.min(2, 'Fertilizing interval should be between 2 and 10 weeks.')
		.max(10, 'Fertilizing interval should be between 2 and 10 weeks.'),
	repottingInterval: number()
		.min(1, 'Repotting interval should be between 1 and 5 years.')
		.max(5, 'Repotting interval should be between 1 and 5 years.')
}).required();
