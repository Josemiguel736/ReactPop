const regexpEmail = new RegExp(
	/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/im,
);

export const validateEmail = (email: string) => regexpEmail.test(email);
