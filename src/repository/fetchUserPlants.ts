import { query, collection, where, getDocs } from '@firebase/firestore';

import { db } from '../firestore';
import { PlantType } from '../types/PlantType';

export const fetchUserPlants = async (email: string) => {
	const q = query(collection(db, 'plants'), where('userEmail', '==', email));

	const querySnapshot = await getDocs(q);
	const plantData = querySnapshot.docs.map(doc => doc.data() as PlantType);

	return plantData;
};
