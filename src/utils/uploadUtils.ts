import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { storage } from '../firestore';

export const uploadImage = async (file: File, userEmail: string) => {
	if (!file) {
		throw new Error('No file provided');
	}
	const imageName = `${userEmail}/${Date.now()}-${file.name}`;
	const storageRef = ref(storage, imageName);
	await uploadBytes(storageRef, file);

	const downloadURL = await getDownloadURL(storageRef);
	return { url: downloadURL, name: imageName };
};
