import { FC } from 'react';

type WaterIconProps = {
	className?: string;
};

export const WaterIcon: FC<WaterIconProps> = ({ className }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		className={className}
		height="48"
		viewBox="0 96 960 960"
		width="48"
	>
		<path d="M479 848q16 0 24.5-5.5T512 826q0-11-8.5-17t-25.5-6q-42 0-85.5-26.5T337 683q-2-9-9-14.5t-15-5.5q-11 0-17 8.5t-4 17.5q15 84 71 121.5T479 848Zm1 128q-137 0-228.5-94T160 648q0-100 79.5-217.5T480 176q161 137 240.5 254.5T800 648q0 140-91.5 234T480 976Zm0-60q112 0 186-76.5T740 648q0-79-66.5-179.5T480 256Q353 368 286.5 468.5T220 648q0 115 74 191.5T480 916Zm0-340Z" />
	</svg>
);
