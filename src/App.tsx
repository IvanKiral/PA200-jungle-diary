import { Navigate } from 'react-router';

import { Layout } from './components/Layout';
import { useUser } from './hooks/useUser';

const App = () => {
	const user = useUser();

	if (!user) {
		return <Navigate to="/login" />;
	}

	return <Layout />;
};

export default App;
