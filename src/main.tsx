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
import { Plants } from './pages/Plants.tsx';
import { CalendarPage } from './pages/CalendarPage.tsx';
import { PlantDetail } from './pages/PlantDetails.tsx';
import { Login } from './pages/Login.tsx';
import { UserProvider } from './hooks/useUser.tsx';

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
				path: 'plants',
				element: <Plants />
			},
			{
				path: 'plants/:plantId',
				element: <PlantDetail />
			},
			{
				path: 'calendar',
				element: <CalendarPage />
			}
		]
	},
	{
		path: '/login',
		element: <Login />
	}
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<UserProvider>
			<RouterProvider router={router} />
		</UserProvider>
	</React.StrictMode>
);
