import { PlantType } from '../types/PlantType';

export const examplePlants: PlantType[] = [
	{
		name: 'kvietocek',
		image: 'placeholder',
		lastWater: '2023-03-03',
		lastFertilize: '2023-03-03',
		lastRepot: '2023-03-03',
		nextWater: '2023-05-04',
		waterInterval: 5,
		nextRepot: '2023-05-06',
		repotInterval: 730,
		nextFertilize: '2023-05-12',
		fertilizeInterval: 31
	},
	{
		name: 'muchotravka',
		image: 'placeholder',
		lastWater: '2023-03-03',
		lastFertilize: '2023-03-03',
		lastRepot: '2023-03-03',
		nextWater: '2023-05-05',
		waterInterval: 7,
		nextRepot: '2023-05-06',
		repotInterval: 365,
		nextFertilize: '2023-05-08',
		fertilizeInterval: 31
	}
];
