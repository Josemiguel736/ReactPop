import axios, { isAxiosError } from 'axios';
import { ApiClientError } from './error';

export const client = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
});

client.interceptors.response.use(undefined, (error) => {
	// Unknown Error
	const clientError = new ApiClientError('Api Client Error');

	if (error instanceof Error) {
		// Error instance
		clientError.message = error.message;

		if (isAxiosError<{ message: string }>(error)) {
			// AxiosError instance
			clientError.message =
				error.response?.data.message ??
				error.response?.statusText ??
				clientError.message;
			const errorCode = error.code;
			const errorStatus = error.response?.status ?? error.status;

			if (errorCode === 'ERR_NETWORK') {
				clientError.code = 'NETWORK_ERROR';
			}
			if (typeof errorStatus === 'number') {
				if (errorStatus === 401) {
					clientError.code = 'UNAUTHORIZED';
				} else if (errorStatus === 404) {
					clientError.code = 'NOT_FOUND';
				} else if (errorStatus >= 500) {
					clientError.code = 'SERVER_ERROR';
				}
			}
		}
	}
	return Promise.reject(clientError);
});

export function isApiClientError(error: unknown): error is ApiClientError {
	return error instanceof ApiClientError;
}

export const setAuthorizationHeader = (accessToken: string) => {
	client.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
};

export const removeAuthorizationHeader = () => {
	delete client.defaults.headers['Authorization'];
};
