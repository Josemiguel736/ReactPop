import { useCallback, useEffect, useState } from 'react';
import FormField from '../../components/shared/FormField';
import Button from '../../components/shared/Button';
import { login } from './service';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './context';
import { validateEmail } from '../../utils/validate';
import { ApiClientError } from '../../api/error';
import { isApiClientError } from '../../api/client';
import ErrorSpan from '../../components/errors/ErrorSpan';
import ProgresIndicator from '../../assets/ProgressIndicator.gif';

function LoginPage() {
	const { onLogin } = useAuth();

	const location = useLocation();

	const navigate = useNavigate();

	const [error, setError] = useState<ApiClientError | null>(null);

	const [isLoading, setIsLoading] = useState(false);

	const [checked, setIsChecked] = useState(false);

	const [emailIsValid, validEmail] = useState(false);

	const [credentials, setCredentials] = useState({
		email: '',
		password: '',
	});

	const { email, password } = credentials;

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCredentials((credentials) => ({
			...credentials,
			[event.target.name]: event.target.value,
		}));
	};

	const handleValidateEmail = useCallback(() => {
		const isValid = validateEmail(email);
		validEmail(isValid);
	}, [email]);

	useEffect(() => {
		handleValidateEmail();
	}, [email, handleValidateEmail]);

	const isDisabled = !email || !password || isLoading || !emailIsValid; // deshabilitar el botón si no hay email o contraseña

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			setIsLoading(true);
			await login(credentials, checked);
			onLogin();
			const to = location.state?.from ?? '/';
			navigate(to, { replace: true });
		} catch (error) {
			if (isApiClientError(error)) {
				setError(error);
				if (error.code != 'UNAUTHORIZED') {
					console.warn('ERROR IN API CALL TO LOGIN IN LOGIN PAGE', error.code);
				}
			} else if (error instanceof Error) {
				console.warn('GENERIC ERROR IN LOGIN PAGE', error.message);
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="h-1/3 mt-10 flex items-center justify-center">
			<form
				onSubmit={handleSubmit}
				className="text-white p-6 rounded-lg shadow-lg w-1/2 bg-sky-700 flex flex-col justify-center items-center text-center"
			>
				<h1 className="text-2xl mt-2.5 mb-1">Iniciar Sesión</h1>

				<FormField
					type="text"
					name="email"
					value={credentials.email}
					onChange={handleChange}
					className="mt-4 border-2 rounded-lg "
					autoComplete="email"
					placeholder="Email"
				/>

				<FormField
					type="password"
					name="password"
					value={credentials.password}
					onChange={handleChange}
					placeholder="Contraseña"
					autoComplete="current-password"
					className="mt-4 border-2 rounded-lg "
				/>
				<span
					className="mt-3 flex gap-2"
					onClick={() => setIsChecked(!checked)}
				>
					Guardar La sesión?
					<input
						checked={checked}
						onChange={() => setIsChecked(!checked)}
						type="checkbox"
					/>
				</span>

				<Button
					$variant="primary"
					type="submit"
					disabled={isDisabled}
					className="mt-4"
				>
					Iniciar Sesión
				</Button>
				{error ? null : email.length < 5 ? null : emailIsValid ? null : (
					<ErrorSpan children={'Por favor ingrese un email correcto'} />
				)}
				{error && (
					<ErrorSpan
						children={
							error.code === 'UNAUTHORIZED'
								? 'Por favor ingrese un usuario y contraseña válidos'
								: error.message
						}
						onClick={() => setError(null)}
					/>
				)}
				{isLoading ? (
					<img className="max-h-30 mt-2.5 rounded-2xl" src={ProgresIndicator} />
				) : null}
			</form>
		</div>
	);
}

export default LoginPage;
