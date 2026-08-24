import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from "payload";

const DEBOUNCE_MS = Number(process.env.REBUILD_DEBOUNCE_MS ?? 15000);

let pending: NodeJS.Timeout | null = null;

function scheduleRebuild() {
	const webhookUrl = process.env.COOLIFY_WEB_DEPLOY_WEBHOOK_URL;
	if (!webhookUrl) {
		console.warn("COOLIFY_WEB_DEPLOY_WEBHOOK_URL not set — skipping Astro rebuild trigger.");
		return;
	}

	if (pending) clearTimeout(pending);
	pending = setTimeout(() => {
		pending = null;
		fetch(webhookUrl, {
			method: "POST",
			headers: process.env.COOLIFY_DEPLOY_WEBHOOK_TOKEN ? { Authorization: `Bearer ${process.env.COOLIFY_DEPLOY_WEBHOOK_TOKEN}` } : {},
		})
			.then(() => console.log("Triggered Astro rebuild."))
			.catch((error) => console.error("Failed to trigger Astro rebuild:", error));
	}, DEBOUNCE_MS);
}

/**
 * Rebuilds the static Astro site after a publish. Only fires on `_status: 'published'`
 * so autosaves/drafts never trigger a redeploy — debounced so several quick saves only
 * rebuild once. Known limitation (same class as the contact form's in-memory rate
 * limiter): the debounce is per-process, so this only behaves correctly with a single
 * Payload instance, not horizontally scaled replicas.
 */
function handlePublishChange(doc: { _status?: string | null } | undefined) {
	if (doc?._status && doc._status !== "published") return;
	scheduleRebuild();
}

export const afterChangePublishHook: CollectionAfterChangeHook = ({ doc }) => handlePublishChange(doc);
export const afterChangePublishGlobalHook: GlobalAfterChangeHook = ({ doc }) => handlePublishChange(doc);

// globals have no afterDelete hook — they're singletons, not deletable documents.
export const afterDeleteRebuildHook: CollectionAfterDeleteHook = () => {
	scheduleRebuild();
};
