import { FC } from 'react';
import { Link } from 'react-router-dom';

type DeleteModalProps = {
	setShowModal: (bool: boolean) => void;
	handleDelete: () => void;
};

export const DeleteModal: FC<DeleteModalProps> = ({
	setShowModal,
	handleDelete
}) => (
	<div className="justify-center items-center flex overflow-y-scroll fixed inset-0 z-50 outline-none focus:outline-none">
		<div className="relative w-full max-w-md max-h-full">
			<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
				<div className="p-6 text-center">
					<h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
						Are you sure you want to delete this plant?
					</h3>
					<Link to="/plants">
						<button
							onClick={() => handleDelete()}
							type="button"
							className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
						>
							Yes, I&apos;m sure
						</button>
					</Link>
					<button
						onClick={() => setShowModal(false)}
						type="button"
						className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
					>
						No, cancel
					</button>
				</div>
			</div>
		</div>
	</div>
);
