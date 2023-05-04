import { FC, ReactElement } from 'react';
import {
	parseISO,
	differenceInDays,
	differenceInWeeks,
	differenceInMonths
} from 'date-fns';

import { PlantType } from '../types/PlantType';

import { FertilizeIcon } from './icons/FertilizeIcon';
import { PlantPotIcon } from './icons/PlantPotIcon';
import { WaterIcon } from './icons/WaterIcon';

type PlantCardProps = {
	plant: PlantType;
};

const formatDate = (date: string) => {
	const targetDate = parseISO(date);
	const currentDate = new Date();

	const daysDiff = differenceInDays(targetDate, currentDate) + 1;
	if (daysDiff < 0) {
		// Target date has already passed
		return 'Overdue!';
	} else if (daysDiff === 0) {
		return 'Today!';
	} else if (daysDiff <= 7) {
		// Target date is less than or equal to 7 days away
		const daysLabel = daysDiff === 1 ? 'day' : 'days';
		return `in ${daysDiff} ${daysLabel}`;
	} else {
		// Target date is more than 7 days away
		const weeksDiff = differenceInWeeks(targetDate, currentDate);
		const monthsDiff = differenceInMonths(targetDate, currentDate);

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
	}
};

const renderRemainder = (
	name: string,
	next: string,
	backGroundColor: string,
	textColor: string,
	icon: ReactElement
) => (
	<div
		key={`water-${next}-${name}`}
		className={`${backGroundColor} ${textColor} flex justify-center text-center rounded-sm mb-[2px] truncate flex flex-row items-center gap-1"`}
	>
		{icon}
		{formatDate(next)}
	</div>
);

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
				{renderRemainder(
					plant.name,
					plant.nextWater,
					'bg-blue-300',
					'text-blue-900',
					<WaterIcon className="w-5 h-5 fill-blue-900" />
				)}
				{renderRemainder(
					plant.name,
					plant.nextRepot,
					'bg-amber-200',
					'text-yellow-700',
					<PlantPotIcon className="w-5 h-5 fill-yellow-700" />
				)}
				{renderRemainder(
					plant.name,
					plant.nextFertilize,
					'bg-red-300',
					'text-red-700',
					<FertilizeIcon className="w-5 h-5 fill-red-700" />
				)}
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
