import { FC } from 'react';

import { NavBar } from './NavBar';

export const Layout: FC = () => (
	<div className="md:flex md:flex-row min-w-full min-h-screen">
		<NavBar />
		<div className="pt-4 ps-4" />
	</div>
);
