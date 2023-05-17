import dayjs from 'dayjs';
import { FC, useEffect, useState } from 'react';

import { Calendar } from '../components/Calendar';
import { useUser } from '../hooks/useUser';
import { PlantType } from '../types/PlantType';
import { fetchUserPlants } from '../repository/fetchUserPlants';

export const CalendarPage: FC = () => {
	const [selectedDate, setSelectedDate] = useState(dayjs().startOf('day'));
	const user = useUser();
	const [userPlants, setUserPlants] = useState<PlantType[]>([]);

	useEffect(() => {
		const getUserPlants = async () => {
			if (user) {
				const plants = await fetchUserPlants(user.email as string);
				setUserPlants(plants);
			}
		};
		getUserPlants();
	}, [user]);

	return (
		<div className="w-full">
			<Calendar
				selectedDate={selectedDate}
				setSelectedDate={date => setSelectedDate(date)}
				userPlants={userPlants}
			/>
		</div>
	);
};
