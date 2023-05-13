import { FC } from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

import { PlantDocType } from '../types/PlantDocType';

import { TaskFlag } from './TaskFlag';

type PlantCardProps = {
	plant: PlantDocType;
};

const formatDate = (date: string) => {
	const targetDate = dayjs(date);
	const currentDate = dayjs();

	const daysDiff = targetDate.diff(currentDate, 'day');
	if (daysDiff < 0) {
		// Target date has already passed
		return 'Overdue!';
	}
	if (daysDiff === 0) {
		return 'Today!';
	}
	if (daysDiff <= 15) {
		// Target date is less than or equal to 7 days away
		return `in ${daysDiff} day${daysDiff === 1 ? '' : 's'}`;
	}

	return targetDate.format('DD-MM-YYYY');
};

export const PlantCard: FC<PlantCardProps> = ({ plant }) => (
	<div
		key={plant.data.name}
		className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 z-0"
	>
		<div
			className="relative overflow-hidden bg-cover bg-no-repeat h-52"
			data-te-ripple-init
			data-te-ripple-color="light"
		>
			<img
				className="rounded-t-lg object-cover h-full w-full"
				src={plant.data.image}
				alt=""
			/>
		</div>
		<div className="p-6 flex flex-col content-center justify-center">
			<h5 className="mb-2 text-xl text-center font-medium text-neutral-800 dark:text-neutral-50">
				{plant.data.name}
			</h5>
			<div className="p-5">
				<TaskFlag
					type="water"
					text={formatDate(plant.data.nextWater)}
					extraClasses="flex justify-center text-center"
				/>
				<TaskFlag
					type="fertilize"
					text={formatDate(plant.data.nextFertilize)}
					extraClasses="flex justify-center text-center"
				/>
				<TaskFlag
					type="repot"
					text={formatDate(plant.data.nextRepot)}
					extraClasses="flex justify-center text-center"
				/>
			</div>
			<Link to={plant.id}>
				<button
					type="button"
					className="inline-block rounded text-white bg-emerald-500 dark:bg-emerald-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
					data-te-ripple-init
					data-te-ripple-color="light"
				>
					View details
				</button>
			</Link>
		</div>
	</div>
);
