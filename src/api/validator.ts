import { z } from 'zod';
import { AdvertType } from '../pages/adverts/types';
import { ApiClientError } from './error';
import { Login, Me } from '../pages/auth/types';

const advertsSchema = z.object({
	id: z.string(),
	name: z.string(),
	createdAt: z.string(),
	sale: z.boolean(),
	price: z.number(),
	tags: z.array(z.string()),
	photo: z.string().nullable(),
});

const tagsSchema = z.array(z.string());

const loginSchema = z.object({
	accessToken: z.string(),
});

const meSchema = z.object({
	id: z.string(),
	createdAt: z.string(),
	email: z.string(),
	username: z.string(),
	name: z.string(),
});

export const validateAdverts = (data: AdvertType[]) => {
	try {
		data.forEach((advert) => {
			advertsSchema.parse(advert);
		});
		return true;
	} catch (error) {
		throw new ApiClientError('Error validating adverts', 'SERVER_ERROR');
	}
};

export const validateAdvert = (data: AdvertType) => {
	try {
		advertsSchema.parse(data);
		return true;
	} catch (error) {
		throw new ApiClientError('Error validating advert', 'SERVER_ERROR');
	}
};

export const validateTags = (data: string[]) => {
	try {
		tagsSchema.parse(data);
		return true;
	} catch (error) {
		throw new ApiClientError('Error validating tags', 'SERVER_ERROR');
	}
};

export const validateLogin = (data: Login) => {
	try {
		loginSchema.parse(data);
		return true;
	} catch (error) {
		throw new ApiClientError('Error validating login', 'SERVER_ERROR');
	}
};

export const validateMe = (data: Me) => {
	try {
		meSchema.parse(data);
		return true;
	} catch (error) {
		throw new ApiClientError('Error validating Me', 'SERVER_ERROR');
	}
};
