import { FC } from 'react';

import { WaterIcon } from './icons/WaterIcon';
import { PlantPotIcon } from './icons/PlantPotIcon';
import { FertilizeIcon } from './icons/FertilizeIcon';

type TaskFlagProps = {
	type: 'water' | 'repot' | 'fertilize';
	text: string;
	extraClasses?: string;
};

export const TaskFlag: FC<TaskFlagProps> = props => {
	let styles = 'bg-blue-300 text-blue-900';
	let icon = <WaterIcon className="w-5 h-5 fill-blue-900" />;
	if (props.type === 'repot') {
		styles = 'bg-amber-200 text-yellow-700';
		icon = <PlantPotIcon className="w-5 h-5 fill-yellow-700" />;
	} else if (props.type === 'fertilize') {
		styles = 'bg-red-300 text-red-700';
		icon = <FertilizeIcon className="w-5 h-5 fill-red-700" />;
	}
	return (
		<div
			className={`${styles} ${props.extraClasses} rounded-sm mb-[2px] truncate ps-1 flex flex-row items-center gap-1"`}
		>
			{icon}
			{props.text}
		</div>
	);
};
