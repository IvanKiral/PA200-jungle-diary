import { Dayjs } from 'dayjs';
import { FC } from 'react';

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
}) => (
	<div className="max-h-min verflow-x-scroll w-full">
		<div className="flex flex-row w-full">
			<h1 className="text-3xl">{`${
				months[selectedDate.month()]
			} ${selectedDate.year()}`}</h1>
			<div className="grow" />
			<button
				type="button"
				onClick={() => setSelectedDate(selectedDate.subtract(1, 'month'))}
				className="text-emerald-500 border border-emerald-500 hover:bg-emerald-500 hover:text-white font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2"
			>
				<ArrowIcon className="w-4 h-4 rotate-180" />
			</button>
			<button
				type="button"
				onClick={() => setSelectedDate(selectedDate.add(1, 'month'))}
				className="text-emerald-500 border border-emerald-500 hover:bg-emerald-500 hover:text-white font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
			>
				<ArrowIcon className="w-4 h-4" />
			</button>
		</div>
		<div className="grid grid-cols-[repeat(7,150px)] md:grid-cols-7 o min-w-fit auto-cols-auto">
			{daysInWeek.map(day => (
				<p key={day} className="text-xl">
					{day}
				</p>
			))}
			{previousMonthDays.map(i => (
				<div
					key={`${selectedDate.subtract(1, 'month').month()}-${i}`}
					className="border min-h-[124px] p-1 bg-gray-100 cursor-not-allowed"
				>
					<p>{i}</p>
				</div>
			))}
			{Object.entries(currentMonthDays).map(([day, tasks]) => (
				<div
					key={`${selectedDate.month()}-${day}`}
					className="border min-h-[124px] p-1"
				>
					<div className="w-full">
						<p>{day}</p>
					</div>
					<div className="pt-1">
						{tasks.water.map(task => (
							<div
								key={`water-${day}-${task}`}
								className="bg-blue-300 rounded-sm mb-[2px] text-blue-900 truncate ps-1 flex flex-row items-center gap-1"
							>
								<WaterIcon className="w-5 h-5 fill-blue-900" />
								{task}
							</div>
						))}
						{tasks.repot.map(task => (
							<div
								key={`repot-${day}-${task}`}
								className="bg-amber-200 rounded-sm mb-[2px] text-yellow-700 truncate ps-1 flex flex-row items-center gap-1"
							>
								<PlantPotIcon className="w-5 h-5 fill-yellow-700" />
								{task}
							</div>
						))}
						{tasks.fertilize.map(task => (
							<div
								key={`fertilize-${day}-${task}`}
								className="bg-red-300 rounded-sm mb-[2px] text-red-700 truncate ps-1 flex flex-row items-center gap-1"
							>
								<FertilizeIcon className="w-5 h-5 fill-red-700" />
								{task}
							</div>
						))}
					</div>
				</div>
			))}
			{nextMonthDays.map(i => (
				<div
					key={`${selectedDate.add(1, 'month').month()}-${i}`}
					className="border min-h-[124px] p-1 bg-gray-100 cursor-not-allowed"
				>
					<p>{i}</p>
				</div>
			))}
		</div>
	</div>
);
