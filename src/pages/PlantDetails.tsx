import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';

import { db } from '../firestore';
import { PlantType } from '../types/PlantType';
import { WaterIcon } from '../components/icons/WaterIcon';
import { FertilizeIcon } from '../components/icons/FertilizeIcon';
import { PlantPotIcon } from '../components/icons/PlantPotIcon';
import { nextDate } from '../utils/dateUtils';

const updateWater = async (plant: PlantType, plantId: string) => {
	const today = dayjs();

	await updateDoc(doc(db, 'plants', plantId), {
		lastWater: today.format('YYYY-MM-DD'),
		nextWater: nextDate(today, plant.waterInterval, 'days')
	});
};

const updateFertilize = async (plant: PlantType, plantId: string) => {
	const today = dayjs();

	await updateDoc(doc(db, 'plants', plantId), {
		lastFertilize: today.format('YYYY-MM-DD'),
		nextFertilize: nextDate(today, plant.fertilizeInterval, 'days')
	});
};

const updateRepot = async (plant: PlantType, plantId: string) => {
	const today = dayjs();

	await updateDoc(doc(db, 'plants', plantId), {
		lastRepot: today.format('YYYY-MM-DD'),
		nextRepot: nextDate(today, plant.repotInterval, 'days')
	});
};

export const PlantDetail: FC = () => {
	const [plant, setPlant] = useState<PlantType>();
	const { plantId } = useParams();

	if (!plantId) {
		return <p>Plant not found</p>;
	}

	useEffect(() => {
		onSnapshot(doc(db, 'plants', plantId), doc => {
			setPlant(doc.data() as PlantType);
		});
	}, [plantId]);

	const updateAction = (action: 'water' | 'fertilize' | 'repot') => {
		if (plant) {
			if (action === 'water') {
				updateWater(plant, plantId);
			} else if (action === 'fertilize') {
				updateFertilize(plant, plantId);
			} else {
				updateRepot(plant, plantId);
			}
		}
	};

	return (
		<div className="flex-auto">
			<h1 className="flex flex-col font-semibold text-4xl pb-4">
				{plant?.name}
			</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				<div className="md:col-span-1">
					<img
						className="object-scale-down rounded-lg h-auto mx-auto"
						src={plant?.image}
						alt=""
					/>
				</div>
				<div className="lg:col-span-2 flex flex-col justify-center">
					<p className="text-2xl font-semibold pb-4 xl:pb-8 text-center whitespace-nowrap">
						Plant information
					</p>

					<div className="relative overflow-x-auto rounded-md shadow-sm">
						<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
							<thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-zinc-600 dark:text-gray-400">
								<tr>
									<th scope="col" className="px-6 py-3" />
									<th scope="col" className="px-6 py-3">
										Last
									</th>
									<th scope="col" className="px-6 py-3">
										Next
									</th>
									<th scope="col" className="px-6 py-3">
										Interval
									</th>
								</tr>
							</thead>
							<tbody className="bg-gray-200">
								<tr className="bg-white border-b dark:bg-zinc-700 dark:border-gray-800 whitespace-nowrap">
									<th
										scope="row"
										className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
									>
										Watering
									</th>
									<td className="px-6 py-4">{plant?.lastWater}</td>
									<td className="px-6 py-4">{plant?.nextWater}</td>
									<td className="px-6 py-4">
										every {plant?.waterInterval} days
									</td>
								</tr>
								<tr className="bg-white border-b dark:bg-zinc-700 dark:border-gray-800 whitespace-nowrap">
									<th
										scope="row"
										className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
									>
										Fertilizing
									</th>
									<td className="px-6 py-4">{plant?.lastFertilize}</td>
									<td className="px-6 py-4">{plant?.nextFertilize}</td>
									<td className="px-6 py-4">
										every {plant?.fertilizeInterval} weeks
									</td>
								</tr>
								<tr className="bg-white dark:bg-zinc-700 whitespace-nowrap">
									<th
										scope="row"
										className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
									>
										Repotting
									</th>
									<td className="px-6 py-4">{plant?.lastRepot}</td>
									<td className="px-6 py-4">{plant?.nextRepot}</td>
									<td className="px-6 py-4">
										every {plant?.repotInterval} years
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className="buttons py-4 lg:py-8 xl:py-16 flex flex-col items-center justify-center lg:flex-row">
						<button
							type="button"
							onClick={() => updateAction('water')}
							className="max-w-fit text-white bg-blue-300 hover:bg-blue-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2 lg:mb-0 dark:bg-blue-500 dark:hover:bg-blue-600 whitespace-nowrap"
						>
							<WaterIcon className="w-5 h-5 fill-white mr-2 -ml-1" />
							Water me!
						</button>
						<button
							type="button"
							onClick={() => updateAction('fertilize')}
							className="max-w-fit text-white bg-amber-300 hover:bg-amber-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2 lg:mb-0 dark:bg-amber-500 dark:hover:bg-amber-600 whitespace-nowrap"
						>
							<FertilizeIcon className="w-5 h-5 fill-white mr-2 -ml-1" />
							Fertilize me!
						</button>
						<button
							type="button"
							onClick={() => updateAction('repot')}
							className="max-w-fit text-white bg-red-300 hover:bg-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2 lg:mb-0 dark:bg-red-500 dark:hover:bg-red-600 whitespace-nowrap"
						>
							<PlantPotIcon className="w-5 h-5 fill-white mr-2 -ml-1" />
							Repot me!
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
