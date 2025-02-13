import { ReactNode, useState } from 'react';
import { AuthContext } from './context';

interface Props {
	defaultIsLogged: boolean;
	children: ReactNode;
}

export function AuthProvider({ defaultIsLogged, children }: Props) {
	const [isLogged, setIsLogged] = useState(defaultIsLogged);

	const handleLogin = () => {
		setIsLogged(true);
	};

	const handleLogout = () => {
		setIsLogged(false);
	};

	const authValue = {
		isLogged,
		onLogin: handleLogin,
		onLogout: handleLogout,
	};

	return (
		<AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
	);
}
