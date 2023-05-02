import { User } from 'firebase/auth';
import {
	FC,
	PropsWithChildren,
	createContext,
	useContext,
	useEffect,
	useState
} from 'react';

import { onAuthChanged } from '../firestore';

const UserContext = createContext<User | undefined | null>(undefined as never);

export const useUser = () => useContext(UserContext);

export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
	const [user, setUser] = useState<User | null>();

	useEffect(() => {
		onAuthChanged(u => setUser(u ?? null));
	}, []);

	return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
