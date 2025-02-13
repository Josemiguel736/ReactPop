import { useAuth } from '../../pages/auth/context';
import { logout } from '../../pages/auth/service';
import Button from './Button';
import { useState } from 'react';
import ConfirmLogout from './ConfirmButton';

export default function AuthButton() {
	const [isClicked, setIsClicked] = useState(false);
	const { onLogout } = useAuth();

	const handleSubmit = () => {
		logout();
		onLogout();
	};

	return isClicked ? (
		<ConfirmLogout
			titlePrimary="Mantenerme iniciado"
			titleSecondary="Cerrar sesión"
			setIsClicked={setIsClicked}
			handleSubmit={handleSubmit}
		></ConfirmLogout>
	) : (
		<div>
			<Button onClick={() => setIsClicked(true)} $variant="secondary">
				Logout
			</Button>
		</div>
	);
}
