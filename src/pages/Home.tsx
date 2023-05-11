import { FC, useState } from 'react';

import { useUser } from '../hooks/useUser';
import { Toggle } from '../components/Toggle';

type HomeTabs = 'water' | 'fertilize' | 'repot';

export const Home: FC = () => {
	const user = useUser();
	const [tab, setTab] = useState<HomeTabs>('water');

	return (
		<div className="flex flex-col gap-8">
			<h1 className="text-4xl">
				Welcome back{' '}
				<span className="text-emerald-500 dark:text-emerald-700">
					{user?.email}
				</span>
				!
			</h1>
			<Toggle text="Dark Mode" />
			<h2 className="text-3xl">Let&apos;s see how your plants are doing.</h2>

			<ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
				<li className="mr-2">
					<a
						href="#water"
						onClick={() => setTab('water')}
						className={`inline-block p-4 text-emerald-500 ${
							tab === 'water' && 'bg-gray-100 dark:bg-neutral-700'
						} dark:text-emerald-700`}
					>
						Soonest to water
					</a>
				</li>
				<li className="mr-2">
					<a
						href="#fertilize"
						onClick={() => setTab('fertilize')}
						className={`inline-block p-4 text-emerald-500 ${
							tab === 'fertilize' && 'bg-gray-100 dark:bg-neutral-700'
						} dark:text-emerald-700`}
					>
						Soonest to fertilize
					</a>
				</li>
				<li className="mr-2">
					<a
						href="#repot"
						onClick={() => setTab('repot')}
						className={`inline-block p-4 text-emerald-500 ${
							tab === 'repot' && 'bg-gray-100 dark:bg-neutral-700'
						} dark:text-emerald-700`}
					>
						Soonest to repot
					</a>
				</li>
			</ul>
		</div>
	);
};
