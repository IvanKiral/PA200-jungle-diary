import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { User } from 'firebase/auth';

import { storage } from '../firestore';

export const uploadImage = async (files: File[], user: User) => {
	const file = files[0];

	if (!file) {
		throw new Error('No file provided');
	}

	const storageRef = ref(storage, `${user.email}/${Date.now()}-${file.name}`);
	await uploadBytes(storageRef, file);

	const downloadURL = await getDownloadURL(storageRef);
	return downloadURL;
};
