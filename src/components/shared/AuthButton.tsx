import { logout } from '../../pages/auth/service';
import Button from './Button';
import { useState } from 'react';
import ConfirmLogout from './ConfirmButton';
import { AuthLogout } from '../../store/actions';
import { useAppDispatch } from '../../store';

export default function AuthButton() {
	const dispatch = useAppDispatch()
	const [isClicked, setIsClicked] = useState(false);
	const  onLogout  = async () => {
		logout()
		dispatch(AuthLogout())
	}

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
