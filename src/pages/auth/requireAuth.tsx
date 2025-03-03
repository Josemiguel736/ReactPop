import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../store';
import { getIsLogged } from '../../store/selectors';

function RequireAuth({ children }: { children: ReactNode }) {
	{
		const isLogged = useAppSelector(getIsLogged);
		const location = useLocation();
		return isLogged ? (
			children
		) : (
			<Navigate to="/login" replace state={{ from: location.pathname }} />
		);
	}
}

export default RequireAuth;
