import { logout } from '../../pages/auth/service';
import Button from './Button';
import { useState } from 'react';
import Confirm from './ConfirmButton';
import { authLogout } from '../../store/actions';
import { useAppDispatch } from '../../store';

export default function AuthButton() {
	const dispatch = useAppDispatch();
	const [isClicked, setIsClicked] = useState(false);
	const onLogout = async () => {
		logout();
		dispatch(authLogout());
	};

	const handleSubmit = () => {
		logout();
		onLogout();
	};

	return isClicked ? (
		<Confirm
			titlePrimary="Mantenerme iniciado"
			titleSecondary="Cerrar sesión"
			setIsClicked={setIsClicked}
			handleSubmit={handleSubmit}
		></Confirm>
	) : (
		<div>
			<Button onClick={() => setIsClicked(true)} $variant="secondary">
				Logout
			</Button>
		</div>
	);
}
