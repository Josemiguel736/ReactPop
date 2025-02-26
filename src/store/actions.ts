// types

import { AppThunk } from '.';
import { isApiClientError } from '../api/client';
import { AdvertType } from '../pages/adverts/types';
import { Credentials } from '../pages/auth/types';

// ------------------------------- Login -------------------------------------------------

type AuthLoginPending = {
	type: 'auth/login/pending';
};

type AuthLoginFulfilled = {
	type: 'auth/login/fulfilled';
};

type AuthLogout = {
	type: 'auth/logout';
};

type AuthLoginRejected = {
	type: 'auth/login/rejected';
	payload: Error;
};

// ----------------------- adverts -------------------------------------------

type AdvertsLoadedFulfilled = {
	type: 'adverts/loaded/fulfilled';
	payload: { data: AdvertType[]; loaded: boolean };
};

type AdvertsLoadedRejected = {
	type: 'adverts/loaded/rejected';
	payload: Error;
};

type AdvertCreatedFulfilled = {
	type: 'adverts/created/fulfilled';
	payload: AdvertType;
};

type UiResetError = {
	type: 'ui/reset-error';
};

export const authLoginPending = (): AuthLoginPending => ({
	type: 'auth/login/pending',
});

export const authLoginFulfilled = (): AuthLoginFulfilled => ({
	type: 'auth/login/fulfilled',
});

export const AuthLogout = (): AuthLogout => ({
	type: 'auth/logout',
});

export const authLoginRejected = (error: Error): AuthLoginRejected => ({
	type: 'auth/login/rejected',
	payload: error,
});

export function authLogin(
	credentials: Credentials,
	remember: boolean,
): AppThunk<Promise<void>> {
	return async function (dispatch, _getState, { api, router }) {
		dispatch(authLoginPending());
		try {
			await api.auth.login(credentials, remember);
			dispatch(authLoginFulfilled());
			const to = router.state.location.state?.from ?? '/';
			router.navigate(to, { replace: true });
		} catch (error) {
			if (isApiClientError(error)) {
				dispatch(authLoginRejected(error));
			} else {
				console.log('ERROR ', error); //TODO
			}
		}
	};
}

export const UiResetError = (): UiResetError => ({
	type: 'ui/reset-error',
});

export type Actions =
	| AuthLoginFulfilled
	| AuthLogout
	| AuthLoginPending
	| AuthLoginRejected
	| AdvertsLoadedFulfilled
	| AdvertsLoadedRejected
	| AdvertCreatedFulfilled
	| UiResetError;
