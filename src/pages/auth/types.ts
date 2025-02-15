export interface Credentials {
	email: string;
	password: string;
}

export interface Login {
	accessToken: string;
}

export interface Me {
	id: string;
	createdAt: string;
	email: string;
	username: string;
	name: string;
}
