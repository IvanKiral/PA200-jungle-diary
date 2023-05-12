import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { storage } from '../firestore';

export const uploadImage = async (file: File, userEmail: string) => {
	if (!file) {
		throw new Error('No file provided');
	}

	const storageRef = ref(storage, `${userEmail}/${Date.now()}-${file.name}`);
	await uploadBytes(storageRef, file);

	const downloadURL = await getDownloadURL(storageRef);
	return downloadURL;
};
