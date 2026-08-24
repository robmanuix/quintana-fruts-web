// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';

// Payload's media URLs are relative, proxied through its own /api/media/file
// route (not served directly from S3/R2) — astro:assets needs this host
// allow-listed to optimize them at build time.
const payloadServerUrl = process.env.PAYLOAD_SERVER_URL;
const payloadHostname = payloadServerUrl ? new URL(payloadServerUrl).hostname : undefined;

// https://astro.build/config
export default defineConfig({
	site: 'https://quintanafruts.com',
	adapter: node({ mode: 'standalone' }),
	image: {
		remotePatterns: payloadHostname ? [{ protocol: new URL(payloadServerUrl).protocol.replace(':', ''), hostname: payloadHostname }] : [],
	},
	i18n: {
		defaultLocale: 'es',
		locales: ['es', 'en'],
		routing: {
			prefixDefaultLocale: false,
		},
	},
	integrations: [
		sitemap({
			i18n: {
				defaultLocale: 'es',
				locales: { es: 'es', en: 'en' },
			},
		}),
	],
});
