import { FC } from 'react';
import dayjs from 'dayjs';

import { PlantType } from '../types/PlantType';

import { TaskFlag } from './TaskFlag';

type PlantCardProps = {
	plant: PlantType;
};

const formatDate = (date: string) => {
	const targetDate = dayjs(date);
	const currentDate = dayjs();

	const daysDiff = targetDate.diff(currentDate, 'day') + 1;
	if (daysDiff < 0) {
		// Target date has already passed
		return 'Overdue!';
	}
	if (daysDiff === 0) {
		return 'Today!';
	}
	if (daysDiff <= 7) {
		// Target date is less than or equal to 7 days away
		const daysLabel = daysDiff === 1 ? 'day' : 'days';
		return `in ${daysDiff} ${daysLabel}`;
	}
	// Target date is more than 7 days away
	const weeksDiff = targetDate.diff(currentDate, 'week');
	const monthsDiff = targetDate.diff(currentDate, 'month');

	if (monthsDiff >= 1) {
		// Target date is more than 1 month away
		return `in ${monthsDiff} month${monthsDiff > 1 ? 's' : ''}, ${
			weeksDiff % 4
		} week${weeksDiff % 4 > 1 ? 's' : ''}`;
	} else {
		// Target date is more than 1 week away but less than 1 month away
		return `in ${weeksDiff} week${weeksDiff > 1 ? 's' : ''}, ${
			daysDiff % 7
		} day${daysDiff % 7 > 1 ? 's' : ''}`;
	}
};

export const PlantCard: FC<PlantCardProps> = ({ plant }) => (
	<div
		key={plant.name}
		className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700"
	>
		<div
			className="relative overflow-hidden bg-cover bg-no-repeat"
			data-te-ripple-init
			data-te-ripple-color="light"
		>
			<img
				className="rounded-t-lg"
				src="https://images.unsplash.com/photo-1619423089884-bc5b70bc4e2c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
				alt=""
			/>
			<a href="#!">
				<div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100" />
			</a>
		</div>
		<div className="p-6 flex flex-col content-center justify-center">
			<h5 className="mb-2 text-xl text-center font-medium text-neutral-800 dark:text-neutral-50">
				{plant.name}
			</h5>
			<div className="p-5">
				<TaskFlag
					type="water"
					text={formatDate(plant.nextWater)}
					extraClasses="flex justify-center text-center"
				/>
				<TaskFlag
					type="fertilize"
					text={formatDate(plant.nextFertilize)}
					extraClasses="flex justify-center text-center"
				/>
				<TaskFlag
					type="repot"
					text={formatDate(plant.nextRepot)}
					extraClasses="flex justify-center text-center"
				/>
			</div>
			<button
				type="button"
				className="inline-block rounded text-white bg-emerald-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
				data-te-ripple-init
				data-te-ripple-color="light"
			>
				View details
			</button>
		</div>
	</div>
);
