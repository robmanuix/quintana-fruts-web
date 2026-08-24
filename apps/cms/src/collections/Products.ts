import type { CollectionConfig } from "payload";

import { afterChangePublishHook, afterDeleteRebuildHook } from "../hooks/triggerRebuild";

const HEX_RE = /^#[0-9a-fA-F]{6}$/;

export const Products: CollectionConfig = {
	slug: "products",
	admin: {
		useAsTitle: "name",
		defaultColumns: ["name", "slug", "displayOrder", "featuredOnHomepage"],
	},
	versions: {
		drafts: true,
	},
	hooks: {
		afterChange: [afterChangePublishHook],
		afterDelete: [afterDeleteRebuildHook],
	},
	fields: [
		{
			name: "slug",
			type: "text",
			required: true,
			unique: true,
			admin: {
				description: "Identificador estable, ej. naranjilla. No se traduce.",
			},
		},
		{
			name: "name",
			type: "text",
			required: true,
			localized: true,
		},
		{
			name: "scientificName",
			type: "text",
			admin: {
				description: "Nombre científico (binomio latino). No se traduce.",
			},
		},
		{
			name: "description",
			type: "textarea",
			localized: true,
		},
		{
			name: "accentColor",
			type: "text",
			admin: {
				description: "Color de acento libre (hex), ej. #7B3F99.",
				components: {
					Field: "@/fields/ColorPickerField/ColorPickerField.client#ColorPickerField",
				},
			},
			validate: (value: unknown) => {
				if (!value) return true;
				if (typeof value === "string" && HEX_RE.test(value)) return true;
				return "Debe ser un color hexadecimal de 6 dígitos, ej. #7B3F99";
			},
		},
		{
			type: "row",
			fields: [
				{
					name: "mainImage",
					type: "upload",
					relationTo: "media",
					required: true,
				},
				{
					name: "topImage",
					type: "upload",
					relationTo: "media",
					required: true,
				},
				{
					name: "bottomImage",
					type: "upload",
					relationTo: "media",
					required: true,
				},
			],
		},
		{
			name: "bloomImage",
			type: "upload",
			relationTo: "media",
			admin: {
				description: "Flor decorativa en la esquina de la tarjeta (opcional).",
			},
		},
		{
			name: "arrowIcon",
			type: "upload",
			relationTo: "media",
			admin: {
				description: "Ícono neutro (se recolorea con el color de acento). Opcional.",
			},
		},
		{
			name: "stats",
			type: "array",
			minRows: 4,
			maxRows: 4,
			admin: {
				description: "Los 4 datos del grid (origen, sabor, temporada, transporte).",
			},
			fields: [
				{
					name: "icon",
					type: "upload",
					relationTo: "media",
				},
				{
					name: "label",
					type: "text",
					required: true,
					localized: true,
				},
				{
					name: "value",
					type: "text",
					required: true,
					localized: true,
				},
			],
		},
		{
			name: "technicalSheet",
			type: "upload",
			relationTo: "media",
			admin: {
				description: "Ficha técnica en PDF.",
			},
		},
		{
			type: "row",
			fields: [
				{
					name: "displayOrder",
					type: "number",
					defaultValue: 0,
					admin: {
						description: "Orden de aparición (menor primero).",
					},
				},
				{
					name: "featuredOnHomepage",
					type: "checkbox",
					defaultValue: true,
				},
			],
		},
	],
};
