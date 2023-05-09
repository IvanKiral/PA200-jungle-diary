import { FC, useEffect, useState } from 'react';

import { PlantCard } from '../components/PlantCard';
import { useUser } from '../hooks/useUser';
import { PlantType } from '../types/PlantType';
import { fetchUserPlants } from '../repository/fetchUserPlants';

export const Plants: FC = () => {
	const user = useUser();
	const [userPlants, setUserPlants] = useState<PlantType[]>([]);

	useEffect(() => {
		const getUserPlants = async () => {
			if (user) {
				const plants = await fetchUserPlants(user.email as string);
				setUserPlants(plants);
			}
		};
		getUserPlants();
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
