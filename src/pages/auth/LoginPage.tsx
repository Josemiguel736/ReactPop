import { useState } from 'react';
import FormField from '../../components/shared/FormField';
import Button from '../../components/shared/Button';
import { validateEmail } from '../../utils/validate';
import ErrorSpan from '../../components/errors/ErrorSpan';
import ProgresIndicator from '../../assets/ProgressIndicator.gif';
import { useAppDispatch, useAppSelector } from '../../store';
import { authLogin, uiResetError } from '../../store/actions';
import { getUi } from '../../store/selectors';
import useForm from '../../components/shared/InputComponent';

function LoginPage() {
	const dispatch = useAppDispatch();
	const { pending: isLoading, error } = useAppSelector(getUi);

	const [checked, setIsChecked] = useState(false);

	const { values, handleChange } = useForm({
		email: '',
		password: '',
	});
	const { email, password } = values;

	const emailIsValid = validateEmail(email);

	const isDisabled = !email || !password || isLoading || !emailIsValid; // deshabilitar el botón si no hay email o contraseña

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		dispatch(authLogin(values, checked));
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
					value={email}
					onChange={handleChange}
					className="mt-4 border-2 rounded-lg "
					autoComplete="email"
					placeholder="Email"
				/>

				<FormField
					type="password"
					name="password"
					value={password}
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
							error.message === 'Unauthorized'
								? 'Por favor ingrese un usuario y contraseña válidos'
								: error.message
						}
						onClick={() => dispatch(uiResetError())}
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
