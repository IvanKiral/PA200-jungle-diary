/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { FC, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { InputField } from '../components/InputField';
import { signUp, signIn } from '../firestore';

export const Login: FC = () => {
	const [register, setRegister] = useState(false);

	const navigate = useNavigate();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		console.log(email);
		try {
			register ? await signUp(email, password) : await signIn(email, password);
			navigate('/');
		} catch (err) {
			setError(
				(err as { message?: string })?.message ?? 'Unknown error occurred'
			);
		}
	};

	return (
		<div className="bg-emerald-500 h-screen w-screen flex justify-center items-center">
			<form
				className="bg-gray-100 w-5/6 sm:w-4/6 md:w-3/6 lg:w-2/6 rounded-lg shadow-lg p-4 flex flex-col gap-4 "
				onSubmit={handleSubmit}
			>
				<h1 className="text-2xl text-green-600">
					{register ? 'Register' : 'Login'}
				</h1>
				<InputField
					id="email"
					type="email"
					labelTitle="Email"
					placeholder="example@email.com"
					value={email}
					onChange={e => setEmail(e.target.value)}
				/>
				<InputField
					id="password"
					labelTitle="Password"
					placeholder="example@email.com"
					type="password"
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
				<button
					type="submit"
					className="focus:outline-none text-white bg-emerald-500 hover:bg-emerald-600 focus:ring-2 focus:ring-emerald-400 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
				>
					{register ? 'Register' : 'Login'}
				</button>

				<p
					className="text-green-600 self-center hover:text-green-500 cursor-pointer"
					onClick={() => {
						setError('');
						setRegister(prev => !prev);
					}}
				>
					{register
						? 'Already have an account? Log in'
						: "Don't have an account? Sign up!"}
				</p>

				{error && <p className="text-red-500 self-center text-sm">{error}</p>}
			</form>
		</div>
	);
};
