import { client } from '../../api/client';
import { validateAdvert, validateAdverts, validateTags } from '../../api/validator';
import { AdvertType } from './types';

const advertsUrl = import.meta.env.VITE_ADVERTS_URL;
const advertsTags = import.meta.env.VITE_TAGS_URL;

export const getLastestAdverts = async () => {
	const url = `${advertsUrl}`;

	const response = await client.get<AdvertType[]>(url);
	validateAdverts(response.data);
	return response.data;
};

export const createAdvert = async (advert: FormData) => {
	const response = await client.post<AdvertType>(advertsUrl, advert);
	validateAdvert(response.data);
	return response.data;
};

export const getTags = async () => {
	const response = await client.get<string[]>(advertsTags);
	validateTags(response.data);
	return response.data;
};

export const getAdvert = async (advertId: string) => {
	const response = await client.get<AdvertType>(`${advertsUrl}/${advertId}`);
	validateAdvert(response.data);
	return response.data;
};

export const deleteAdvert = async (advertId: string) => {
	const response = await client.delete<AdvertType>(`${advertsUrl}/${advertId}`);
	return response;
};
