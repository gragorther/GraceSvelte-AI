import db from '$lib/db';

export const load = async () => {
	const images = await db.image.findMany({
		orderBy: {
			id: 'desc'
		}
	});
	return { images };
};
