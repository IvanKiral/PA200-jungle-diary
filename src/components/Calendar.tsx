import dayjs, { Dayjs } from 'dayjs';
import { FC, ReactElement, useCallback, useMemo } from 'react';

import { months, daysInWeek } from '../utils/dateUtils';
import { range } from '../utils/listUtils';
import { PlantType } from '../types/PlantType';

import { ArrowIcon } from './icons/ArrowIcon';
import { TaskFlag } from './TaskFlag';

type ReminderType = 'water' | 'fertilize' | 'repot';

export type CalendarDaysWithReminders = Record<
	number,
	Record<ReminderType, string[]>
>;

type CalendarProps = {
	userPlants: PlantType[];
	selectedDate: Dayjs;
	setSelectedDate: (date: Dayjs) => void;
};

export const Calendar: FC<CalendarProps> = ({
	userPlants,
	selectedDate,
	setSelectedDate
}) => {
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

	const calculateIntervalStart = useCallback(
		(nextTaskDate: Dayjs, interval: number) => {
			const startOfSelectedMonth = selectedDate.startOf('month');
			const numberOfDays = startOfSelectedMonth.diff(nextTaskDate, 'day');
			const intervals_remainder = numberOfDays % interval;
			const number_of_intervals =
				intervals_remainder > 0
					? Math.trunc(numberOfDays / interval) + 1
					: Math.trunc(numberOfDays / interval);

			return selectedDate.month() === nextTaskDate.month() &&
				selectedDate.year() === nextTaskDate.year()
				? nextTaskDate
				: nextTaskDate.add(number_of_intervals * interval, 'day');
		},
		[selectedDate]
	);

	const calculateDays = (startDay: Dayjs, endDay: Dayjs, interval: number) => {
		if (startDay.unix() >= endDay.unix()) {
			return [];
		}

		let d = startDay.date();
		const result = [];
		while (d <= endDay.date()) {
			result.push(d);
			d += interval;
		}
		return result;
	};

	const calculateTaskDaysDate = (nextTaskDate: Dayjs, taskInterval: number) => {
		const endOfSelectedMonth = selectedDate.endOf('month').endOf('day');

		const interval_start =
			endOfSelectedMonth.unix() < nextTaskDate.unix()
				? nextTaskDate
				: calculateIntervalStart(nextTaskDate, taskInterval);

		return calculateDays(interval_start, endOfSelectedMonth, taskInterval);
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

		userPlants.map(plant => {
			const nextWaterDate = dayjs(plant.nextWater);
			const nextFertilizeDate = dayjs(plant.nextFertilize);
			const nextRepotDate = dayjs(plant.nextRepot);

			if (nextWaterDate.unix() < currentDate.unix()) {
				if (
					selectedDate.month() === nextWaterDate.month() &&
					selectedDate.year() === currentDate.year()
				) {
					result.thisMonthRange[currentDate.date()].water.push(
						`${plant.name} - overdue`
					);
				}
			} else {
				calculateTaskDaysDate(nextWaterDate, plant.waterInterval).map(i =>
					result.thisMonthRange[i].water.push(plant.name)
				);
			}

			if (
				nextFertilizeDate.unix() < currentDate.unix() &&
				selectedDate.year() === currentDate.year()
			) {
				if (selectedDate.month() === nextFertilizeDate.month()) {
					result.thisMonthRange[currentDate.date()].fertilize.push(
						`${plant.name} - overdue`
					);
				}
			} else {
				calculateTaskDaysDate(nextFertilizeDate, plant.fertilizeInterval).map(
					i => result.thisMonthRange[i].fertilize.push(plant.name)
				);
			}

			if (nextRepotDate.unix() < currentDate.unix()) {
				if (
					selectedDate.month() === nextRepotDate.month() &&
					selectedDate.year() === currentDate.year()
				) {
					result.thisMonthRange[currentDate.date()].repot.push(
						`${plant.name} - overdue`
					);
				}
			} else {
				calculateTaskDaysDate(nextRepotDate, plant.repotInterval).map(i =>
					result.thisMonthRange[i].repot.push(plant.name)
				);
			}
		});
		return result;
	}, [selectedDate, getDaysToDisplay, calculateIntervalStart, userPlants]);

	const calendarDaysWithReminders = useMemo(
		() => calculateReminders(),
		[selectedDate, calculateReminders]
	);

	const renderDisabledCalendarWindow = (day: number, month: number) => (
		<div
			key={`${month}-${day}`}
			className="border min-h-[124px] p-1 bg-gray-100 dark:bg-slate-700 cursor-not-allowed"
		>
			<p>{day}</p>
		</div>
	);

	const renderRoundButton = (onClick: () => void, icon: ReactElement) => (
		<button
			type="button"
			onClick={onClick}
			className="text-emerald-500 border border-emerald-500 hover:bg-emerald-500 dark:text-emerald-700 dark:border-emerald-700 dark:hover:bg-emerald-700 dark:hover:text-white hover:text-white font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2"
		>
			{icon}
		</button>
	);

	return (
		<div className="max-h-min verflow-x-scroll w-full">
			<div className="flex flex-row w-full">
				<h1 className="font-semibold text-4xl">{`${
					months[selectedDate.month()]
				} ${selectedDate.year()}`}</h1>

				<div className="grow" />
				{renderRoundButton(
					() => setSelectedDate(selectedDate.subtract(1, 'month')),
					<ArrowIcon className="w-4 h-4 rotate-180" />
				)}
				{renderRoundButton(
					() => setSelectedDate(selectedDate.add(1, 'month')),
					<ArrowIcon className="w-4 h-4" />
				)}
			</div>

			<div className="grid grid-cols-[repeat(7,150px)] md:grid-cols-7 o min-w-fit auto-cols-auto">
				{daysInWeek.map(day => (
					<p key={day} className="text-xl">
						{day}
					</p>
				))}

				{calendarDaysWithReminders.previousMonthDays.map(day =>
					renderDisabledCalendarWindow(
						day,
						selectedDate.subtract(1, 'month').month()
					)
				)}

				{Object.entries(calendarDaysWithReminders.thisMonthRange).map(
					([day, tasks]) => (
						<div
							key={`${selectedDate.month()}-${day}`}
							className="border min-h-[124px] p-1"
						>
							<div className="w-full">
								<p>{day}</p>
							</div>

							<div className="pt-1">
								{tasks.water.map(plantName => (
									<TaskFlag
										key={`water-${plantName}-${day}`}
										type="water"
										text={plantName}
									/>
								))}
								{tasks.repot.map(plantName => (
									<TaskFlag
										key={`repot-${plantName}-${day}`}
										type="repot"
										text={plantName}
									/>
								))}
								{tasks.fertilize.map(plantName => (
									<TaskFlag
										key={`fertilize-${plantName}-${day}`}
										type="fertilize"
										text={plantName}
									/>
								))}
							</div>
						</div>
					)
				)}

				{calendarDaysWithReminders.nextMonthDays.map(day =>
					renderDisabledCalendarWindow(
						day,
						selectedDate.add(1, 'month').month()
					)
				)}
			</div>
		</div>
	);
};
