"use client";

import { FieldLabel, TextInput, useField } from "@payloadcms/ui";
import type { TextFieldClientComponent } from "payload";
import type React from "react";

const HEX_RE = /^#[0-9a-fA-F]{6}$/;

export const ColorPickerField: TextFieldClientComponent = ({ field, path }) => {
	const { setValue, value } = useField<string>({ path });
	const currentValue = typeof value === "string" ? value : "";
	const swatchValue = HEX_RE.test(currentValue) ? currentValue : "#000000";

	return (
		<div className="field-type text">
			<FieldLabel label={field.label} path={path} required={field.required} />
			<div style={{ alignItems: "center", display: "flex", gap: "8px" }}>
				<input
					aria-label="Color"
					onChange={(e) => setValue(e.target.value)}
					style={{
						border: "1px solid var(--theme-elevation-150)",
						borderRadius: "4px",
						cursor: "pointer",
						height: "38px",
						padding: 0,
						width: "48px",
					}}
					type="color"
					value={swatchValue}
				/>
				<TextInput
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
					path={path}
					placeholder="#7B3F99"
					value={currentValue}
				/>
			</div>
		</div>
	);
};
