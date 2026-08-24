import type { ContactPage, ContactReason, HomePage, Media, Product, SiteSetting } from "@quintana-fruts/cms-types";

// import.meta.env, not process.env: Astro/Vite only statically substitutes
// process.env.* at build time (bundling); in `astro dev`'s live module
// runner it reads the real (unset) OS env instead. import.meta.env is
// populated correctly in both modes.
const REST_URL = import.meta.env.PAYLOAD_REST_URL;
const SERVER_URL = import.meta.env.PAYLOAD_SERVER_URL;
const API_KEY = import.meta.env.PAYLOAD_API_KEY;

/** Depth-1 populated variant: relationship/upload fields resolve to full docs, not just IDs. */
export type PopulatedProduct = Omit<Product, "mainImage" | "topImage" | "bottomImage" | "bloomImage" | "arrowIcon" | "stats"> & {
	mainImage: Media;
	topImage: Media;
	bottomImage: Media;
	bloomImage: Media | null;
	arrowIcon: Media | null;
	stats: { icon: Media | null; label: string; value: string; id?: string | null }[] | null;
};

const cache = new Map<string, unknown>();

async function payloadFetch<T>(path: string): Promise<T> {
	if (!REST_URL || !API_KEY) {
		throw new Error("Missing PAYLOAD_REST_URL or PAYLOAD_API_KEY — set them in apps/web/.env before building.");
	}

	if (cache.has(path)) {
		return cache.get(path) as T;
	}

	const res = await fetch(`${REST_URL}${path}`, {
		headers: { Authorization: `users API-Key ${API_KEY}` },
	});

	if (!res.ok) {
		throw new Error(`Payload fetch failed (${res.status} ${res.statusText}) for ${path}: ${await res.text()}`);
	}

	const data = (await res.json()) as T;
	cache.set(path, data);
	return data;
}

export async function getProducts(locale: "es" | "en"): Promise<PopulatedProduct[]> {
	const data = await payloadFetch<{ docs: PopulatedProduct[] }>(
		`/products?locale=${locale}&depth=1&where[featuredOnHomepage][equals]=true&sort=displayOrder&limit=100`,
	);
	return data.docs;
}

export async function getContactReasons(locale: "es" | "en"): Promise<ContactReason[]> {
	const data = await payloadFetch<{ docs: ContactReason[] }>(`/contact-reasons?locale=${locale}&sort=sortOrder&limit=100`);
	return data.docs;
}

export async function getHomePage(locale: "es" | "en"): Promise<HomePage> {
	return payloadFetch<HomePage>(`/globals/home-page?locale=${locale}&depth=1`);
}

export async function getSiteSettings(locale: "es" | "en"): Promise<SiteSetting> {
	return payloadFetch<SiteSetting>(`/globals/site-settings?locale=${locale}&depth=1`);
}

export async function getContactPage(locale: "es" | "en"): Promise<ContactPage> {
	return payloadFetch<ContactPage>(`/globals/contact-page?locale=${locale}`);
}

/** Payload returns relative media URLs (proxied through its own /api/media/file route) — resolve to an absolute URL for astro:assets. */
export function mediaUrl(media: Media | number | null | undefined): string | undefined {
	if (!media || typeof media === "number" || !media.url) return undefined;
	if (!SERVER_URL) {
		throw new Error("Missing PAYLOAD_SERVER_URL — set it in apps/web/.env before building.");
	}
	return media.url.startsWith("http") ? media.url : `${SERVER_URL}${media.url}`;
}

/** Narrows a depth-1-populated upload/relationship field, or undefined if it came back unresolved (shouldn't happen at depth=1). */
export function asMedia(value: Media | number | null | undefined): Media | undefined {
	return value && typeof value === "object" ? value : undefined;
}

export function asContactReason(value: ContactReason | number | null | undefined): ContactReason | undefined {
	return value && typeof value === "object" ? value : undefined;
}

/** Builds the Contacto page href for a CTA, preloading the reason dropdown via its stable `key`. */
export function contactHref(locale: "es" | "en", contactoPath: string, reason: ContactReason | number | null | undefined): string {
	const key = asContactReason(reason)?.key;
	return key ? `${contactoPath}?asunto=${encodeURIComponent(key)}` : contactoPath;
}
