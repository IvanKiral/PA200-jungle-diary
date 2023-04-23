import { FC, useState } from 'react';

/* eslint-disable jsx-a11y/anchor-is-valid */
const FlowerLogo: FC = () => (
	<svg
		className="ionicon h-9 fill-emerald-500 hover:fill-emerald-400 max-w-fit inline"
		viewBox="0 0 512 512"
	>
		<path d="M429.55 119.49a16 16 0 0 0-17.06-7.1c-18.64 4.19-37.06 9-54.73 14.22-35.06 10.39-69.33 23.92-107.85 42.59-18.62 9.05-26 13.35-48 26.13l-4.5 2.67c-32.95 19-57.09 40-73.79 64.29C105.29 288.89 96 320 96 354.64c0 40.74 15.71 77.1 44.24 102.37C169 482.52 209.06 496 256 496c46.76 0 86.89-14.33 116-41.43 28.35-26.35 44-63.39 44-104.29 0-25-6.19-47-12.17-68.22-12.59-44.69-23.46-83.29 24.71-144.13a16 16 0 0 0 1.01-18.44zm-210.55.06C168.46 92.08 101.46 80.69 98.63 80.22A16 16 0 0 0 81 90.55a16.47 16.47 0 0 0 3.79 16.84c31.84 33.78 32.86 68.79 28.65 104.63a4.45 4.45 0 0 0 2.5 4.54 4.44 4.44 0 0 0 5.08-.9c16.39-16.51 36.37-31.52 60.4-45.39l4.48-2.6C208 154.8 216.23 150 236 140.41l2.69-1.3a4 4 0 0 0 .64-6.83A178.59 178.59 0 0 0 219 119.55zm15.26-28.1c3.44 1.87 7.09 4 10.9 6.29a189.31 189.31 0 0 1 29.57 22.39 4 4 0 0 0 4.28.76 672 672 0 0 1 69.65-25q7-2.07 14.08-4a4 4 0 0 0 2.53-5.62c-8.27-16.83-14.67-28.9-15.15-29.79A16 16 0 0 0 336 48c-1.91 0-33.28.36-76.87 21.3a279 279 0 0 0-26.39 14.51 4 4 0 0 0 .22 6.94zm-24.93-30.66c7.3-4.77 14.74-9.22 22.25-13.31a2 2 0 0 0 .24-3.36c-26-19.57-49.73-27-51.15-27.42a16 16 0 0 0-17.56 5.82 217.63 217.63 0 0 0-19.28 32.38 2 2 0 0 0 1.29 2.81c13.61 3.57 29.4 8.29 45.61 14.29a2 2 0 0 0 1.79-.2z" />
	</svg>
);

type MenuIconProps = {
	isToggled: boolean;
	setIsToggled: () => void;
};

const MenuIcon: FC<MenuIconProps> = ({ isToggled, setIsToggled }) => (
	<svg
		id="button"
		onClick={setIsToggled}
		className={`transition-all delay-25 ease-linear h-9 rounded-full inline justify-self-end stroke-emerald-500 md:hidden ${
			isToggled && 'bg-gray-100 shadow-xl'
		}`}
		viewBox="0 0 512 512"
	>
		<path
			strokeLinecap="round"
			strokeMiterlimit="10"
			strokeWidth="32"
			d="M80 160h352M80 256h352M80 352h352"
		/>
	</svg>
);

export const NavBar: FC = () => {
	const [isToggled, setIsToggled] = useState<boolean>(false);

	return (
		<div className="sticky top-0 flex-auto md:max-w-fit flex flex-col max-h-screen">
			<div className="max-w-full md:max-w-fit bg-emerald-100 md:bg-emerald-00 h-16 flex gap-2 items-center pr-4 justify-between md:justify-normal">
				<FlowerLogo />
				<h1 className="text-emerald-500 text-3xl font-extrabold inline truncate">
					Jungle Diary
				</h1>

				<MenuIcon
					isToggled={isToggled}
					setIsToggled={() => setIsToggled(prev => !prev)}
				/>
			</div>

			<div
				id="navbar"
				className={`absolute top-16 ${
					!isToggled && 'hidden'
				} md:relative md:top-0 md:block md:h-full md:opacity-100 w-full opacity-60 bg-emerald-100 pb-8 md:pb-4`}
			>
				<ul className="flex flex-col gap-8 md:gap-3 pt-12 md:pt-6 h-full items-center auto-rows-min">
					<li className="text-emerald-500">
						<a href="#" className="text-xl md:text-lg hover:text-emerald-400">
							Home
						</a>
					</li>
					<li className="text-emerald-500">
						<a href="#" className="text-xl md:text-lg hover:text-emerald-400">
							About
						</a>
					</li>
					<li className="text-emerald-500">
						<a href="#" className="text-xl md:text-lg hover:text-emerald-400">
							Flowers
						</a>
					</li>
					<li className="text-emerald-500">
						<a href="#" className="text-xl md:text-lg hover:text-emerald-400">
							Calendar
						</a>
					</li>
					<span className="grow" />
					<li className="text-emerald-500 ">
						<a
							href="#"
							className="text-xl md:text-lg hover:text-emerald-400 self-end"
						>
							Logout
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
};
