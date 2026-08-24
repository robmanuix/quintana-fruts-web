import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";

import { ContactReasons } from "./collections/ContactReasons";
import { Media } from "./collections/Media";
import { Products } from "./collections/Products";
import { Users } from "./collections/Users";
import { ContactPage } from "./globals/ContactPage";
import { HomePage } from "./globals/HomePage";
import { SiteSettings } from "./globals/SiteSettings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const hasS3Config = Boolean(process.env.S3_BUCKET && process.env.S3_ACCESS_KEY_ID && process.env.S3_SECRET_ACCESS_KEY);

export default buildConfig({
	admin: {
		user: Users.slug,
		importMap: {
			baseDir: path.resolve(dirname),
		},
	},
	collections: [Users, Media, ContactReasons, Products],
	globals: [SiteSettings, HomePage, ContactPage],
	editor: lexicalEditor(),
	secret: process.env.PAYLOAD_SECRET || "",
	typescript: {
		// generated types are committed to packages/cms-types so apps/web can
		// import them without needing DB/S3 credentials just to type-check
		outputFile: path.resolve(dirname, "../../../packages/cms-types/src/payload-types.ts"),
	},
	localization: {
		locales: ["es", "en"],
		defaultLocale: "es",
	},
	db: postgresAdapter({
		pool: {
			connectionString: process.env.DATABASE_URI || "",
		},
	}),
	sharp,
	plugins: hasS3Config
		? [
				s3Storage({
					collections: {
						media: true,
					},
					bucket: process.env.S3_BUCKET || "",
					config: {
						region: process.env.S3_REGION || "auto",
						endpoint: process.env.S3_ENDPOINT,
						credentials: {
							accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
							secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
						},
						forcePathStyle: true,
					},
				}),
			]
		: [],
	cors: (process.env.CORS_ALLOWLIST || "").split(",").filter(Boolean),
});
