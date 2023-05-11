import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { useUser } from '../hooks/useUser';
import { storage } from '../firestore';

export const uploadImage = async (files: File[]) => {
	const user = useUser();
	const file = files[0];

	if (!file) {
		throw new Error('No file provided');
	}

	const storageRef = ref(storage, `${user?.email}/${Date.now()}-${file.name}`);
	await uploadBytes(storageRef, file);

	const downloadURL = await getDownloadURL(storageRef);
	return downloadURL;
};
