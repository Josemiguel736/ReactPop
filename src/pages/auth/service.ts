import {
	client,
	removeAuthorizationHeader,
	setAuthorizationHeader,
} from '../../api/client';
import storage from '../../utils/storage';
import { Credentials, Login } from './types';

const authUrl = import.meta.env.VITE_API_AUTH_URL;
const meUrl = import.meta.env.VITE_API_ME_URL;

export const login = async (credentials: Credentials, remember: boolean) => {
	const response = await client.post<Login>(authUrl, credentials);
	const { accessToken } = response.data;
	if (remember) {
		storage.set('auth', accessToken);
	}
	setAuthorizationHeader(accessToken);
};

export const logout = () => {
	storage.remove('auth');
	removeAuthorizationHeader();
};

export const authTokenValid = async () => {
	const response = await client.get(meUrl);
	return response;
};
