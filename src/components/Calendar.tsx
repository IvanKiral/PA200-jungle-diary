import { Dayjs } from 'dayjs';
import { FC, ReactElement } from 'react';

import { months, daysInWeek } from '../utils/dateUtils';

import { ArrowIcon } from './icons/ArrowIcon';
import { TaskFlag } from './TaskFlag';

type ReminderType = 'water' | 'fertilize' | 'repot';

export type CalendarDaysWithReminders = Record<
	number,
	Record<ReminderType, string[]>
>;

type CalendarProps = {
	previousMonthDays: number[];
	currentMonthDays: CalendarDaysWithReminders;
	nextMonthDays: number[];
	selectedDate: Dayjs;
	setSelectedDate: (date: Dayjs) => void;
};

export const Calendar: FC<CalendarProps> = ({
	previousMonthDays,
	currentMonthDays,
	nextMonthDays,
	selectedDate,
	setSelectedDate
}) => {
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
				<h1 className="text-3xl">{`${
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

				{previousMonthDays.map(day =>
					renderDisabledCalendarWindow(
						day,
						selectedDate.subtract(1, 'month').month()
					)
				)}

				{Object.entries(currentMonthDays).map(([day, tasks]) => (
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
									key={`${plantName}-${day}`}
									type="water"
									text={plantName}
								/>
							))}
							{tasks.repot.map(plantName => (
								<TaskFlag
									key={`${plantName}-${day}`}
									type="repot"
									text={plantName}
								/>
							))}
							{tasks.fertilize.map(plantName => (
								<TaskFlag
									key={`${plantName}-${day}`}
									type="fertilize"
									text={plantName}
								/>
							))}
						</div>
					</div>
				))}

				{nextMonthDays.map(day =>
					renderDisabledCalendarWindow(
						day,
						selectedDate.add(1, 'month').month()
					)
				)}
			</div>
		</div>
	);
};
