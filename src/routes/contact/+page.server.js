import { env } from "$env/dynamic/private";

export const load = async () => {
	return {
		emailUrl: env.PRIVATE_EMAIL_URL
	};
};
