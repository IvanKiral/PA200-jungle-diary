import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { signOut } from '../firestore';

import { Toggle } from './Toggle';

/* eslint-disable jsx-a11y/anchor-is-valid */
const LeafLogo: FC = () => (
	<svg
		className="h-9 fill-white hover:fill-emerald-4 inline"
		viewBox="0 0 512 512"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path d="M332.9 17.37c-11.7-.1-24.2 1.23-37.5 4.13-33.1 7.21-48.6 28.49-56.2 54.09 11.2 22.86 20.1 46.01 25 71.91-9.6-6.9-19.7-1.7-22.6 5-4.3-22.4-10-42.9-17.8-62.93-48.8-34.88-83-20.9-89.6-18.76C49.64 98.12 25.54 165.7 39.84 239.1c19.32-43.4 86.56-68.7 113.56-68.6 6.9.1 47 9.5 13.6 20-54.8 17.3-98.29 48.7-116.81 86 8.78 24.5 21.34 49.1 36.89 72.4 14.42-42 40.22-89 96.72-125.1 14.5-9.3 23.8.7 12.2 13.2-53.5 57.4-75.1 104.2-81 148.6 17.4 20.3 37.2 38.9 58.5 54.7 1.6-54.4 20.3-117.7 56.3-164.6 3.7-6.6 22-2.7 15.6 9-27.9 50.9-43.2 119.9-44.5 174 25.6 15.2 52.9 26.3 80.9 31.9-15.1-35.2-18.5-80.5-6.9-120.8 5.1-17.8 20.8-8.1 17.6 4.2-10 38.8 8.6 87.5 28.1 120.6 20.7.1 41.6-3.1 62.3-10.2 11.8-4 22.7-12.3 32.7-23.8-11.3-22.8-27-44.1-46.6-57.2-7.4-5-3.2-23.6 10.2-14.8 19.1 12.6 37.6 29.7 52.8 48.7 9.8-16.8 18.2-37 25-59.4-29.7-34.7-83.3-82-128.8-101.7-9.6-4.1-8.7-21.5 7.6-16.4 47.8 14.8 98 46.2 131.1 78 3.9-19.9 6.7-40.8 8.1-61.9-39-27.6-95.5-67.2-147.1-74.8-9.5-1.4-13.6-18.6 3-17.8 58.3 2.7 109.8 23.5 145.1 50.5-.5-28.6-3.6-56.7-9.7-82.9-41.7-13.6-113.5-18.5-141.5-6.1-11.1 4.9-29.9-4.8-6.8-16.6 37.6-22.1 94.5-22.8 138.3-11-21.3-57.97-60.7-99.32-123.4-99.83z" />
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
		className={`transition-all delay-25 ease-linear h-9 rounded-full inline justify-self-end stroke-white md:hidden ${
			isToggled && 'bg-emerald-400 shadow-xl'
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
	const navigate = useNavigate();

	return (
		<div className="sticky top-0 flex-auto md:max-w-fit flex flex-col max-h-screen z-10">
			<div className="max-w-full md:max-w-fit bg-emerald-500 dark:bg-emerald-700 md:bg-emerald-00 h-16 flex gap-2 items-center pr-4 justify-between md:justify-normal">
				<LeafLogo />
				<h1 className="text-white text-3xl font-extrabold inline truncate">
					Jungle Diary
				</h1>

				<MenuIcon
					isToggled={isToggled}
					setIsToggled={() => setIsToggled(prev => !prev)}
				/>
			</div>

			<div
				id="navbar"
				className={`fixed top-16 ${
					!isToggled && 'hidden'
				} md:relative md:top-0 md:block md:h-full md:opacity-100 w-full bg-emerald-400 md:bg-emerald-500 dark:bg-emerald-600 dark:md:bg-emerald-700 -z-10 pb-8 md:pb-4`}
			>
				<ul className="flex flex-col gap-8 md:gap-3 pt-12 md:pt-6 h-full items-center auto-rows-min">
					<li className="text-white">
						<Link
							to=""
							className="text-xl md:text-lg hover:text-emerald-400 dark:hover:text-emerald-500"
						>
							Home
						</Link>
					</li>
					<li className="text-white">
						<Link
							to="plants"
							className="text-xl md:text-lg hover:text-emerald-400 dark:hover:text-emerald-500"
						>
							Plants
						</Link>
					</li>
					<li className="text-white">
						<Link
							to="calendar"
							className="text-xl md:text-lg hover:text-emerald-400 dark:hover:text-emerald-500"
						>
							Calendar
						</Link>
					</li>
					<span className="grow" />
					<Toggle text="Dark Mode" />
					<li className="text-white ">
						<a
							href=""
							onClick={() => {
								signOut();
								navigate('/login');
							}}
							className="text-xl md:text-lg hover:text-emerald-400 self-end dark:hover:text-emerald-500"
						>
							Logout
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
};
