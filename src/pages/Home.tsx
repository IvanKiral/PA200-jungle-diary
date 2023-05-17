import { FC, useEffect, useState } from 'react';

import { useUser } from '../hooks/useUser';
import { PlantCard } from '../components/PlantCard';
import {
	PlantsOrderBy,
	fetchUserPlantsWithOrdering
} from '../repository/fetchUserPlantsWithOrdering';
import { PlantAction } from '../types/PlantAction';
import { PlantDocType } from '../types/PlantDocType';

export const Home: FC = () => {
	const user = useUser();
	const [tab, setTab] = useState<PlantAction>('water');
	const [userPlants, setUserPlants] = useState<PlantDocType[]>([]);

	useEffect(() => {
		let orderParameter: PlantsOrderBy = 'nextWater';
		if (tab === 'fertilize') {
			orderParameter = 'nextFertilize';
		}
		if (tab === 'repot') {
			orderParameter = 'nextRepot';
		}

		const getUserPlants = async () => {
			const plants = await fetchUserPlantsWithOrdering(
				user?.email ?? '',
				orderParameter
			);

			setUserPlants(plants);
		};

		getUserPlants();
	}, [tab]);

	return (
		<div className="flex flex-col gap-4 pb-4">
			<div className="flex gap-4 items-center">
				<h1 className="font-semibold text-4xl">
					Welcome{' '}
					<span className="text-emerald-500 dark:text-emerald-700">
						{user?.email}
					</span>
					!
				</h1>
			</div>

			<ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
				<li className="mr-2">
					<a
						href="#water"
						onClick={() => setTab('water')}
						className={`inline-block p-4 text-emerald-500 ${
							tab === 'water' && 'bg-gray-100 dark:bg-neutral-700'
						} dark:text-emerald-700`}
					>
						Upcoming watering
					</a>
				</li>
				<li className="mr-2">
					<a
						href="#fertilize"
						onClick={() => setTab('fertilize')}
						className={`inline-block p-4 text-emerald-500 ${
							tab === 'fertilize' && 'bg-gray-100 dark:bg-neutral-700'
						} dark:text-emerald-700`}
					>
						Upcoming fertilization
					</a>
				</li>
				<li className="mr-2">
					<a
						href="#repot"
						onClick={() => setTab('repot')}
						className={`inline-block p-4 text-emerald-500 ${
							tab === 'repot' && 'bg-gray-100 dark:bg-neutral-700'
						} dark:text-emerald-700`}
					>
						Upcoming repotting
					</a>
				</li>
			</ul>

			<div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-4">
				{userPlants.map(p => (
					<PlantCard key={p.id} plant={p} />
				))}
			</div>
		</div>
	);
};
