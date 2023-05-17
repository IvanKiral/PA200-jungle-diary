import { FC, useEffect, useState } from 'react';
import { collection, where, query, onSnapshot } from 'firebase/firestore';

import { PlantCard } from '../components/PlantCard';
import { useUser } from '../hooks/useUser';
import { PlantType } from '../types/PlantType';
import { NewPlantForm } from '../components/NewPlantForm';
import { db } from '../firestore';
import { PlantDocType } from '../types/PlantDocType';
import { PlantButton } from '../components/PlantButton';

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
		<div className="flex flex-col pb-4">
			<div className="flex flex-row justify-between items-center pb-4">
				<h1 className="font-semibold text-4xl">Plants</h1>
				<PlantButton text="Add new plant" onClick={() => setShowModal(true)} />
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
