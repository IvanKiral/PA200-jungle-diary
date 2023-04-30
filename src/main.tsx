import React from 'react';
import ReactDOM from 'react-dom/client';
import {
	createBrowserRouter,
	RouterProvider,
	Navigate
} from 'react-router-dom';

import App from './App.tsx';
import './index.css';
import { Home } from './pages/Home.tsx';
import { About } from './pages/About.tsx';
import { Plants } from './pages/Plants.tsx';
import { Calendar } from './pages/Calendar.tsx';
import { PlantDetail } from './pages/PlantDetails.tsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <Navigate to="" />,
		children: [
			{
				path: '',
				element: <Home />
			},
			{
				path: 'about',
				element: <About />
			},
			{
				path: 'plants',
				element: <Plants />
			},
			{
				path: 'plants/:plantId',
				element: <PlantDetail />
			},
			{
				path: 'calendar',
				element: <Calendar />
			}
		]
	}
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
