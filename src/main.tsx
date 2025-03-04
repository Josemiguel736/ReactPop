import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import storage from './utils/storage.ts';
import {
	isApiClientError,
	removeAuthorizationHeader,
	setAuthorizationHeader,
} from './api/client.ts';
import Layout from './components/layout/Layout.tsx';
import ErrorBoundary from './components/errors/ErrorBoundary.tsx';
import { authTokenValid } from './pages/auth/service.ts';
import configureStore from './store/index.ts';
import { Provider } from 'react-redux';

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
					removeAuthorizationHeader();
				} return false;
			} else {
				return false;
			}
		}
	}
	return false;
};

async function main() {
	const accessToken = await checkAccessToken();

	const router = createBrowserRouter([
		{
			path: '*',
			element: (
				<Layout>
					<App />
				</Layout>
			),
		},
	]);
	const store = configureStore({ auth: !!accessToken }, router);

	createRoot(document.getElementById('root')!).render(
		<StrictMode>
			<ErrorBoundary>
				<Provider store={store}>
					<RouterProvider router={router} />
				</Provider>
			</ErrorBoundary>
		</StrictMode>,
	);
}

main();
