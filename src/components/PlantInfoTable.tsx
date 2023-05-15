import { FC } from 'react';

import { PlantType } from '../types/PlantType';

type PlantInfoTableProps = {
	plant: PlantType;
};

export const PlantInfoTable: FC<PlantInfoTableProps> = ({ plant }) => (
	<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
		<thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-zinc-600 dark:text-gray-400">
			<tr>
				<th scope="col" className="px-6 py-3" />
				<th scope="col" className="px-6 py-3">
					Last
				</th>
				<th scope="col" className="px-6 py-3">
					Next
				</th>
				<th scope="col" className="px-6 py-3">
					Interval
				</th>
			</tr>
		</thead>
		<tbody className="bg-gray-200">
			<tr className="bg-white border-b dark:bg-zinc-700 dark:border-gray-800 whitespace-nowrap">
				<th
					scope="row"
					className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
				>
					Watering
				</th>
				<td className="px-6 py-4">{plant?.lastWater}</td>
				<td className="px-6 py-4">{plant?.nextWater}</td>
				<td className="px-6 py-4">every {plant?.waterInterval} days</td>
			</tr>
			<tr className="bg-white border-b dark:bg-zinc-700 dark:border-gray-800 whitespace-nowrap">
				<th
					scope="row"
					className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
				>
					Fertilizing
				</th>
				<td className="px-6 py-4">{plant?.lastFertilize}</td>
				<td className="px-6 py-4">{plant?.nextFertilize}</td>
				<td className="px-6 py-4">every {plant?.fertilizeInterval} weeks</td>
			</tr>
			<tr className="bg-white dark:bg-zinc-700 whitespace-nowrap">
				<th
					scope="row"
					className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
				>
					Repotting
				</th>
				<td className="px-6 py-4">{plant?.lastRepot}</td>
				<td className="px-6 py-4">{plant?.nextRepot}</td>
				<td className="px-6 py-4">every {plant?.repotInterval} years</td>
			</tr>
		</tbody>
	</table>
);
