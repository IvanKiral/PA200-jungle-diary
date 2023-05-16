import { deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { deleteObject, ref } from 'firebase/storage';

import { db, storage } from '../firestore';
import { PlantType } from '../types/PlantType';
import { WaterIcon } from '../components/icons/WaterIcon';
import { FertilizeIcon } from '../components/icons/FertilizeIcon';
import { PlantPotIcon } from '../components/icons/PlantPotIcon';
import { nextDate } from '../utils/dateUtils';
import { DeleteIcon } from '../components/icons/DeleteIcon';
import { DeleteModal } from '../components/DeleteModal';
import { PlantAction } from '../types/PlantAction';
import { ActionFields } from '../types/ActionFields';
import { PlantInfoTable } from '../components/PlantInfoTable';

const actionFields: Record<PlantAction, ActionFields> = {
	water: {
		lastField: 'lastWater',
		nextField: 'nextWater',
		intervalField: 'waterInterval'
	},
	fertilize: {
		lastField: 'lastFertilize',
		nextField: 'nextFertilize',
		intervalField: 'fertilizeInterval'
	},
	repot: {
		lastField: 'lastRepot',
		nextField: 'nextRepot',
		intervalField: 'repotInterval'
	}
};

const updatePlant = async (
	plant: PlantType,
	plantId: string,
	lastField: keyof PlantType,
	nextField: keyof PlantType,
	intervalField: keyof PlantType
) => {
	const today = dayjs();
	await updateDoc(doc(db, 'plants', plantId), {
		[lastField]: today.format('YYYY-MM-DD'),
		[nextField]: nextDate(today, plant[intervalField] as number)
	});
};

const deletePlant = async (plant: PlantType, plantId: string) => {
	deleteObject(ref(storage, plant.imageName));
	await deleteDoc(doc(db, 'plants', plantId));
};

export const PlantDetail: FC = () => {
	const [plant, setPlant] = useState<PlantType>();
	const [showModal, setShowModal] = useState(false);
	const { plantId } = useParams();

	if (!plantId) {
		return <p>Plant not found</p>;
	}

	useEffect(() => {
		onSnapshot(doc(db, 'plants', plantId), doc => {
			setPlant(doc.data() as PlantType);
		});
	}, [plantId]);

	const updateAction = (action: PlantAction) => {
		if (plant) {
			const { lastField, nextField, intervalField } = actionFields[action];
			updatePlant(plant, plantId, lastField, nextField, intervalField);
		}
	};

	const handleDelete = () => {
		deletePlant(plant as PlantType, plantId);
	};

	return (
		<div className="flex-auto">
			<div className="flex flex-row justify-between items-center pb-4">
				<h1 className="flex flex-col font-semibold text-4xl">{plant?.name}</h1>
				<button
					type="button"
					title="Delete plant"
					className="bg-red-500 text-white border border-red-500 hover:bg-red-700 hover:border-red-700 rounded-full text-sm p-2 inline-flex items-center ml-4 dark:border-red-500 dark:hover:bg-red-700 dark:hover:border-red-700"
					onClick={() => setShowModal(true)}
				>
					<DeleteIcon className="w-4 h-4 fill-white" />
				</button>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				<div className="md:col-span-1">
					<img
						className="object-scale-down rounded-lg h-auto mx-auto"
						src={plant?.image}
						alt=""
					/>
				</div>
				<div className="lg:col-span-2 flex flex-col justify-center">
					<p className="text-2xl font-semibold pb-2 xl:pb-6 text-center whitespace-nowrap">
						Plant information
					</p>

					<div className="relative overflow-x-auto rounded-md shadow-sm">
						<PlantInfoTable plant={plant as PlantType} />
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
			{showModal && (
				<>
					<div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50" />
					<DeleteModal
						setShowModal={setShowModal}
						handleDelete={handleDelete}
					/>
				</>
			)}
		</div>
	);
};
