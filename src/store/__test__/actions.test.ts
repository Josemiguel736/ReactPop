import { ExtraArgument } from '..';
import { AdvertType } from '../../pages/adverts/types';
import { Credentials } from '../../pages/auth/types';
import {
	authLoginPending,
	advertsLoadedFulfilled,
	authLogin,
	authLoginFulfilled,
	authLogout,
	authLoginRejected,
	advertsLoaded,
	advertsLoadedRejected,
	advertsLoadedPending,
	advertLoadedPending,
	advertCreatedFulfilled,
	advertDeletedFulfilled,
	advertDeletedRejected,
	advertCreatedRejected,
	advertDeleted,
	advertCreated,
	advertLoadedRejected,
	advertLoaded,
	tagsLoadedPending,
	tagsLoadedFulfilled,
	tagsLoadedRejected,
	tagsLoaded,
	uiResetError,
} from '../actions';
import { ApiClientError } from '../../api/error';

describe('login', () => {
	describe('authLoginPending', () => {
		test("should return an 'auth/login/pending' action", () => {
			const action = {
				type: 'auth/login/pending',
			};
			const result = authLoginPending();
			expect(result).toEqual(action);
		});
	});

	describe('authLoginFulfilled', () => {
		test("should return an 'auth/login/fulfilled' action", () => {
			const action = {
				type: 'auth/login/fulfilled',
			};
			const result = authLoginFulfilled();
			expect(result).toEqual(action);
		});
	});

	describe('authLogout', () => {
		test("should return an 'auth/login/fulfilled' action", () => {
			const action = {
				type: 'auth/logout',
			};
			const result = authLogout();
			expect(result).toEqual(action);
		});
	});

	describe('authLoginRejected', () => {
		test("should return an 'auth/login/fulfilled' action", () => {
			const error = new Error('Test Error');
			const action = {
				type: 'auth/login/rejected',
				payload: error,
			};
			const result = authLoginRejected(error);
			expect(result).toEqual(action);
		});
	});

	describe('authLogin', () => {
		afterEach(() => vi.clearAllMocks());
		const adverts: AdvertType[] = [
			{
				createdAt: '28/02/2025',
				id: '12/22as-22',
				name: 'Test advert',
				photo: 'photo/url',
				price: 20,
				sale: true,
				tags: ['motor'],
			},
			{
				createdAt: '29/02/2025',
				id: '1',
				name: 'advert to find!!',
				photo: 'photo/url',
				price: 90,
				sale: true,
				tags: ['motor'],
			},
			{
				createdAt: '29/02/2025',
				id: '12',
				name: 'advert 12',
				photo: 'photo/url',
				price: 202,
				sale: true,
				tags: ['motor'],
			},
		];

		const tags: string[] = ['motor', 'lifestile', 'other tag'];
		const getState = () => ({
			auth: true,
			adverts: { data: adverts, loaded: true },
			tags: { data: tags, loaded: false, error: null },
			ui: { error: null, pending: false },
		});

		const credentials: Credentials = {
			email: 'admin@example.com',
			password: '1234',
		};
		const thunk = authLogin(credentials, true);
		const dispatch = vi.fn();
		const to = '/to';
		const router = {
			state: { location: { state: { from: to } } },
			navigate: vi.fn(),
		};
		const api = { auth: { login: vi.fn() } };
		const extraArgument = { api, router } as unknown as ExtraArgument;

		test('when login resolves', async () => {
			api.auth.login = vi.fn().mockResolvedValue(undefined);
			await thunk(dispatch, getState, extraArgument);
			expect(dispatch).toHaveBeenCalledTimes(2);
			expect(dispatch).toHaveBeenNthCalledWith(1, {
				type: 'auth/login/pending',
			});
			expect(dispatch).toHaveBeenNthCalledWith(2, {
				type: 'auth/login/fulfilled',
			});
			expect(api.auth.login).toHaveBeenCalledWith(credentials, true);
			expect(router.navigate).toHaveBeenCalledWith(to, { replace: true });
		});

		test('when login rejects', async () => {
			const error = new ApiClientError('Unauthorized', 'UNAUTHORIZED');
			api.auth.login = vi.fn().mockRejectedValue(error);

			await thunk(dispatch, getState, extraArgument);
			expect(dispatch).toHaveBeenCalledTimes(2);
			expect(dispatch).toHaveBeenNthCalledWith(1, {
				type: 'auth/login/pending',
			});
			expect(dispatch).toHaveBeenNthCalledWith(2, {
				type: 'auth/login/rejected',
				payload: error,
			});
			expect(router.navigate).not.toHaveBeenCalled();
		});
	});
});

describe('adverts', () => {
	describe('advertsLoadedFuilfilled', () => {
		const adverts: AdvertType[] = [
			{
				createdAt: '28/02/2025',
				id: '12/22as-22',
				name: 'Test advert',
				photo: 'photo/url',
				price: 20,
				sale: true,
				tags: ['motor'],
			},
		];

		test("should return an 'advertsLoadedFulfilled' action with loaded false ", () => {
			const result = advertsLoadedFulfilled(adverts);
			const action = {
				type: 'adverts/loaded/fulfilled',
				payload: { data: adverts, loaded: false },
			};
			expect(result).toEqual(action);
		});

		test("should return an 'advertsLoadedFulfilled' action with loaded true", () => {
			const result = advertsLoadedFulfilled(adverts, true);
			const action = {
				type: 'adverts/loaded/fulfilled',
				payload: { data: adverts, loaded: true },
			};
			expect(result).toEqual(action);
		});
	});

	describe('advertsLoaded', () => {
		afterEach(() => vi.clearAllMocks());
		const adverts: AdvertType[] = [
			{
				createdAt: '28/02/2025',
				id: '12/22as-22',
				name: 'Test advert',
				photo: 'photo/url',
				price: 20,
				sale: true,
				tags: ['motor'],
			},
			{
				createdAt: '29/02/2025',
				id: '1',
				name: 'advert to find!!',
				photo: 'photo/url',
				price: 90,
				sale: true,
				tags: ['motor'],
			},
			{
				createdAt: '29/02/2025',
				id: '12',
				name: 'advert 12',
				photo: 'photo/url',
				price: 202,
				sale: true,
				tags: ['motor'],
			},
		];

		const tags: string[] = ['motor', 'lifestile', 'other tag'];
		const getState = () => ({
			auth: true,
			adverts: { data: null, loaded: false },
			tags: { data: tags, loaded: false, error: null },
			ui: { error: null, pending: false },
		});

		const thunk = advertsLoaded();
		const dispatch = vi.fn();
		const api = { adverts: { getLastestAdverts: vi.fn() } };
		const extraArgument = { api } as unknown as ExtraArgument;

		test('when adverts loaded', async () => {
			api.adverts.getLastestAdverts = vi.fn().mockResolvedValue(adverts);
			await thunk(dispatch, getState, extraArgument);

			expect(api.adverts.getLastestAdverts).toHaveBeenCalled();
			expect(api.adverts.getLastestAdverts).toHaveBeenCalledWith();
			expect(api.adverts.getLastestAdverts).toHaveBeenCalledTimes(1);

			expect(dispatch).toHaveBeenCalledTimes(2);
			expect(dispatch).toHaveBeenNthCalledWith(1, {
				type: 'adverts/loaded/pending',
			});
			expect(dispatch).toHaveBeenNthCalledWith(2, {
				type: 'adverts/loaded/fulfilled',
				payload: { data: adverts, loaded: true },
			});
		});

		test('when adverts rejected', async () => {
			const error = new ApiClientError('Unauthorized', 'UNAUTHORIZED');
			api.adverts.getLastestAdverts = vi.fn().mockRejectedValue(error);

			await thunk(dispatch, getState, extraArgument);
			expect(dispatch).toHaveBeenCalledTimes(2);
			expect(dispatch).toHaveBeenNthCalledWith(1, {
				type: 'adverts/loaded/pending',
			});

			expect(dispatch).toHaveBeenNthCalledWith(2, {
				type: 'adverts/loaded/rejected',
				payload: error,
			});
		});

		test('when adverts loaded not reloaded', async () => {
			api.adverts.getLastestAdverts = vi.fn().mockResolvedValue(adverts);

			const getStateLoaded = () => ({
				auth: true,
				adverts: { data: null, loaded: true },
				tags: { data: tags, loaded: false, error: null },
				ui: { error: null, pending: false },
			});

			await thunk(dispatch, getStateLoaded, extraArgument);

			expect(api.adverts.getLastestAdverts).not.toHaveBeenCalled();
			expect(api.adverts.getLastestAdverts).toHaveBeenCalledTimes(0);

			expect(dispatch).not.toHaveBeenCalled();
		});
	});

	describe('advertsLoadedRejected', () => {
		test("should return an 'adverts/loaded/rejected' action", () => {
			const error = new Error('Test Error');
			const action = {
				type: 'adverts/loaded/rejected',
				payload: error,
			};
			const result = advertsLoadedRejected(error);
			expect(result).toEqual(action);
		});
	});

	describe('advertsLoadedPending', () => {
		test("should return an 'adverts/loaded/pending' action", () => {
			const action = {
				type: 'adverts/loaded/pending',
			};
			const result = advertsLoadedPending();
			expect(result).toEqual(action);
		});
	});
});

describe('advert', () => {
	describe('advertLoadedPending', () => {
		test("should return an 'advert/loaded/pending' action", () => {
			const action = {
				type: 'advert/loaded/pending',
			};
			const result = advertLoadedPending();
			expect(result).toEqual(action);
		});
	});

	describe('advertLoadedRejected', () => {
		const error: Error = new Error('Test Error');
		test("should return an 'advert/loaded/rejected' action", () => {
			const action = {
				type: 'advert/loaded/rejected',
				payload: error,
			};
			const result = advertLoadedRejected(error);
			expect(result).toEqual(action);
		});
	});

	describe('loadedAdvert', () => {
		afterEach(() => vi.clearAllMocks());

		const advert: AdvertType = {
			createdAt: '28/02/2025',
			id: '1',
			name: 'Test advert',
			photo: 'photo/url',
			price: 20,
			sale: true,
			tags: ['motor'],
		};

		const getState = () => ({
			auth: true,
			adverts: { data: null, loaded: true },
			tags: { data: null, loaded: false, error: null },
			ui: { error: null, pending: false },
		});

		const thunk = advertLoaded('1');
		const dispatch = vi.fn();
		const router = {
			state: { location: { state: { from: '/' } } },
			navigate: vi.fn(),
		};
		const api = { adverts: { getAdvert: vi.fn() } };
		const extraArgument = { api, router } as unknown as ExtraArgument;

		test('when loadedAdvert resolved', async () => {
			api.adverts.getAdvert = vi.fn().mockResolvedValue(advert);
			await thunk(dispatch, getState, extraArgument);

			expect(dispatch).toBeCalledTimes(2);
			expect(dispatch).toHaveBeenNthCalledWith(1, {
				type: 'advert/loaded/pending',
			});
			expect(dispatch).toHaveBeenNthCalledWith(2, {
				type: 'adverts/loaded/fulfilled',
				payload: { data: [advert], loaded: false },
			});
			expect(api.adverts.getAdvert).toBeCalledWith('1');
		});

		test('when advert are loaded', async () => {
			const getStateWidthAdvert = () => ({
				auth: true,
				adverts: { data: [advert], loaded: true },
				tags: { data: null, loaded: false, error: null },
				ui: { error: null, pending: false },
			});
			api.adverts.getAdvert = vi.fn().mockResolvedValue(advert);
			await thunk(dispatch, getStateWidthAdvert, extraArgument);

			expect(dispatch).not.toBeCalled();
			expect(api.adverts.getAdvert).not.toBeCalled();
		});

		test('when loadedAdvert rejected', async () => {
			const error = new ApiClientError('Not_found', 'NOT_FOUND');

			api.adverts.getAdvert = vi.fn().mockRejectedValue(error);

			await thunk(dispatch, getState, extraArgument);

			expect(api.adverts.getAdvert).toBeCalledWith('1');

			expect(dispatch).toBeCalledTimes(2);

			expect(dispatch).toHaveBeenNthCalledWith(1, {
				type: 'advert/loaded/pending',
			});

			expect(dispatch).toHaveBeenNthCalledWith(2, {
				type: 'advert/loaded/rejected',
				payload: error,
			});

			expect(router.navigate).toBeCalledTimes(1);
			expect(router.navigate).toBeCalledWith('/404');
		});
	});

	describe('advertCreatedFulfilled', () => {
		const advert: AdvertType = {
			createdAt: '28/02/2025',
			id: '12/22as-22',
			name: 'Test advert',
			photo: 'photo/url',
			price: 20,
			sale: true,
			tags: ['motor'],
		};
		test("should return an 'advert/created/fulfilled' action", () => {
			const action = {
				type: 'advert/created/fulfilled',
				payload: advert,
			};
			const result = advertCreatedFulfilled(advert);
			expect(result).toEqual(action);
		});
	});

	describe('advertCreatedRejected', () => {
		const error: Error = new Error('Test Error');
		test("should return an 'advert/created/rejected' action", () => {
			const action = {
				type: 'advert/created/rejected',
				payload: error,
			};
			const result = advertCreatedRejected(error);
			expect(result).toEqual(action);
		});
	});

	describe('advertCreated', () => {
		afterEach(() => vi.clearAllMocks());
		const advertContent = {
			name: 'Test advert',
			photo: 'photo/url',
			price: 20,
			sale: true,
			tags: ['motor'],
		} as unknown as FormData;

		const advert: AdvertType = {
			createdAt: '28/02/2025',
			id: '12/22as-22',
			name: 'Test advert',
			photo: 'photo/url',
			price: 20,
			sale: true,
			tags: ['motor'],
		};

		const getState = () => ({
			auth: true,
			adverts: { data: null, loaded: true },
			tags: { data: null, loaded: false, error: null },
			ui: { error: null, pending: false },
		});

		const thunk = advertCreated(advertContent);
		const dispatch = vi.fn();
		const router = {
			state: { location: { state: { from: '/' } } },
			navigate: vi.fn(),
		};
		const api = { adverts: { createAdvert: vi.fn() } };
		const extraArgument = { api, router } as unknown as ExtraArgument;

		test('when createAdverts  resolves', async () => {
			api.adverts.createAdvert = vi.fn().mockResolvedValue(advert);
			await thunk(dispatch, getState, extraArgument);

			expect(dispatch).toHaveBeenCalledTimes(2);
			expect(dispatch).toHaveBeenNthCalledWith(1, {
				type: 'advert/loaded/pending',
			});
			expect(dispatch).toHaveBeenNthCalledWith(2, {
				type: 'advert/created/fulfilled',
				payload: advert,
			});
			expect(api.adverts.createAdvert).toHaveBeenCalledWith(advertContent);
			expect(router.navigate).toHaveBeenCalledWith(`/adverts/${advert.id}`);
		});

		test('when createAdverts rejected', async () => {
			const error = new ApiClientError('Unauthorized', 'UNAUTHORIZED');

			api.adverts.createAdvert = vi.fn().mockRejectedValue(error);
			await thunk(dispatch, getState, extraArgument);

			expect(dispatch).toHaveBeenCalledTimes(2);
			expect(dispatch).toHaveBeenNthCalledWith(1, {
				type: 'advert/loaded/pending',
			});
			expect(dispatch).toHaveBeenNthCalledWith(2, {
				type: 'advert/created/rejected',
				payload: error,
			});
			expect(api.adverts.createAdvert).toHaveBeenCalledWith(advertContent);
			expect(router.navigate).not.toBeCalled();
		});
	});

	describe('advertDeletedFulfilled', () => {
		const advert: AdvertType[] = [
			{
				createdAt: '28/02/2025',
				id: '12/22as-22',
				name: 'Test advert',
				photo: 'photo/url',
				price: 20,
				sale: true,
				tags: ['motor'],
			},
		];
		test("should return an 'advert/deleted/fulfilled' action", () => {
			const action = {
				type: 'advert/deleted/fulfilled',
				payload: advert,
			};
			const result = advertDeletedFulfilled(advert);
			expect(result).toEqual(action);
		});
	});

	describe('advertDeletedRejected', () => {
		const error: Error = new Error('Test Error');
		test("should return an 'advert/deleted/rejected' action", () => {
			const action = {
				type: 'advert/deleted/rejected',
				payload: error,
			};
			const result = advertDeletedRejected(error);
			expect(result).toEqual(action);
		});
	});

	describe('advertDeleted', () => {
		afterEach(() => vi.clearAllMocks());
		const adverts: AdvertType[] = [
			{
				createdAt: '28/02/2025',
				id: '12/22as-22',
				name: 'Test advert',
				photo: 'photo/url',
				price: 20,
				sale: true,
				tags: ['motor'],
			},
			{
				createdAt: '29/02/2025',
				id: '1',
				name: 'advert to find!!',
				photo: 'photo/url',
				price: 90,
				sale: true,
				tags: ['motor'],
			},
			{
				createdAt: '29/02/2025',
				id: '12',
				name: 'advert 12',
				photo: 'photo/url',
				price: 202,
				sale: true,
				tags: ['motor'],
			},
		];

		const tags: string[] = ['motor', 'lifestile', 'other tag'];
		const getState = () => ({
			auth: true,
			adverts: { data: adverts, loaded: true },
			tags: { data: tags, loaded: false, error: null },
			ui: { error: null, pending: false },
		});

		const thunk = advertDeleted('1');
		const dispatch = vi.fn();
		const router = {
			state: { location: { state: { from: '/' } } },
			navigate: vi.fn(),
		};
		const api = { adverts: { deleteAdvert: vi.fn() } };
		const extraArgument = { api, router } as unknown as ExtraArgument;

		test('when deleteAdverts resolves', async () => {
			api.adverts.deleteAdvert = vi.fn().mockResolvedValue(undefined);
			await thunk(dispatch, getState, extraArgument);
			expect(dispatch).toHaveBeenCalledTimes(2);
			expect(dispatch).toHaveBeenNthCalledWith(1, {
				type: 'advert/loaded/pending',
			});
			expect(dispatch).toHaveBeenNthCalledWith(2, {
				type: 'advert/deleted/fulfilled',
				payload: [
					{
						createdAt: '28/02/2025',
						id: '12/22as-22',
						name: 'Test advert',
						photo: 'photo/url',
						price: 20,
						sale: true,
						tags: ['motor'],
					},
					{
						createdAt: '29/02/2025',
						id: '12',
						name: 'advert 12',
						photo: 'photo/url',
						price: 202,
						sale: true,
						tags: ['motor'],
					},
				],
			});
			expect(api.adverts.deleteAdvert).toHaveBeenCalledWith('1');
			expect(router.navigate).toHaveBeenCalledWith('/');
		});

		test('when deleteAdverts rejected', async () => {
			const error = new ApiClientError('Not_found', 'NOT_FOUND');
			api.adverts.deleteAdvert = vi.fn().mockRejectedValue(error);
			await thunk(dispatch, getState, extraArgument);
			expect(dispatch).toHaveBeenCalledTimes(2);
			expect(dispatch).toHaveBeenNthCalledWith(1, {
				type: 'advert/loaded/pending',
			});
			expect(dispatch).toHaveBeenNthCalledWith(2, {
				type: 'advert/deleted/rejected',
				payload: error,
			});
			expect(api.adverts.deleteAdvert).toHaveBeenCalledWith('1');
			expect(router.navigate).not.toHaveBeenCalled();
		});
	});
});

describe('tags', () => {
	describe('tagsLoadedFulfilled', () => {
		test("should be return 'tags/loaded/fulfilled' ", () => {
			const tags = ['test', 'test2'];
			const result = tagsLoadedFulfilled(tags);

			expect(result).toEqual({
				type: 'tags/loaded/fulfilled',
				payload: tags,
			});
		});
	});

	describe('tagsLoadedPending', () => {
		test("should be return 'tags/loaded/pending' ", () => {
			const result = tagsLoadedPending();
			expect(result).toEqual({
				type: 'tags/loaded/pending',
			});
		});
	});

	describe('tagsLoadedRejected', () => {
		test("should be return 'tags/loaded/rejected' ", () => {
			const error = new Error('Test Error');
			const result = tagsLoadedRejected(error);

			expect(result).toEqual({
				type: 'tags/loaded/rejected',
				payload: error,
			});
		});
	});

	describe('tagsLoaded', () => {
		afterEach(() => vi.clearAllMocks());
		const tags: string[] = ['motor', 'lifestile', 'other tag'];
		const getState = () => ({
			auth: true,
			adverts: { data: null, loaded: true },
			tags: { data: null, loaded: false, error: null },
			ui: { error: null, pending: false },
		});

		const thunk = tagsLoaded();
		const dispatch = vi.fn();

		const api = { adverts: { getTags: vi.fn() } };
		const extraArgument = { api } as unknown as ExtraArgument;

		test('when tagsLoaded resolves ', async () => {
			api.adverts.getTags = vi.fn().mockResolvedValue(tags);
			await thunk(dispatch, getState, extraArgument);

			expect(dispatch).toBeCalledTimes(2);
			expect(dispatch).toHaveBeenNthCalledWith(1, {
				type: 'tags/loaded/pending',
			});
			expect(dispatch).toHaveBeenNthCalledWith(2, {
				type: 'tags/loaded/fulfilled',
				payload: tags,
			});

			expect(api.adverts.getTags).toBeCalledTimes(1);
		});

		test('when are tags ', async () => {
			const getStateWithTags = () => ({
				auth: true,
				adverts: { data: null, loaded: true },
				tags: { data: tags, loaded: true, error: null },
				ui: { error: null, pending: false },
			});

			api.adverts.getTags = vi.fn().mockResolvedValue(tags);
			await thunk(dispatch, getStateWithTags, extraArgument);

			expect(dispatch).not.toBeCalled();

			expect(api.adverts.getTags).not.toBeCalled();
		});

		test('when tagsLoaded rejects ', async () => {
			const error = new ApiClientError('Not_found', 'NOT_FOUND');
			api.adverts.getTags = vi.fn().mockRejectedValue(error);

			await thunk(dispatch, getState, extraArgument);

			expect(dispatch).toBeCalledTimes(2);

			expect(dispatch).toHaveBeenNthCalledWith(1, {
				type: 'tags/loaded/pending',
			});

			expect(dispatch).toHaveBeenNthCalledWith(2, {
				type: 'tags/loaded/rejected',
				payload: error,
			});

			expect(api.adverts.getTags).toBeCalled();
		});
	});
});

describe('uiResetError', () => {
	describe('uiResetError', () => {
		test("should return 'ui/reset-error' ", () => {
			const result = uiResetError();
			expect(result).toEqual({
				type: 'ui/reset-error',
			});
		});
	});
});
