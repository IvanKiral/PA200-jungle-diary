import { FC, useEffect, useState } from 'react';
import { collection, where, query, onSnapshot } from 'firebase/firestore';

import { PlantCard } from '../components/PlantCard';
import { useUser } from '../hooks/useUser';
import { PlantType } from '../types/PlantType';
import { NewPlantForm } from '../components/NewPlantForm';
import { db } from '../firestore';
import { PlantDocType } from '../types/PlantDocType';

export const Plants: FC = () => {
	const user = useUser();
	const [userPlants, setUserPlants] = useState<PlantDocType[]>([]);
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		const q = query(
			collection(db, 'plants'),
			where('userEmail', '==', user?.email)
		);
		onSnapshot(q, snapshot => {
			setUserPlants(
				snapshot.docs.map(doc => ({
					id: doc.id,
					data: doc.data() as PlantType
				}))
			);
		});
	}, [user]);

	if (!user) {
		return null;
	}

	return (
		<div className="flex flex-col">
			<div className="flex flex-row justify-between items-center pb-4">
				<h1 className="font-semibold text-4xl">Plants</h1>
				<button
					onClick={() => setShowModal(true)}
					type="button"
					className="mb-2 align-self-end w-fit rounded text-white bg-emerald-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
					data-te-ripple-init
					data-te-ripple-color="light"
				>
					Add new plant
				</button>
			</div>
			{showModal ? <NewPlantForm setShowModal={setShowModal} /> : null}
			<div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-4">
				{userPlants.map(plant => (
					<PlantCard plant={plant} key={plant.id} />
				))}
			</div>
		</div>
	);
};
