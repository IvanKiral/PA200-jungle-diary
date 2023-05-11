import { FC, useEffect, useState } from 'react';

import { useTheme } from '../hooks/useTheme';

type ToggleProps = {
	text?: string;
};

export const Toggle: FC<ToggleProps> = ({ text }) => {
	const [theme, setTheme] = useTheme();
	const [toggled, setToggled] = useState(theme === 'dark');

	useEffect(() => {
		setTheme(toggled ? 'dark' : 'light');
	}, [toggled]);

	return (
		<div className="h-fit">
			<label className="relative inline-flex items-center cursor-pointer">
				<input
					type="checkbox"
					value=""
					checked={toggled}
					onClick={() => setToggled(prev => !prev)}
					className="sr-only peer m-0"
				/>
				<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-300 dark:peer-checked:bg-emerald-500 dark:md:peer-checked:bg-emerald-600" />
				{text && (
					<span className="block ml-3 text-white dark:text-white text-md">
						{text}
					</span>
				)}
			</label>
		</div>
	);
};
