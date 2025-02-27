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

type AdvertsLoadedPending = {
	type: 'adverts/loaded/pending';
};

type AdvertsLoadedFulfilled = {
	type: 'adverts/loaded/fulfilled';
	payload: { data: AdvertType[]; loaded: boolean };
};

type AdvertsLoadedRejected = {
	type: 'adverts/loaded/rejected';
	payload: Error;
};

type AdvertCreatedFulfilled = {
	type: 'advert/created/fulfilled';
	payload: AdvertType;
};

type AdvertCreatedRejected = {
	type: 'advert/created/rejected';
	payload: Error
};

type AdvertLoadedPending = {
	type: 'advert/loaded/pending';
};

type TagsLoadedFulfilled = {
	type: 'tags/loaded/fulfilled';
	payload:  string[] ;
};

type TagsLoadedRejected = {
	type: 'tags/loaded/rejected';
	payload: Error;
};

type TagsLoadedPending = {
	type: 'tags/loaded/pending';
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

export const advertsLoadedFulfilled = (
	adverts: AdvertType[],
	loaded?: boolean,
): AdvertsLoadedFulfilled => ({
	type: 'adverts/loaded/fulfilled',
	payload: { data: adverts, loaded: !!loaded },
});

export function advertsLoaded(): AppThunk<Promise<void>> {
	return async function (dispatch, getState, { api }) {
		const state = getState();
		if (state.adverts.loaded) {
			return;
		}
		dispatch(advertsLoadedPending());
		try {
			const adverts = await api.adverts.getLastestAdverts();
			dispatch(advertsLoadedFulfilled(adverts, true));
		} catch (error) {
			if (isApiClientError(error)) {
				dispatch(advertsLoadedRejected(error));
			} else {
				console.log(error);
			}
		}
	};
}

export const advertsLoadedRejected = (error: Error): AdvertsLoadedRejected => ({
	type: 'adverts/loaded/rejected',
	payload: error,
});

export const advertsLoadedPending = (): AdvertsLoadedPending => ({
	type: 'adverts/loaded/pending',
});

export const advertLoadedPending = (): AdvertLoadedPending => ({
	type: 'advert/loaded/pending',
});

export const advertCreatedFulfilled = (advert:AdvertType):AdvertCreatedFulfilled =>({
	type: "advert/created/fulfilled",
	payload:advert
})

export const advertCreatedRejected = (error:Error):AdvertCreatedRejected =>({
	type: "advert/created/rejected",
	payload:error
})

export function advertCreated(advertContent:FormData):AppThunk<Promise<AdvertType>>{
	return async function(dispatch,_getState,{api,router}) {
		try {
			dispatch(advertLoadedPending())
			const createdAdvert = await api.adverts.createAdvert(advertContent)
			const advert = await api.adverts.getAdvert(createdAdvert.id)
			dispatch(advertCreatedFulfilled(advert))
			await router.navigate(`/adverts/${advert.id}`)
			return advert
		} catch (error) {
			if (isApiClientError(error)){
				dispatch(advertCreatedRejected(error))
			}
			throw error
		}
		
	}
}

export const tagsLoadedFulfilled = (
	tags: string[]
): TagsLoadedFulfilled => ({
	type: 'tags/loaded/fulfilled',
	payload:  tags
});

export const tagsLoadedPending = (): TagsLoadedPending => ({
	type: 'tags/loaded/pending',
});

export const tagsLoadedRejected = (error: Error): TagsLoadedRejected => ({
	type: 'tags/loaded/rejected',
	payload: error,
});

export function tagsLoaded(): AppThunk<Promise<void>> {
	return async function (dispatch, getState, { api }) {
		const state = getState();
		if (state.tags.loaded) {
			return;
		}
		try {
			dispatch(tagsLoadedPending());
			const tags = await api.adverts.getTags();
			dispatch(tagsLoadedFulfilled(tags));
		} catch (error) {
			if (isApiClientError(error)) {
				dispatch(tagsLoadedRejected(error));
			} else {
				console.log(error);
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
	| UiResetError
	| AdvertsLoadedPending
	| TagsLoadedFulfilled
	| TagsLoadedPending
	| TagsLoadedRejected
	| AdvertCreatedRejected
	| AdvertCreatedFulfilled
	| AdvertLoadedPending
