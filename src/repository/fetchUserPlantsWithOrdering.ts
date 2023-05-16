import {
	query,
	collection,
	where,
	getDocs,
	orderBy,
	limit
} from 'firebase/firestore';

import { db } from '../firestore';
import { PlantType } from '../types/PlantType';

export type PlantsOrderBy = 'nextWater' | 'nextFertilize' | 'nextRepot';

export const fetchUserPlantsWithOrdering = async (
	email: string,
	order: PlantsOrderBy
) => {
	const q = query(
		collection(db, 'plants'),
		where('userEmail', '==', email),
		orderBy(order),
		limit(4)
	);

	const querySnapshot = await getDocs(q);
	const plantData = querySnapshot.docs.map(doc => ({
		id: doc.id,
		data: doc.data() as PlantType
	}));

	return plantData;
};
