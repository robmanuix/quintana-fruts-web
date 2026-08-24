import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
	slug: "media",
	// public read: these are the site's own public-facing images — anyone visiting
	// the live site can already view them, and Astro's build-time image optimizer
	// fetches them unauthenticated (it doesn't send the API key), so a restricted
	// default here just breaks image optimization without protecting anything.
	access: {
		read: () => true,
	},
	upload: {
		// resizing/optimization stays on the Astro build side (astro:assets);
		// Payload/S3 only stores the original file
		imageSizes: [],
	},
	fields: [
		{
			name: "alt",
			type: "text",
			localized: true,
		},
	],
};
