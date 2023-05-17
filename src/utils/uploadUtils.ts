import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { storage } from '../firestore';

export const uploadImage = async (file: File, userEmail: string) => {
	if (!file) {
		return {
			url: 'https://firebasestorage.googleapis.com/v0/b/jungle-diary.appspot.com/o/default-placeholder.png?alt=media&token=1eef7d48-83ea-4432-9c38-cc77a8e9890c',
			name: 'default-placeholder.png'
		};
	}
	const imageName = `${userEmail}/${Date.now()}-${file.name}`;
	const storageRef = ref(storage, imageName);
	await uploadBytes(storageRef, file);

	const downloadURL = await getDownloadURL(storageRef);
	return { url: downloadURL, name: imageName };
};
