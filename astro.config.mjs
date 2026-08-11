// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://quintanafruts.com',
	adapter: node({ mode: 'standalone' }),
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
