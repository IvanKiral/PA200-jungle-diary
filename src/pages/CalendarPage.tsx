import dayjs, { Dayjs } from 'dayjs';
import { FC, useCallback, useMemo, useState } from 'react';

import { Calendar } from '../components/Calendar';
import { examplePlants } from '../fakeData/FakePlants';
import { range } from '../utils/listUtils';

export const CalendarPage: FC = () => {
	const [selectedDate, setSelectedDate] = useState(dayjs().startOf('day'));

	const getDaysToDisplay = useCallback(() => {
		const previousMonth = selectedDate.subtract(1, 'month');

		const firstDayInMonth =
			selectedDate.startOf('month').day() === 0
				? 7
				: selectedDate.startOf('month').day();

		const previousMonthDays = range(
			previousMonth.daysInMonth() - (firstDayInMonth - 1) + 1,
			previousMonth.daysInMonth()
		);

		const thisMonthRange = Object.fromEntries(
			range(1, selectedDate.daysInMonth()).map(num => [
				num,
				{
					water: [] as string[],
					repot: [] as string[],
					fertilize: [] as string[]
				}
			])
		);
		const nextMonthDays = range(
			1,
			7 - ((selectedDate.daysInMonth() + previousMonthDays.length) % 7)
		);

		return { previousMonthDays, thisMonthRange, nextMonthDays };
	}, [selectedDate]);

	const calculate_interval_start = useCallback(
		(nextTaskDate: Dayjs, interval: number) => {
			const startOfSelectedMonth = selectedDate.startOf('month');
			const numberOfDays = startOfSelectedMonth.diff(nextTaskDate, 'day');
			const intervals_remainder = numberOfDays % interval;
			const number_of_intervals =
				intervals_remainder > 0
					? Math.trunc(numberOfDays / interval) + 1
					: Math.trunc(numberOfDays / interval);

			return selectedDate.month() === nextTaskDate.month()
				? nextTaskDate
				: nextTaskDate.add(number_of_intervals * interval, 'day');
		},
		[selectedDate]
	);

	const calculateDays = (
		startDay: number,
		endDay: number,
		interval: number
	) => {
		let d = startDay;
		const result = [];
		while (d <= endDay) {
			result.push(d);
			d += interval;
		}
		return result;
	};

	const calculateReminders = useCallback(() => {
		const currentDate = dayjs();
		const result = getDaysToDisplay();

		if (
			selectedDate.month() < currentDate.month() &&
			selectedDate.year() <= currentDate.year()
		) {
			return result;
		}

		examplePlants.map(plant => {
			const nextWaterDate = dayjs(plant.nextWater);
			const nextFertilizeDate = dayjs(plant.nextFertilize);
			const nextRepotDate = dayjs(plant.nextRepot);

			if (nextWaterDate.unix() < currentDate.unix()) {
				if (selectedDate.month() === nextWaterDate.month()) {
					result.thisMonthRange[currentDate.date()].water.push(plant.name);
				}
			} else {
				const interval_start = calculate_interval_start(
					nextWaterDate,
					plant.waterInterval
				);
				const endOfSelectedMonth = selectedDate.endOf('month');
				calculateDays(
					interval_start.date(),
					endOfSelectedMonth.date(),
					plant.waterInterval
				).map(i => result.thisMonthRange[i].water.push(plant.name));
			}

			if (nextFertilizeDate.unix() < currentDate.unix()) {
				if (selectedDate.month() === nextFertilizeDate.month()) {
					result.thisMonthRange[currentDate.date()].fertilize.push(plant.name);
				}
			} else {
				const interval_start = calculate_interval_start(
					nextFertilizeDate,
					plant.fertilizeInterval
				);
				const endOfSelectedMonth = selectedDate.endOf('month');
				calculateDays(
					interval_start.date(),
					endOfSelectedMonth.date(),
					plant.fertilizeInterval
				).map(i => result.thisMonthRange[i].fertilize.push(plant.name));
			}

			if (nextRepotDate.unix() < currentDate.unix()) {
				if (selectedDate.month() === nextRepotDate.month()) {
					result.thisMonthRange[currentDate.date()].repot.push(plant.name);
				}
			} else {
				const interval_start = calculate_interval_start(
					nextRepotDate,
					plant.repotInterval
				);
				const endOfSelectedMonth = selectedDate.endOf('month');
				calculateDays(
					interval_start.date(),
					endOfSelectedMonth.date(),
					plant.repotInterval
				).map(i => result.thisMonthRange[i].repot.push(plant.name));
			}
		});
		return result;
	}, [selectedDate, getDaysToDisplay, calculate_interval_start]);

	const calendarDaysWithReminders = useMemo(
		() => calculateReminders(),
		[selectedDate, calculateReminders]
	);

	return (
		<div className="w-full">
			<Calendar
				selectedDate={selectedDate}
				setSelectedDate={date => setSelectedDate(date)}
				previousMonthDays={calendarDaysWithReminders.previousMonthDays}
				currentMonthDays={calendarDaysWithReminders.thisMonthRange}
				nextMonthDays={calendarDaysWithReminders.nextMonthDays}
			/>
		</div>
	);
};
