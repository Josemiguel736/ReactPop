import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import storage from './utils/storage.ts';
import {
	isApiClientError,
	removeAuthorizationHeader,
	setAuthorizationHeader,
} from './api/client.ts';
import { AuthProvider } from './pages/auth/AuthProvider.tsx';
import Layout from './components/layout/Layout.tsx';
import ErrorBoundary from './components/errors/ErrorBoundary.tsx';
import { authTokenValid } from './pages/auth/service.ts';

const checkAccessToken = async () => {
	const token = storage.get('auth'); // comprobamos si existe un accessToken
	if (token) {
		//validamos que el accessToken sea valido
		try {
			setAuthorizationHeader(token);
			await authTokenValid();
			return true;
		} catch (error) {
			if (isApiClientError(error)) {
				if (error.code != 'UNAUTHORIZED') {
					// si el error es diferente a UNAUTHORIZED lo mostramos en los logs (deberia enviarse a un servicio de logs)
					console.warn('ERROR IN API CALL TO ME FROM MAIN', error);
					return false;
				} else {
					removeAuthorizationHeader(); // si el error es cualquier otro eliminamos el accessToken de las peticiones a la Header y
					return false; // retornamos false para indicar que no hay un accessToken valido
				}
			} else {
				removeAuthorizationHeader();
				return false;
			}
		}
	}
	return false;
};

async function main() {
	const accessToken = await checkAccessToken();

	createRoot(document.getElementById('root')!).render(
		<StrictMode>
			<ErrorBoundary>
				<BrowserRouter>
					<AuthProvider defaultIsLogged={accessToken}>
						<Layout>
							<App />
						</Layout>
					</AuthProvider>
				</BrowserRouter>
			</ErrorBoundary>
		</StrictMode>,
	);
}

main();
