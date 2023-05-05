import { FC, useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';

import { PlantCard } from '../components/PlantCard';
import { useUser } from '../hooks/useUser';
import { db } from '../firestore';
import { PlantType } from '../types/PlantType';

const getUserPlants = async (email: string) => {
	const q = query(collection(db, 'plants'), where('userEmail', '==', email));

	const querySnapshot = await getDocs(q);
	const plantData = querySnapshot.docs.map(doc => doc.data() as PlantType);

	return plantData;
};

export const Plants: FC = () => {
	const user = useUser();
	const [userPlants, setUserPlants] = useState<PlantType[]>([]);

	useEffect(() => {
		const fetchUserPlants = async () => {
			if (user) {
				const plants = await getUserPlants(user.email as string);
				setUserPlants(plants);
			}
		};
		fetchUserPlants();
	}, [user]);
	if (!user) {
		return null;
	}

	return (
		<div className="mx-auto container grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
			{userPlants.map(plant => (
				<PlantCard plant={plant} key={plant.name} />
			))}
		</div>
	);
};
