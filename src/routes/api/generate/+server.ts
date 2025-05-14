import db from '$lib/db';
import { json } from '@sveltejs/kit';

import OpenAI from 'openai';

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY
});

export async function POST({ request }) {
	const prompt = await request.text();

	if (typeof prompt !== 'string') {
		throw new Error('Prompt is required');
	}

	const result = await openai.images.generate({
		model: 'gpt-image-1',
		prompt,
		size: '1024x1024',
		quality: 'medium'
	});

	const imageBase64 = result.data[0].b64_json;
	const image = await db.image.create({
		data: {
			prompt,
			base64: imageBase64
		}
	});
	return json({ image });
}
