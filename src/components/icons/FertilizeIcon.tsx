import { FC } from 'react';

type FertilizeIconProps = {
	className?: string;
};

export const FertilizeIcon: FC<FertilizeIconProps> = ({ className }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		className={className}
		height="48"
		viewBox="0 96 960 960"
		width="48"
	>
		<path d="M172 936q-41.777 0-59.388-39Q95 858 124 826l248-280V276h-52q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T320 216h320q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T640 276h-52v270l248 280q29 32 11.388 71-17.611 39-59.388 39H172Zm-12-60h640L528 568V276h-96v292L160 876Zm318-300Z" />
	</svg>
);
