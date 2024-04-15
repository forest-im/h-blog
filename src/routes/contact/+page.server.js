import { PRIVATE_EMAIL_URL } from "$env/static/private";

export const load = async () => {
	return {
		emailUrl: PRIVATE_EMAIL_URL
	};
};
