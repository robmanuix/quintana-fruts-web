import type { APIRoute } from "astro";
import nodemailer from "nodemailer";

export const prerender = false;

const REQUIRED_FIELDS = ["nombre", "apellidos", "email", "asunto", "comentario"] as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string) {
	const now = Date.now();
	const timestamps = (requestLog.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
	timestamps.push(now);
	requestLog.set(ip, timestamps);
	return timestamps.length > RATE_LIMIT_MAX;
}

function escapeHtml(value: string) {
	return value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;");
}

function buildEmailHtml(fields: Record<string, string>) {
	const row = (label: string, value: string) =>
		value
			? `<tr>
				<td style="padding:10px 16px;border-bottom:1px solid #e5e2d8;font-family:Arial,sans-serif;font-size:13px;color:#6b6b66;white-space:nowrap;vertical-align:top;">${label}</td>
				<td style="padding:10px 16px;border-bottom:1px solid #e5e2d8;font-family:Arial,sans-serif;font-size:14px;color:#191917;">${escapeHtml(value)}</td>
			</tr>`
			: "";

	return `
	<div style="background:#f3e8d1;padding:32px 16px;font-family:Arial,sans-serif;">
		<div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;">
			<div style="background:#191917;padding:24px 32px;">
				<span style="font-family:Arial,sans-serif;font-size:20px;font-weight:700;color:#f3e8d1;">Quintana</span>
				<span style="font-family:Arial,sans-serif;font-size:20px;font-weight:700;color:#f08120;"> Früts</span>
			</div>
			<div style="padding:24px 32px 8px;">
				<h1 style="margin:0 0 4px;font-family:Arial,sans-serif;font-size:18px;color:#191917;">Nueva solicitud de contacto</h1>
				<p style="margin:0 0 20px;font-family:Arial,sans-serif;font-size:13px;color:#6b6b66;">Recibida desde el formulario de quintanafruts.com</p>
			</div>
			<table style="width:100%;border-collapse:collapse;">
				${row("Empresa", fields.empresa)}
				${row("Nombre", `${fields.nombre} ${fields.apellidos}`)}
				${row("Correo", fields.email)}
				${row("Asunto", fields.asunto)}
			</table>
			<div style="padding:20px 32px 28px;">
				<p style="margin:0 0 6px;font-family:Arial,sans-serif;font-size:13px;color:#6b6b66;">Comentario</p>
				<p style="margin:0;font-family:Arial,sans-serif;font-size:14px;color:#191917;white-space:pre-wrap;">${escapeHtml(fields.comentario)}</p>
			</div>
		</div>
	</div>`;
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
	// behind Coolify's Traefik + Cloudflare, the raw socket address is the proxy's,
	// not the visitor's — the real IP is the first hop in X-Forwarded-For.
	const forwardedFor = request.headers.get("x-forwarded-for");
	const ip = forwardedFor?.split(",")[0]?.trim() || clientAddress;

	if (isRateLimited(ip)) {
		return new Response(JSON.stringify({ error: "Demasiadas solicitudes. Intenta de nuevo más tarde." }), { status: 429 });
	}

	let data: Record<string, unknown>;
	try {
		data = await request.json();
	} catch {
		return new Response(JSON.stringify({ error: "Solicitud inválida." }), { status: 400 });
	}

	// honeypot: real visitors never fill this hidden field
	if (typeof data.website === "string" && data.website.trim() !== "") {
		return new Response(JSON.stringify({ ok: true }), { status: 200 });
	}

	const fields: Record<string, string> = {};
	for (const key of ["empresa", "nombre", "apellidos", "email", "asunto", "comentario"]) {
		fields[key] = typeof data[key] === "string" ? (data[key] as string).trim() : "";
	}

	for (const field of REQUIRED_FIELDS) {
		if (!fields[field]) {
			return new Response(JSON.stringify({ error: `El campo "${field}" es obligatorio.` }), { status: 400 });
		}
	}
	if (!EMAIL_RE.test(fields.email)) {
		return new Response(JSON.stringify({ error: "El correo electrónico no es válido." }), { status: 400 });
	}

	const smtpUser = process.env.ZOHO_SMTP_USER;
	const smtpPass = process.env.ZOHO_SMTP_PASS;
	const toAddress = process.env.CONTACT_TO_EMAIL;

	if (!smtpUser || !smtpPass || !toAddress) {
		console.error("Missing SMTP configuration: ZOHO_SMTP_USER / ZOHO_SMTP_PASS / CONTACT_TO_EMAIL");
		return new Response(JSON.stringify({ error: "No se pudo enviar el mensaje. Intenta más tarde." }), { status: 500 });
	}

	const transporter = nodemailer.createTransport({
		host: "smtp.zoho.com",
		port: 465,
		secure: true,
		auth: { user: smtpUser, pass: smtpPass },
	});

	try {
		await transporter.sendMail({
			from: `"Quintana Früts — Web" <${smtpUser}>`,
			to: toAddress,
			replyTo: `"${fields.nombre} ${fields.apellidos}" <${fields.email}>`,
			subject: `[Contacto web] ${fields.asunto} — ${fields.empresa || fields.nombre}`,
			headers: {
				"X-Contact-Source": "quintanafruts.com/contacto",
				"X-Contact-Reason": fields.asunto,
			},
			html: buildEmailHtml(fields),
			text: [
				`Empresa: ${fields.empresa || "-"}`,
				`Nombre: ${fields.nombre} ${fields.apellidos}`,
				`Correo: ${fields.email}`,
				`Asunto: ${fields.asunto}`,
				"",
				"Comentario:",
				fields.comentario,
			].join("\n"),
		});
	} catch (error) {
		console.error("Failed to send contact email:", error);
		return new Response(JSON.stringify({ error: "No se pudo enviar el mensaje. Intenta más tarde." }), { status: 502 });
	}

	return new Response(JSON.stringify({ ok: true }), { status: 200 });
};
