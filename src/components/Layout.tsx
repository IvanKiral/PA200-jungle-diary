import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { NavBar } from './NavBar';

export const Layout: FC = () => (
	<div className="md:flex md:flex-row min-w-full min-h-screen">
		<NavBar />
		<div className="pt-6 ps-6 pr-6 grow">
			<Outlet />
		</div>
	</div>
);
