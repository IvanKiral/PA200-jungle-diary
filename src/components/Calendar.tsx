import { Dayjs } from 'dayjs';
import { FC, ReactElement } from 'react';

import { months, daysInWeek } from '../utils/dateUtils';

import { ArrowIcon } from './icons/ArrowIcon';
import { FertilizeIcon } from './icons/FertilizeIcon';
import { WaterIcon } from './icons/WaterIcon';
import { PlantPotIcon } from './icons/PlantPotIcon';

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
			className="border min-h-[124px] p-1 bg-gray-100 cursor-not-allowed"
		>
			<p>{day}</p>
		</div>
	);

	const renderRoundButton = (onClick: () => void, icon: ReactElement) => (
		<button
			type="button"
			onClick={onClick}
			className="text-emerald-500 border border-emerald-500 hover:bg-emerald-500 hover:text-white font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2"
		>
			{icon}
		</button>
	);

	const renderRemainder = (
		plantName: string,
		day: string,
		backGroundColor: string,
		textColor: string,
		icon: ReactElement
	) => (
		<div
			key={`water-${day}-${plantName}`}
			className={`${backGroundColor} ${textColor} rounded-sm mb-[2px] truncate ps-1 flex flex-row items-center gap-1"`}
		>
			{icon}
			{plantName}
		</div>
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
							{tasks.water.map(plantName =>
								renderRemainder(
									plantName,
									day,
									'bg-blue-300',
									'text-blue-900',
									<WaterIcon className="w-5 h-5 fill-blue-900" />
								)
							)}
							{tasks.repot.map(plantName =>
								renderRemainder(
									plantName,
									day,
									'bg-amber-200',
									'text-yellow-700',
									<PlantPotIcon className="w-5 h-5 fill-yellow-700" />
								)
							)}
							{tasks.fertilize.map(plantName =>
								renderRemainder(
									plantName,
									day,
									'bg-red-300',
									'text-red-700',
									<FertilizeIcon className="w-5 h-5 fill-red-700" />
								)
							)}
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
