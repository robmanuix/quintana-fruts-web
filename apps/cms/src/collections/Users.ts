import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
	slug: "users",
	auth: {
		useAPIKey: true,
	},
	admin: {
		useAsTitle: "email",
	},
	access: {
		// only an existing admin can provision new accounts — editors can't self-register
		create: ({ req: { user } }) => user?.role === "admin",
	},
	fields: [
		{
			name: "name",
			type: "text",
			required: true,
		},
		{
			name: "role",
			type: "select",
			required: true,
			defaultValue: "editor",
			options: [
				{ label: "Admin", value: "admin" },
				{ label: "Editor", value: "editor" },
			],
		},
	],
};
