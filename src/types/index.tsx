export type PlantType = {
	name: string;
	image: string;
	lastWater: string;
	nextWater: string;
	waterInterval: number;
	lastRepot: string;
	nextRepot: string;
	repotInterval: number;
	lastFertilize: string;
	nextFertilize: string;
	fertilizeInterval: number;
};

export type NewPlantFormData = {
	name: string;
	image: File[];
	lastWater: string;
	waterInterval: number;
	lastRepot: string;
	repotInterval: number;
	lastFertilize: string;
	fertilizeInterval: number;
};
