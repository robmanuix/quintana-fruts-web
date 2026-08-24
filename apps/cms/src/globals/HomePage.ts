import type { GlobalConfig } from "payload";

import { afterChangePublishGlobalHook } from "../hooks/triggerRebuild";

export const HomePage: GlobalConfig = {
	slug: "home-page",
	versions: {
		drafts: true,
	},
	hooks: {
		afterChange: [afterChangePublishGlobalHook],
	},
	fields: [
		{
			type: "group",
			name: "hero",
			fields: [
				{
					name: "titleLine1",
					type: "text",
					localized: true,
					required: true,
				},
				{
					type: "row",
					fields: [
						{
							name: "titleLine2Prefix",
							type: "text",
							localized: true,
						},
						{
							name: "titleAccent",
							type: "text",
							localized: true,
						},
					],
				},
				{
					name: "subtitleLine1",
					type: "text",
					localized: true,
				},
				{
					name: "subtitleLine2",
					type: "text",
					localized: true,
				},
				{
					type: "row",
					fields: [
						{
							name: "ctaLabel",
							type: "text",
							localized: true,
						},
						{
							name: "ctaReason",
							type: "relationship",
							relationTo: "contact-reasons",
							admin: { description: "Motivo precargado en el formulario de contacto al hacer clic en el CTA." },
						},
					],
				},
				{
					name: "backgroundImages",
					type: "array",
					minRows: 3,
					maxRows: 3,
					admin: {
						description: "Las 3 fotos de fondo del Hero (escritorio: columnas; móvil: slideshow).",
					},
					fields: [
						{
							name: "image",
							type: "upload",
							relationTo: "media",
							required: true,
						},
						{
							name: "columnKey",
							type: "select",
							required: true,
							options: [
								{ label: "Morado (izquierda)", value: "purple" },
								{ label: "Tamarillo (centro)", value: "tamarillo" },
								{ label: "Granadilla (derecha)", value: "granadilla" },
							],
							admin: {
								description:
									"Identifica la posición/columna, no depende del orden del array. 'Granadilla' tiene un encuadre especial (foto emparejada) en el CSS.",
							},
						},
						{
							type: "row",
							fields: [
								{
									name: "zoom",
									type: "number",
									defaultValue: 1,
								},
								{
									name: "panY",
									type: "number",
									defaultValue: 0,
								},
							],
						},
					],
				},
			],
		},
		{
			type: "group",
			name: "nosotros",
			fields: [
				{
					name: "floatingImages",
					type: "array",
					minRows: 3,
					maxRows: 3,
					admin: {
						description: "Las 3 imágenes decorativas con efecto parallax.",
					},
					fields: [
						{
							name: "image",
							type: "upload",
							relationTo: "media",
							required: true,
						},
					],
				},
				{
					type: "group",
					name: "bloque1",
					fields: [
						{
							type: "row",
							fields: [
								{
									name: "headingLine1",
									type: "text",
									localized: true,
								},
								{
									name: "headingLine2",
									type: "text",
									localized: true,
								},
								{
									name: "headingAccent",
									type: "text",
									localized: true,
								},
							],
						},
						{
							name: "bodyFragments",
							type: "array",
							admin: {
								description: "El párrafo principal, dividido en fragmentos. Marca 'highlight' para resaltar en naranja.",
							},
							fields: [
								{
									name: "text",
									type: "text",
									required: true,
									localized: true,
								},
								{
									name: "highlight",
									type: "checkbox",
									defaultValue: false,
								},
							],
						},
						{
							name: "features",
							type: "array",
							admin: {
								description: "Los íconos con texto debajo del párrafo (ej. Cultivo responsable, Trazabilidad...).",
							},
							fields: [
								{
									name: "icon",
									type: "upload",
									relationTo: "media",
									required: true,
								},
								{
									name: "label",
									type: "textarea",
									required: true,
									localized: true,
									admin: { description: "Usa saltos de línea para controlar el corte de línea." },
								},
							],
						},
						{
							name: "featuredImage",
							type: "upload",
							relationTo: "media",
							admin: { description: "La foto grande (huerto)." },
						},
						{
							name: "featuredImageAlt",
							type: "text",
							localized: true,
						},
					],
				},
				{
					type: "group",
					name: "bloque2",
					fields: [
						{
							type: "row",
							fields: [
								{
									name: "compromisoPrefix",
									type: "text",
									localized: true,
								},
								{
									name: "compromisoAccent",
									type: "text",
									localized: true,
								},
							],
						},
						{
							name: "compromisoBody",
							type: "textarea",
							localized: true,
						},
						{
							name: "featuredImages",
							type: "array",
							minRows: 2,
							maxRows: 2,
							admin: { description: "Las 2 fotos de galería." },
							fields: [
								{
									name: "image",
									type: "upload",
									relationTo: "media",
									required: true,
								},
								{
									name: "alt",
									type: "text",
									localized: true,
								},
							],
						},
					],
				},
			],
		},
		{
			type: "group",
			name: "porQueElegirnos",
			fields: [
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
					],
				},
				{
					name: "body",
					type: "textarea",
					localized: true,
				},
				{
					name: "captionText",
					type: "textarea",
					localized: true,
				},
				{
					name: "cards",
					type: "array",
					admin: {
						description: "Tarjetas de la sección — crear, editar, eliminar y reordenar libremente.",
					},
					fields: [
						{
							name: "image",
							type: "upload",
							relationTo: "media",
							required: true,
						},
						{
							name: "imageAlt",
							type: "text",
							localized: true,
						},
						{
							name: "icon",
							type: "upload",
							relationTo: "media",
							required: true,
						},
						{
							name: "title",
							type: "text",
							required: true,
							localized: true,
						},
						{
							name: "description",
							type: "textarea",
							required: true,
							localized: true,
						},
					],
				},
			],
		},
		{
			type: "group",
			name: "productos",
			admin: {
				description: "Solo el copy de la sección — los productos en sí se administran en la colección Products.",
			},
			fields: [
				{
					name: "heading",
					type: "text",
					localized: true,
				},
				{
					name: "subheading",
					type: "text",
					localized: true,
				},
				{
					type: "row",
					fields: [
						{
							name: "ctaFichaLabel",
							type: "text",
							localized: true,
						},
						{
							name: "ctaCotizarLabel",
							type: "text",
							localized: true,
						},
						{
							name: "ctaCotizarReason",
							type: "relationship",
							relationTo: "contact-reasons",
						},
					],
				},
			],
		},
		{
			type: "group",
			name: "beneficios",
			admin: {
				description: "Franja de confianza al final de Productos.",
			},
			fields: [
				{
					name: "heading",
					type: "text",
					localized: true,
				},
				{
					name: "items",
					type: "array",
					admin: {
						description: "Crear, editar, eliminar y reordenar libremente.",
					},
					fields: [
						{
							name: "icon",
							type: "upload",
							relationTo: "media",
							required: true,
						},
						{
							name: "title",
							type: "textarea",
							required: true,
							localized: true,
						},
						{
							name: "desc",
							type: "textarea",
							required: true,
							localized: true,
						},
					],
				},
			],
		},
	],
};
