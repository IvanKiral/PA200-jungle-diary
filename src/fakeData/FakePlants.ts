export type PlantType = {
	name: string;
	nextWater: string;
	waterInterval: number;
	nextRepot: string;
	repotInterval: number;
	nextFertilize: string;
	fertilizeInterval: number;
};

export const examplePlants: PlantType[] = [
	{
		name: 'kvietocek',
		nextWater: '2023-05-03',
		waterInterval: 5,
		nextRepot: '2023-05-06',
		repotInterval: 7,
		nextFertilize: '2023-05-12',
		fertilizeInterval: 10
	},
	{
		name: 'muchotravka',
		nextWater: '2023-05-03',
		waterInterval: 7,
		nextRepot: '2023-05-06',
		repotInterval: 7,
		nextFertilize: '2023-05-08',
		fertilizeInterval: 12
	}
];
