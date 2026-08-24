import type { GlobalConfig } from "payload";

import { afterChangePublishGlobalHook } from "../hooks/triggerRebuild";

export const ContactPage: GlobalConfig = {
	slug: "contact-page",
	versions: {
		drafts: true,
	},
	hooks: {
		afterChange: [afterChangePublishGlobalHook],
	},
	fields: [
		{
			type: "group",
			name: "seo",
			fields: [
				{
					name: "pageTitle",
					type: "text",
					localized: true,
				},
				{
					name: "pageDescription",
					type: "textarea",
					localized: true,
				},
			],
		},
		{
			type: "row",
			fields: [
				{
					name: "headingPrefix",
					type: "text",
					localized: true,
				},
				{
					name: "headingAccent",
					type: "text",
					localized: true,
				},
				{
					name: "headingSuffix",
					type: "text",
					localized: true,
				},
			],
		},
		{
			name: "subtextPrefix",
			type: "textarea",
			localized: true,
			admin: { description: "El texto antes del enlace mailto (el email en sí viene de Ajustes del sitio)." },
		},
		{
			name: "cardHeading",
			type: "text",
			localized: true,
		},
		{
			type: "group",
			name: "form",
			fields: [
				{
					type: "row",
					fields: [
						{ name: "empresaLabel", type: "text", localized: true },
						{ name: "nombreLabel", type: "text", localized: true },
						{ name: "apellidosLabel", type: "text", localized: true },
					],
				},
				{
					type: "row",
					fields: [
						{ name: "emailLabel", type: "text", localized: true },
						{ name: "asuntoLabel", type: "text", localized: true },
					],
				},
				{
					name: "comentarioLabel",
					type: "text",
					localized: true,
				},
				{
					type: "row",
					fields: [
						{ name: "privacyPrefix", type: "text", localized: true },
						{ name: "privacyLinkLabel", type: "text", localized: true },
					],
				},
				{
					name: "privacyPolicyUrl",
					type: "text",
					admin: { description: "Aún no existe una página de política de privacidad real — placeholder hasta que se publique." },
				},
				{
					type: "row",
					fields: [
						{ name: "submitLabel", type: "text", localized: true },
						{ name: "sendingLabel", type: "text", localized: true },
					],
				},
				{
					type: "row",
					fields: [
						{ name: "successMessage", type: "text", localized: true },
						{ name: "errorMessage", type: "text", localized: true },
					],
				},
			],
		},
	],
};
