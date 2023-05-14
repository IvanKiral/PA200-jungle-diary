import { PlantType } from './PlantType';

export type ActionFields = {
	lastField: keyof PlantType;
	nextField: keyof PlantType;
	intervalField: keyof PlantType;
};
