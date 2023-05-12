import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addDoc, collection } from 'firebase/firestore';

import { plantSchema } from '../validation/plant';
import { uploadImage } from '../utils/uploadUtils';
import { NewPlantFormData } from '../types/NewPlantFormData';
import { db } from '../firestore';
import { useUser } from '../hooks/useUser';
import { defaultToday } from '../utils/dateUtils';

import { InputField } from './InputField';

type NewPlantFormProps = {
	setShowModal: (bool: boolean) => void;
};

export const NewPlantForm: FC<NewPlantFormProps> = ({ setShowModal }) => {
	const today = defaultToday();

	const user = useUser();

	if (!user) {
		return <p>Unauthorized</p>;
	}
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<NewPlantFormData>({
		resolver: zodResolver(plantSchema)
	});

	const onSubmit = async (data: NewPlantFormData) => {
		try {
			const imageUrl = await uploadImage(data.image[0], user.email ?? '');
			setShowModal(false);
			await addDoc(collection(db, 'plants'), {
				...data,
				image: imageUrl,
				userEmail: user?.email
			});
		} catch (error) {
			console.error('Error uploading image or saving document: ', error);
		}
	};

	return (
		<>
			<div className="justify-center items-center flex overflow-y-scroll fixed inset-0 z-50 outline-none focus:outline-none">
				<div className="relative w-auto my-6 mx-auto max-w-3xl">
					{/*content*/}
					<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
						{/*header*/}
						<div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
							<h3 className="text-2xl font-semibold">Add new plant</h3>
							<button
								className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
								onClick={() => setShowModal(false)}
							>
								<span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
									×
								</span>
							</button>
						</div>
						{/*body*/}
						<div className="relative p-6 flex-auto">
							<form
								id="newPlantForm"
								onSubmit={handleSubmit(onSubmit)}
								className="flex flex-col sm:flex-row"
							>
								<div className="flex flex-col sm:p-3">
									<InputField
										id="name"
										labelTitle="Name"
										{...register('name')}
									/>
									<p className="text-red-600">{errors.name?.message}</p>
									<InputField
										id="image"
										labelTitle="Image"
										type="file"
										{...register('image')}
									/>
									<p className="text-red-600">{errors.image?.message}</p>
									<InputField
										id="lastWatered"
										labelTitle="Last watered"
										type="date"
										defaultValue={today}
										{...register('lastWater')}
									/>
									<p className="text-red-600">{errors.lastWater?.message}</p>
									<InputField
										id="lastFertilized"
										labelTitle="Last fertilized"
										type="date"
										defaultValue={today}
										{...register('lastFertilize')}
									/>
									<p className="text-red-600">
										{errors.lastFertilize?.message}
									</p>
									<InputField
										id="lastRepotted"
										labelTitle="Last repotted"
										type="date"
										defaultValue={today}
										{...register('lastRepot')}
									/>
									<p className="text-red-600">{errors.lastRepot?.message}</p>
								</div>
								<div className="flex flex-col sm:p-3">
									<InputField
										id="waterInterval"
										labelTitle="Watering interval (days)"
										type="number"
										defaultValue={7}
										{...register('waterInterval')}
									/>
									<p className="text-red-600">
										{errors.waterInterval?.message}
									</p>
									<InputField
										id="fertilizeInterval"
										labelTitle="Fertilizing interval (weeks)"
										type="number"
										defaultValue={4}
										{...register('fertilizeInterval')}
									/>
									<p className="text-red-600">
										{errors.fertilizeInterval?.message}
									</p>
									<InputField
										id="repotInterval"
										labelTitle="Repotting interval (years)"
										type="number"
										defaultValue={2}
										{...register('repotInterval')}
									/>
									<p className="text-red-600">
										{errors.repotInterval?.message}
									</p>
								</div>
							</form>
						</div>
						{/*footer*/}
						<div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
							<button
								className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
								type="button"
								onClick={() => setShowModal(false)}
							>
								Cancel
							</button>
							<button
								className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
								type="submit"
								form="newPlantForm"
							>
								Add
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="opacity-25 fixed inset-0 z-40 bg-black" />
		</>
	);
};
