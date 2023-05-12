import { forwardRef, InputHTMLAttributes } from 'react';

type InputFieldProps = {
	id: string;
	labelTitle: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
	({ id, labelTitle, type, ...props }, ref) => (
		<div>
			<label
				htmlFor={id}
				className="block mb-1 ml-1 text-sm font-medium text-green-600 dark:text-white"
			>
				{labelTitle}
			</label>
			<input
				type={type ?? 'text'}
				id={id}
				ref={ref}
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm w-full p-2.5 rounded-lg focus:outline-none focus:border-2 focus:ring-emerald-500 focus:border-emerald-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500"
				{...props}
			/>
		</div>
	)
);

InputField.displayName = 'InputField';
