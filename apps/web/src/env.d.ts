/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
	readonly PAYLOAD_REST_URL: string;
	readonly PAYLOAD_SERVER_URL: string;
	readonly PAYLOAD_API_KEY: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
