import { RootState } from '..';
import { AdvertType } from '../../pages/adverts/types';
import {
	getAdvert,
	getAdverts,
	getIsLogged,
	getTags,
	getUi,
	removeAdvert,
} from '../selectors';

describe('getIsLogged', () => {
	const state: RootState = {
		auth: true,
		adverts: { data: [], loaded: true },
		tags: { data: ['testTag'], loaded: false },
		ui: { error: null, pending: false, tagsError: null },
	};

	test(' should return true ', () => {
		const result = getIsLogged(state);

		expect(result).toBe(true);
	});
});

describe('getUi', () => {
	const state: RootState = {
		auth: true,
		adverts: { data: [], loaded: true },
		tags: { data: ['testTag'], loaded: false },
		ui: { error: null, pending: false, tagsError: null },
	};

	test(' should return true ', () => {
		const result = getUi(state);
		expect(result).toEqual({ error: null, pending: false, tagsError: null });
	});
});

describe('getAdverts', () => {
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

	const state: RootState = {
		auth: true,
		adverts: { data: adverts, loaded: true },
		tags: { data: [], loaded: false },
		ui: { error: null, pending: false, tagsError: null },
	};

	test(' should return adverts ', () => {
		const result = getAdverts(state);
		expect(result).toEqual(adverts);
	});

	test(' should return adverts empty "[]" ', () => {
		state.adverts.data = null;
		const result = getAdverts(state);
		expect(result).toEqual([]);
	});
});

describe('getAdvert', () => {
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

	const state: RootState = {
		auth: true,
		adverts: { data: adverts, loaded: true },
		tags: { data: tags, loaded: false },
		ui: { error: null, pending: false, tagsError: null },
	};

	test('should return a advert with id 1', () => {
		const result = getAdvert('1')(state);
		expect(result).toBe(adverts[1]);
	});

	test('should return a undefined', () => {
		const result = getAdvert('2')(state);
		expect(result).toBe(undefined);
	});
});

describe('removeAdvert', () => {
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

	const state: RootState = {
		auth: true,
		adverts: { data: adverts, loaded: true },
		tags: { data: [], loaded: false },
		ui: { error: null, pending: false, tagsError: null },
	};

	test(' should return all adverts except deleted advert ', () => {
		const result = removeAdvert('1')(state);
		expect(result).toEqual([
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
		]);
	});

	test(' should return all adverts ', () => {
		const result = removeAdvert('33')(state);
		expect(result).toEqual(adverts);
	});
});

describe('getTags', () => {
	const tags: string[] = ['motor', 'lifestile', 'other tag'];

	const state: RootState = {
		auth: true,
		adverts: { data: [], loaded: true },
		tags: { data: tags, loaded: false },
		ui: { error: null, pending: false, tagsError: null },
	};

	test('should return all tags', () => {
		const result = getTags(state);
		expect(result).toEqual(tags);
	});

	test("should return empty '[]' tags", () => {
		state.tags.data = null;
		const result = getTags(state);
		expect(result).toEqual([]);
	});
});

describe('getTagsError', () => {
	const error = new Error('Error');
	const state: RootState = {
		auth: true,
		adverts: { data: [], loaded: true },
		tags: { data: [], loaded: false },
		ui: { error: null, pending: false, tagsError: error },
	};

	test('should return a error', () => {
		const result = getUi(state);
		expect(result.tagsError).toBe(error);
	});

	test('should return a null', () => {
		state.ui.tagsError = null;
		const result = getUi(state);
		expect(result.tagsError).toBe(null);
	});
});
