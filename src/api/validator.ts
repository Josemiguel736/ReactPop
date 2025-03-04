import { z } from 'zod';
import { ApiClientError } from './error';

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

export const validateAdverts = (data: unknown) => {
	try {
		z.array(advertsSchema).parse(data);
		return true;
	} catch {
		throw new ApiClientError('Error validating adverts', 'SERVER_ERROR');
	}
};

export const validateAdvert = (data: unknown) => {
	try {
		advertsSchema.parse(data);
		return true;
	} catch {
		throw new ApiClientError('Error validating advert', 'SERVER_ERROR');
	}
};

export const validateTags = (data: unknown) => {
	try {
		tagsSchema.parse(data);
		return true;
	} catch {
		throw new ApiClientError('Error validating tags', 'SERVER_ERROR');
	}
};

export const validateLogin = (data: unknown) => {
	try {
		loginSchema.parse(data);
		return true;
	} catch {
		throw new ApiClientError('Error validating login', 'SERVER_ERROR');
	}
};

export const validateMe = (data: unknown) => {
	try {
		meSchema.parse(data);
		return true;
	} catch {
		throw new ApiClientError('Error validating Me', 'SERVER_ERROR');
	}
};
