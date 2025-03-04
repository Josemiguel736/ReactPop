import { AdvertType } from '../pages/adverts/types';
import { Actions } from './actions';

export type State = {
	auth: boolean;
	adverts: { data: AdvertType[] | null; loaded: boolean };
	tags: { data: string[] | null; loaded: boolean };
	ui: {
		pending: boolean;
		error: Error | null;
		tagsError: Error | null;
	};
};

const defaultState: State = {
	auth: false,
	adverts: {
		data: null,
		loaded: false,
	},
	tags: { data: null, loaded: false },
	ui: {
		pending: false,
		error: null,
		tagsError: null,
	},
};

export function auth(
	state = defaultState.auth,
	action: Actions,
): State['auth'] {
	switch (action.type) {
		case 'auth/login/fulfilled':
			return true;
		case 'auth/logout':
			return false;
		default:
			return state;
	}
}

export function ui(state = defaultState.ui, action: Actions): State['ui'] {
	switch (action.type) {
		case 'ui/reset-error':
			return { ...state, error: null };

		case 'auth/login/pending':
			return { error: null, pending: true, tagsError: null };
		case 'adverts/loaded/pending':
			return { error: null, pending: true, tagsError: null };
		case 'advert/loaded/pending':
			return { error: null, pending: true, tagsError: null };
		case 'tags/loaded/pending':
			return { error: null, pending: true, tagsError: null };

		case 'auth/login/rejected':
			return { ...state, pending: false, error: action.payload };
		case 'adverts/loaded/rejected':
			return { ...state, pending: false, error: action.payload };
		case 'advert/deleted/rejected':
			return { ...state, pending: false, error: action.payload };
		case 'advert/loaded/rejected':
			return { ...state, pending: false, error: action.payload };
		case 'advert/created/rejected':
			return { ...state, pending: false, error: action.payload };
		case 'tags/loaded/rejected':
			return { ...state, pending: false, tagsError: action.payload };

		case 'auth/login/fulfilled':
			return { ...state, pending: false, error: null };
		case 'tags/loaded/fulfilled':
			return { ...state, pending: false, tagsError: null };
		case 'adverts/loaded/fulfilled':
			return { ...state, pending: false, error: null };
		case 'advert/created/fulfilled':
			return { ...state, pending: false, error: null };
		case 'advert/deleted/fulfilled':
			return { ...state, pending: false, error: null };
		default:
			return state;
	}
}

export function adverts(
	state = defaultState.adverts,
	action: Actions,
): State['adverts'] {
	switch (action.type) {
		case 'adverts/loaded/fulfilled':
			return action.payload;
		case 'advert/created/fulfilled':
			return { ...state, data: [...(state.data ?? []), action.payload] };
		case 'advert/deleted/fulfilled':
			return { ...state, data: action.payload };
		default:
			return state;
	}
}

export function tags(
	state = defaultState.tags,
	action: Actions,
): State['tags'] {
	switch (action.type) {
		case 'tags/loaded/fulfilled':
			return {
				...state,
				data: Array.isArray(action.payload) ? action.payload : [],
				loaded: true,
			};
		case 'tags/loaded/rejected':
			return { ...state, loaded: false };
		default:
			return state;
	}
}
