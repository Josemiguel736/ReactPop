import { client } from '../../api/client';
import { AdvertType } from './types';

const advertsUrl = import.meta.env.VITE_ADVERTS_URL;

export const getLastestAdverts = async () => {
	const url = `${advertsUrl}`;

	const response = await client.get<AdvertType[]>(url);
	return response.data;
};

export const createAdvert = async (advert: FormData) => {
	const response = await client.post<AdvertType>(advertsUrl, advert);
	return response.data;
};

export const getTags = async () => {
	const response = await client.get<string[]>(`${advertsUrl}/tags`);
	return response.data;
};

export const getAdvert = async (advertId: string) => {
	const response = await client.get<AdvertType>(`${advertsUrl}/${advertId}`);
	return response.data;
};

export const deleteAdvert = async (advertId: string) => {
	const response = await client.delete<AdvertType>(`${advertsUrl}/${advertId}`);
	return response;
};
