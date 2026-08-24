import type { GlobalConfig } from "payload";

import { afterChangePublishGlobalHook } from "../hooks/triggerRebuild";

export const SiteSettings: GlobalConfig = {
	slug: "site-settings",
	versions: {
		drafts: true,
	},
	hooks: {
		afterChange: [afterChangePublishGlobalHook],
	},
	fields: [
		{
			type: "group",
			name: "brand",
			fields: [
				{
					type: "row",
					fields: [
						{
							name: "logoOnDark",
							type: "upload",
							relationTo: "media",
							admin: { description: "Usado en Header (hero) y Footer, sobre fondos oscuros." },
						},
						{
							name: "logoOnLight",
							type: "upload",
							relationTo: "media",
							admin: { description: "Usado en Header sobre fondos claros (ej. página de Contacto)." },
						},
					],
				},
			],
		},
		{
			type: "group",
			name: "header",
			fields: [
				{
					name: "navNosotros",
					type: "text",
					localized: true,
					required: true,
				},
				{
					name: "navPorQueElegirnos",
					type: "text",
					localized: true,
					required: true,
				},
				{
					name: "navProductos",
					type: "text",
					localized: true,
					required: true,
				},
				{
					name: "navContacto",
					type: "text",
					localized: true,
					required: true,
				},
				{
					name: "logoAlt",
					type: "text",
					localized: true,
				},
				{
					name: "ariaOpenMenu",
					type: "text",
					localized: true,
				},
				{
					name: "ariaCloseMenu",
					type: "text",
					localized: true,
				},
				{
					name: "ariaMainNav",
					type: "text",
					localized: true,
				},
			],
		},
		{
			type: "group",
			name: "footer",
			fields: [
				{
					name: "description",
					type: "textarea",
					localized: true,
				},
				{
					name: "followUsLabel",
					type: "text",
					localized: true,
				},
				{
					name: "socialLinks",
					type: "array",
					admin: {
						description: "Redes sociales (Instagram, LinkedIn, etc). WhatsApp y email tienen sus propios campos abajo.",
					},
					fields: [
						{
							type: "row",
							fields: [
								{
									name: "platform",
									type: "select",
									required: true,
									options: [
										{ label: "Instagram", value: "instagram" },
										{ label: "LinkedIn", value: "linkedin" },
										{ label: "Facebook", value: "facebook" },
										{ label: "Correo", value: "email" },
										{ label: "Otro", value: "other" },
									],
								},
								{
									name: "url",
									type: "text",
									required: true,
								},
							],
						},
						{
							name: "label",
							type: "text",
							localized: true,
							admin: { description: "Texto accesible (aria-label) del ícono." },
						},
						{
							name: "icon",
							type: "upload",
							relationTo: "media",
						},
					],
				},
				{
					name: "copyrightLegalName",
					type: "text",
					admin: { description: "Razón social, ej. QuintanaGlobalHarvest S.A.S. No se traduce." },
				},
				{
					name: "devCredit",
					type: "text",
				},
			],
		},
		{
			type: "group",
			name: "contact",
			fields: [
				{
					name: "contactHeading",
					type: "text",
					localized: true,
				},
				{
					name: "locationLine",
					type: "text",
					localized: true,
				},
				{
					name: "email",
					type: "email",
				},
				{
					name: "website",
					type: "text",
				},
				{
					type: "row",
					fields: [
						{
							name: "whatsappNumber",
							type: "text",
							admin: { description: "Formato E.164, ej. +593939664770." },
						},
					],
				},
				{
					name: "whatsappMessageTemplate",
					type: "textarea",
					localized: true,
					admin: { description: "Mensaje precargado al abrir WhatsApp. Ahora sí varía por idioma." },
				},
			],
		},
		{
			type: "group",
			name: "seoDefaults",
			fields: [
				{
					name: "defaultTitle",
					type: "text",
					localized: true,
				},
				{
					name: "defaultDescription",
					type: "textarea",
					localized: true,
				},
				{
					name: "ogImage",
					type: "upload",
					relationTo: "media",
				},
				{
					type: "row",
					fields: [
						{
							name: "orgName",
							type: "text",
						},
						{
							name: "orgLegalName",
							type: "text",
						},
					],
				},
				{
					type: "row",
					fields: [
						{
							name: "orgAddressLocality",
							type: "text",
						},
						{
							name: "orgAddressCountry",
							type: "text",
						},
					],
				},
			],
		},
	],
};
