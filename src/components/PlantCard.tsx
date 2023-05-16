import { FC } from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

import { PlantDocType } from '../types/PlantDocType';

import { TaskFlag } from './TaskFlag';
import { PlantButton } from './PlantButton';

type PlantCardProps = {
	plant: PlantDocType;
};

const formatDate = (date: string) => {
	const targetDate = dayjs(date).startOf('day');
	const currentDate = dayjs().startOf('day');

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
		key={plant.id}
		className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 z-0"
	>
		<div
			className="relative overflow-hidden bg-cover bg-no-repeat h-36 sm:h-52"
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
			<h5 className="mb-2 text-xl text-center font-medium text-neutral-800 dark:text-neutral-50 truncate">
				{plant.data.name}
			</h5>
			<div className="px-1 sm:px-2 md:px-4 lg:px-6 py-2 sm:py-4 md:py-6">
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
			<Link className="flex justify-center" to={`/plants/${plant.id}`}>
				<PlantButton text="View details" />
			</Link>
		</div>
	</div>
);
