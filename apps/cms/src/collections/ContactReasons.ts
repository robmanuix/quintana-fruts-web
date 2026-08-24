import type { CollectionConfig } from "payload";

export const ContactReasons: CollectionConfig = {
	slug: "contact-reasons",
	admin: {
		useAsTitle: "label",
		defaultColumns: ["label", "key", "sortOrder"],
	},
	fields: [
		{
			name: "label",
			type: "text",
			required: true,
			localized: true,
			admin: {
				description: "Texto visible en el dropdown del formulario de contacto y en el asunto del correo.",
			},
		},
		{
			name: "key",
			type: "text",
			required: true,
			unique: true,
			admin: {
				description: "Identificador estable (no traducido), ej. product-quote. Usado internamente para enlazar CTAs.",
			},
		},
		{
			name: "sortOrder",
			type: "number",
			defaultValue: 0,
			admin: {
				description: "Controla el orden en el dropdown (menor primero).",
			},
		},
	],
};
