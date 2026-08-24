import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getPayload } from "payload";

import config from "../payload.config";

const dirname = path.dirname(fileURLToPath(import.meta.url));
// apps/cms/src/seed -> apps/web/src/assets
const webAssetsDir = path.resolve(dirname, "../../../web/src/assets");

const MIME_BY_EXT: Record<string, string> = {
	".png": "image/png",
	".svg": "image/svg+xml",
	".jpg": "image/jpeg",
};

async function uploadMedia(payload: Awaited<ReturnType<typeof getPayload>>, relPath: string, alt: string) {
	const filePath = path.join(webAssetsDir, relPath);
	const data = fs.readFileSync(filePath);
	const name = path.basename(filePath);
	const ext = path.extname(name).toLowerCase();
	const doc = await payload.create({
		collection: "media",
		data: { alt },
		file: { data, mimetype: MIME_BY_EXT[ext] ?? "application/octet-stream", name, size: data.length },
	});
	return doc.id;
}

const statLabels = {
	es: { origen: "Origen", sabor: "Sabor", temporada: "Temporada", transporte: "Transporte" },
	en: { origen: "Origin", sabor: "Flavor", temporada: "Season", transporte: "Shipping" },
};

const products = [
	{
		slug: "gulupa",
		accentColor: "#4a2565",
		scientificName: "Passiflora edulis",
		images: {
			main: "images/productos-1-main.png",
			top: "images/productos-1-top.png",
			bottom: "images/productos-1-bottom.png",
			bloom: "images/productos-1-bloom.png",
		},
		icons: {
			arrow: "icons/icon-cta-arrow-purple.svg",
			origen: "icons/icon-stat-origen-purple.svg",
			sabor: "icons/icon-stat-sabor-purple.svg",
			temporada: "icons/icon-stat-temporada-purple.svg",
			transporte: "icons/icon-stat-transporte-purple.svg",
		},
		es: {
			name: "Gulupa",
			description:
				"Fruta de corteza púrpura y pulpa aromática con un balance agridulce perfecto. Fuente natural de antioxidantes y vitamina C que contribuye al bienestar diario.",
			stats: { origen: "Ecuador", sabor: "Agridulce", temporada: "Todo el año", transporte: "Aéreo" },
		},
		en: {
			name: "Gulupa",
			description:
				"A purple-skinned fruit with fragrant pulp and a perfectly balanced sweet-tart flavor. A natural source of antioxidants and vitamin C that supports everyday wellness.",
			stats: { origen: "Ecuador", sabor: "Sweet-tart", temporada: "Year-round", transporte: "Air freight" },
		},
	},
	{
		slug: "granadilla",
		accentColor: "#f08120",
		scientificName: "Passiflora ligularis",
		images: {
			main: "images/productos-2-main.png",
			top: "images/productos-2-top.png",
			bottom: "images/productos-2-bottom.png",
			bloom: "images/productos-2-bloom.png",
		},
		icons: {
			arrow: "icons/icon-cta-arrow-orange.svg",
			origen: "icons/icon-stat-origen-orange.svg",
			sabor: "icons/icon-stat-sabor-orange.svg",
			temporada: "icons/icon-stat-temporada-orange.svg",
			transporte: "icons/icon-stat-transporte-orange.svg",
		},
		es: {
			name: "Granadilla",
			description:
				"Fruto de cáscara dorada con pulpa transparente y sumamente dulce. Destaca por su alto contenido de fibra y agua, siendo excelente para la digestión y el cuidado estomacal.",
			stats: { origen: "Ecuador", sabor: "Dulce", temporada: "Todo el año", transporte: "Aéreo" },
		},
		en: {
			name: "Granadilla",
			description:
				"A golden-shelled fruit with translucent, exceptionally sweet pulp. Notable for its high fiber and water content, making it excellent for digestion and stomach health.",
			stats: { origen: "Ecuador", sabor: "Sweet", temporada: "Year-round", transporte: "Air freight" },
		},
	},
	{
		slug: "naranjilla",
		accentColor: "#819227",
		scientificName: "Solanum quitoense",
		images: {
			main: "images/productos-3-main.png",
			top: "images/productos-3-top.png",
			bottom: "images/productos-3-bottom.png",
			bloom: "images/flor-naranjilla.png",
		},
		icons: {
			arrow: "icons/icon-cta-arrow-green.svg",
			origen: "icons/icon-stat-origen-green.svg",
			sabor: "icons/icon-stat-sabor-green.svg",
			temporada: "icons/icon-stat-temporada-green.svg",
			transporte: "icons/icon-stat-transporte-green.svg",
		},
		es: {
			name: "Naranjilla",
			description:
				"Fruto tropical de corteza naranja y pulpa densa, con un excelente aporte de vitamina A y C. Ideal para fortalecer el sistema inmune.",
			stats: { origen: "Ecuador", sabor: "Ácido - Dulce", temporada: "Todo el año", transporte: "Aéreo" },
		},
		en: {
			name: "Naranjilla",
			description:
				"A tropical fruit with orange skin and dense pulp, rich in vitamins A and C. Ideal for strengthening the immune system.",
			stats: { origen: "Ecuador", sabor: "Tart-sweet", temporada: "Year-round", transporte: "Air freight" },
		},
	},
];

const WEB_BUILD_USER_EMAIL = "web-build@quintanafruts.com";

let payloadInstance: Awaited<ReturnType<typeof getPayload>> | undefined;

async function run() {
	const payload = await getPayload({ config });
	payloadInstance = payload;

	const existingServiceUser = await payload.find({
		collection: "users",
		where: { email: { equals: WEB_BUILD_USER_EMAIL } },
		limit: 1,
	});
	const apiKey = crypto.randomBytes(32).toString("hex");
	if (existingServiceUser.totalDocs === 0) {
		await payload.create({
			collection: "users",
			data: {
				email: WEB_BUILD_USER_EMAIL,
				password: crypto.randomBytes(24).toString("hex"),
				name: "Astro build (service account)",
				role: "editor",
				enableAPIKey: true,
				apiKey,
			},
		});
		console.log("\nCreated service account for Astro's build-time fetch.");
	} else {
		// rotate the key on every run so it's always reprinted below, even if a
		// prior run created the user but its key was lost (e.g. truncated logs).
		await payload.update({
			collection: "users",
			id: existingServiceUser.docs[0]!.id,
			data: { enableAPIKey: true, apiKey },
		});
		console.log("\nService account already exists — rotated its API key.");
	}
	console.log(`Set this in apps/web/.env as PAYLOAD_API_KEY:\n${apiKey}\n`);

	let reasonQuoteId: number;
	let reasonGeneralId: number;
	const existingReasons = await payload.find({ collection: "contact-reasons", limit: 100 });
	if (existingReasons.totalDocs === 0) {
		const quote = await payload.create({
			collection: "contact-reasons",
			data: { key: "product-quote", label: "Cotización de productos", sortOrder: 1 },
			locale: "es",
		});
		await payload.update({ collection: "contact-reasons", id: quote.id, data: { label: "Product quote" }, locale: "en" });
		reasonQuoteId = Number(quote.id);

		const general = await payload.create({
			collection: "contact-reasons",
			data: { key: "general-info", label: "Información general", sortOrder: 2 },
			locale: "es",
		});
		await payload.update({ collection: "contact-reasons", id: general.id, data: { label: "General information" }, locale: "en" });
		reasonGeneralId = Number(general.id);

		console.log("Seeded contact-reasons.");
	} else {
		reasonQuoteId = Number(existingReasons.docs.find((r) => r.key === "product-quote")!.id);
		reasonGeneralId = Number(existingReasons.docs.find((r) => r.key === "general-info")!.id);
		console.log("contact-reasons already has data, skipping.");
	}

	const existingProducts = await payload.find({ collection: "products", limit: 100 });
	if (existingProducts.totalDocs > 0) {
		console.log("products already has data, skipping.");
	} else {
	let displayOrder = 1;
	for (const p of products) {
		const mainImage = await uploadMedia(payload, p.images.main, `${p.es.name} en su cultivo`);
		const topImage = await uploadMedia(payload, p.images.top, `${p.es.name} cortada`);
		const bottomImage = await uploadMedia(payload, p.images.bottom, `Planta de ${p.es.name}`);
		const bloomImage = await uploadMedia(payload, p.images.bloom, "");
		const arrowIcon = await uploadMedia(payload, p.icons.arrow, "");
		const iconOrigen = await uploadMedia(payload, p.icons.origen, "");
		const iconSabor = await uploadMedia(payload, p.icons.sabor, "");
		const iconTemporada = await uploadMedia(payload, p.icons.temporada, "");
		const iconTransporte = await uploadMedia(payload, p.icons.transporte, "");

		const statsBase = [
			{ icon: iconOrigen },
			{ icon: iconSabor },
			{ icon: iconTemporada },
			{ icon: iconTransporte },
		];

		const doc = await payload.create({
			collection: "products",
			data: {
				slug: p.slug,
				name: p.es.name,
				scientificName: p.scientificName,
				description: p.es.description,
				accentColor: p.accentColor,
				mainImage,
				topImage,
				bottomImage,
				bloomImage,
				arrowIcon,
				stats: [
					{ ...statsBase[0], label: statLabels.es.origen, value: p.es.stats.origen },
					{ ...statsBase[1], label: statLabels.es.sabor, value: p.es.stats.sabor },
					{ ...statsBase[2], label: statLabels.es.temporada, value: p.es.stats.temporada },
					{ ...statsBase[3], label: statLabels.es.transporte, value: p.es.stats.transporte },
				],
				displayOrder,
				featuredOnHomepage: true,
				_status: "published",
			},
			locale: "es",
		});

		await payload.update({
			collection: "products",
			id: doc.id,
			data: {
				name: p.en.name,
				description: p.en.description,
				stats: [
					{ ...statsBase[0], label: statLabels.en.origen, value: p.en.stats.origen },
					{ ...statsBase[1], label: statLabels.en.sabor, value: p.en.stats.sabor },
					{ ...statsBase[2], label: statLabels.en.temporada, value: p.en.stats.temporada },
					{ ...statsBase[3], label: statLabels.en.transporte, value: p.en.stats.transporte },
				],
				_status: "published",
			},
			locale: "en",
		});

		console.log(`Seeded product: ${p.slug}`);
		displayOrder += 1;
	}
	}

	// locale:'all' writes require every localized field as { es, en } instead of a
	// plain string — two separate per-locale updateGlobal calls silently lose data
	// for array sub-fields (Payload can't reconcile which row a later call's
	// locale-only values belong to), confirmed empirically while seeding this.
	const tt = (es: string, en: string) => ({ es, en });

	// ---- site-settings ----
	const siteSettings = await payload.findGlobal({ slug: "site-settings", locale: "es" });
	if (siteSettings.header?.navNosotros) {
		console.log("site-settings already seeded, skipping.");
	} else {
		const logoOnDark = await uploadMedia(payload, "icons/logo-quintana-fruits.svg", "");
		const logoOnLight = await uploadMedia(payload, "icons/logo-quintana-fruits-dark.svg", "");
		const iconInstagram = await uploadMedia(payload, "icons/icon-social-instagram.svg", "");
		const iconLinkedin = await uploadMedia(payload, "icons/icon-social-linkedin.svg", "");
		const iconEmail = await uploadMedia(payload, "icons/icon-social-email.svg", "");
		const ogImage = await uploadMedia(payload, "images/nosotros-orchard.png", "");

		await payload.updateGlobal({
			slug: "site-settings",
			locale: "all",
			data: {
				brand: { logoOnDark, logoOnLight },
				header: {
					navNosotros: tt("Nosotros", "About Us"),
					navPorQueElegirnos: tt("¿Por qué elegirnos?", "Why Choose Us?"),
					navProductos: tt("Productos", "Products"),
					navContacto: tt("Contacténos", "Contact Us"),
					logoAlt: tt("Quintana Früts - inicio", "Quintana Früts - home"),
					ariaOpenMenu: tt("Abrir menú", "Open menu"),
					ariaCloseMenu: tt("Cerrar menú", "Close menu"),
					ariaMainNav: tt("Navegación principal", "Main navigation"),
				},
				footer: {
					description: tt(
						"Exportadora de frutas exóticas de Ecuador. Seleccionamos fruta premium y trabajamos directamente con productores de confianza.",
						"An exotic fruit exporter from Ecuador. We select premium fruit and work directly with trusted growers.",
					),
					followUsLabel: tt("Síguenos en:", "Follow us:"),
					socialLinks: [
						{ platform: "instagram", url: "#", icon: iconInstagram, label: tt("Instagram", "Instagram") },
						{ platform: "linkedin", url: "#", icon: iconLinkedin, label: tt("LinkedIn", "LinkedIn") },
						{ platform: "email", url: "mailto:sales@quintanafruts.com", icon: iconEmail, label: tt("Correo", "Email") },
					],
					copyrightLegalName: "QuintanaGlobalHarvest S.A.S.",
					devCredit: "MARD Agencia",
				},
				contact: {
					contactHeading: tt("Contacto", "Contact"),
					locationLine: tt("Guayaquil, Ecuador", "Guayaquil, Ecuador"),
					email: "sales@quintanafruts.com",
					website: "https://www.quintanafruts.com",
					whatsappNumber: "+593939664770",
					whatsappMessageTemplate: tt(
						"Hola Quintana Früts.\nMe gustaría más información sobre sus productos.",
						"Hello Quintana Früts.\nI would like more information about your products.",
					),
				},
				seoDefaults: {
					defaultTitle: tt("Quintana Früts | Frutas exóticas premium de Ecuador", "Quintana Früts | Premium Exotic Fruit from Ecuador"),
					defaultDescription: tt(
						"Exportadora de frutas exóticas premium de Ecuador. Cultivo responsable, trazabilidad total y calidad que cruza fronteras.",
						"Premium exotic fruit exporter from Ecuador. Responsible farming, full traceability, and quality that crosses borders.",
					),
					ogImage,
					orgName: "Quintana Früts",
					orgLegalName: "QuintanaGlobalHarvest S.A.S.",
					orgAddressLocality: "Guayaquil",
					orgAddressCountry: "EC",
				},
				_status: "published",
			},
		});

		console.log("Seeded site-settings.");
	}

	// ---- home-page ----
	const homePage = await payload.findGlobal({ slug: "home-page", locale: "es" });
	if (homePage.hero?.titleLine1) {
		console.log("home-page already seeded, skipping.");
	} else {
		const heroFruit1 = await uploadMedia(payload, "images/hero-fruit-1.png", "");
		const heroFruit2 = await uploadMedia(payload, "images/hero-fruit-2.png", "");
		const heroFruit3 = await uploadMedia(payload, "images/hero-fruit-3.png", "");
		const decoImage1 = await uploadMedia(payload, "images/nosotros-deco-1.png", "");
		const decoImage2 = await uploadMedia(payload, "images/nosotros-deco-2.png", "");
		const orchardImage = await uploadMedia(payload, "images/nosotros-orchard.png", "");
		const iconLeaf = await uploadMedia(payload, "icons/icon-leaf.svg", "");
		const iconMagnifier = await uploadMedia(payload, "icons/icon-magnifier.svg", "");
		const iconGlobeOutline = await uploadMedia(payload, "icons/icon-globe-outline.svg", "");
		const handFruitImage = await uploadMedia(payload, "images/nosotros-hand-fruit.png", "");
		const vineyardImage = await uploadMedia(payload, "images/nosotros-vineyard.png", "");

		const cardAssets = [
			{
				image: "images/elegirnos-1.jpg",
				icon: "icons/icon-map-location.svg",
				alt: "Viñedos de Quintana Früts en Ecuador",
				title: tt("Origen directo desde Ecuador", "Direct origin from Ecuador"),
				description: tt(
					"Eliminamos intermediarios conectando tu negocio directamente con el origen.",
					"We cut out middlemen, connecting your business directly to the source.",
				),
			},
			{
				image: "images/elegirnos-2.png",
				icon: "icons/icon-world-nature.svg",
				alt: "Cultivo responsable y sostenible",
				title: tt("Frutas exóticas premium", "Premium exotic fruit"),
				description: tt(
					"Iniciamos nuestra oferta global con una selección estratégica de alta gama.",
					"We launch our global offering with a strategically curated, high-end selection.",
				),
			},
			{
				image: "images/elegirnos-3.png",
				icon: "icons/icon-bote.svg",
				alt: "De Ecuador para el mundo: exportación aérea y marítima",
				title: tt("Logística de exportación confiable", "Reliable export logistics"),
				description: tt(
					"Diseñamos soluciones logísticas a la medida de los mercados más exigentes.",
					"We design logistics solutions tailored to the most demanding markets.",
				),
			},
			{
				image: "images/elegirnos-4.png",
				icon: "icons/icon-certificate.svg",
				alt: "Calidad certificada",
				title: tt("Estándares de calidad internacional", "International quality standards"),
				description: tt(
					"Garantizamos la máxima integridad del producto mediante procesos alineados con los mercados más exigentes.",
					"We guarantee maximum product integrity through processes aligned with the most demanding markets.",
				),
			},
			{
				image: "images/elegirnos-5.png",
				icon: "icons/icon-persons.svg",
				alt: "Relaciones de confianza con productores",
				title: tt("Relaciones comerciales duraderas", "Lasting business relationships"),
				description: tt(
					"Alineamos nuestros objetivos con los suyos para convertirnos en una extensión de su propia cadena de valor.",
					"We align our goals with yours to become a true extension of your own value chain.",
				),
			},
			{
				image: "images/elegirnos-6.jpg",
				icon: "icons/icon-calendar.svg",
				alt: "Disponibilidad y logística todo el año",
				title: tt("Disponibilidad todo el año", "Year-round availability"),
				description: tt(
					"Aprovechamos la ubicación ecuatorial privilegiada y los microclimas de Ecuador para romper la estacionalidad de las frutas exóticas.",
					"We leverage Ecuador's privileged equatorial location and microclimates to break the seasonality of exotic fruit.",
				),
			},
		];
		const cards = [];
		for (const c of cardAssets) {
			cards.push({
				image: await uploadMedia(payload, c.image, c.alt),
				imageAlt: tt(c.alt, c.alt),
				icon: await uploadMedia(payload, c.icon, ""),
				title: c.title,
				description: c.description,
			});
		}

		const beneficiosAssets = [
			{ icon: "icons/icon-productos-quality.svg", title: tt("Calidad\nexcepcional", "Exceptional\nquality"), desc: tt("Seleccionamos frutas exóticas con los más\naltos estándares", "We select exotic fruit that meets the\nhighest standards") },
			{ icon: "icons/icon-productos-trace.svg", title: tt("Trazabilidad\ncompleta", "Full\ntraceability"), desc: tt("Controlamos cada etapa para garantizar\ntransparencia y origen confiable.", "We monitor every stage to ensure\ntransparency and a trusted origin.") },
			{ icon: "icons/icon-productos-logistics.svg", title: tt("Logística\nconfiable", "Reliable\nlogistics"), desc: tt("Coordinamos envíos internacionales\nseguros y eficientes.", "We coordinate international shipments\nthat are safe and efficient.") },
			{ icon: "icons/icon-productos-partnership.svg", title: tt("Relaciones\nduraderas", "Lasting\nrelationships"), desc: tt("Construimos alianzas basadas en\nconfianza y compromiso.", "We build partnerships based on\ntrust and commitment.") },
			{ icon: "icons/icon-productos-calendar.svg", title: tt("Disponibilidad\ntodo el año", "Year-round\navailability"), desc: tt("Suministro constante para acompañar\ntu demanda.", "Consistent supply to keep up\nwith your demand.") },
		];
		const beneficiosItems = [];
		for (const b of beneficiosAssets) {
			beneficiosItems.push({ icon: await uploadMedia(payload, b.icon, ""), title: b.title, desc: b.desc });
		}

		await payload.updateGlobal({
			slug: "home-page",
			locale: "all",
			data: {
				hero: {
					titleLine1: tt("Donde la calidad", "Where quality"),
					titleLine2Prefix: tt("comienza ", "begins "),
					titleAccent: tt("desde el origen", "from the source"),
					subtitleLine1: tt("Frutas exóticas premium", "Premium exotic fruits"),
					subtitleLine2: tt("de Ecuador.", "from Ecuador."),
					ctaLabel: tt("Solicitar información", "Request information"),
					ctaReason: reasonGeneralId,
					backgroundImages: [
						{ image: heroFruit3, columnKey: "purple", zoom: 1.46, panY: -46 },
						{ image: heroFruit2, columnKey: "tamarillo", zoom: 1.2, panY: -20 },
						{ image: heroFruit1, columnKey: "granadilla", zoom: 1.9, panY: -85 },
					],
				},
				nosotros: {
					floatingImages: [{ image: decoImage1 }, { image: decoImage1 }, { image: decoImage2 }],
					bloque1: {
						headingLine1: tt("De Ecuador", "From Ecuador"),
						headingLine2: tt("para el mundo,", "to the world,"),
						headingAccent: tt("con transparencia.", "with transparency."),
						bodyFragments: [
							{
								text: tt(
									"En Quintana Früts nos especializamos en la exportación de frutas exóticas premium de Ecuador, donde hacemos de la ",
									"At Quintana Früts we specialize in exporting Ecuador's premium exotic fruit, making ",
								),
							},
							{ text: tt("transparencia en la cadena", "supply chain transparency"), highlight: true },
							{ text: tt(" y el ", " and ") },
							{ text: tt("cultivo limpio", "clean farming"), highlight: true },
							{ text: tt(" los pilares de nuestra operación.", " the pillars of our operation.") },
						],
						features: [
							{ icon: iconLeaf, label: tt("Cultivo\nResposable", "Responsible\nfarming") },
							{ icon: iconMagnifier, label: tt("Trazabilidad\nTotal", "Full\ntraceability") },
							{ icon: iconGlobeOutline, label: tt("Calidad que cruza fronteras", "Quality that crosses borders") },
						],
						featuredImage: orchardImage,
						featuredImageAlt: tt("Cultivo de granadillas de Quintana Früts en Ecuador", "Quintana Früts passion fruit crop in Ecuador"),
					},
					bloque2: {
						compromisoPrefix: tt("Frutas excepcionales, relaciones ", "Exceptional fruit, relationships "),
						compromisoAccent: tt("duraderas", "built to last"),
						compromisoBody: tt(
							"Trabajamos junto a productores locales de confianza para ofrecer frutas exóticas con los más altos estándares de calidad, seguridad alimentaria y responsabilidad social.",
							"We work with trusted local growers to deliver exotic fruit that meets the highest standards of quality, food safety, and social responsibility.",
						),
						featuredImages: [
							{ image: handFruitImage, alt: tt("Granadilla fresca recién cortada", "Freshly cut passion fruit") },
							{
								image: vineyardImage,
								alt: tt("Cultivos de Quintana Früts en las montañas de Ecuador", "Quintana Früts crops in the mountains of Ecuador"),
							},
						],
					},
				},
				porQueElegirnos: {
					headingPrefix: tt("Lo que nos hace tu ", "What makes us your "),
					headingAccent: tt("mejor aliado.", "best ally."),
					body: tt(
						"Trabajamos junto a productores locales de confianza para ofrecer frutas exóticas con los más altos estándares de calidad, seguridad alimentaria y responsabilidad social.",
						"We work with trusted local growers to deliver exotic fruit that meets the highest standards of quality, food safety, and social responsibility.",
					),
					captionText: tt(
						"De Ecuador para el mundo, con calidad que se siente y confianza que perdura.",
						"From Ecuador to the world, with quality you can feel and trust that lasts.",
					),
					cards,
				},
				productos: {
					heading: tt("Frutas de Ecuador seleccionadas para el mundo.", "Ecuador's fruit, selected for the world."),
					subheading: tt(
						"Calidad superior, trazabilidad y relaciones que perduran.",
						"Superior quality, full traceability, and relationships built to last.",
					),
					ctaFichaLabel: tt("Ficha técnica", "Technical sheet"),
					ctaCotizarLabel: tt("Solicitar cotización", "Request a quote"),
					ctaCotizarReason: reasonQuoteId,
				},
				beneficios: {
					items: beneficiosItems,
				},
				_status: "published",
			},
		});

		console.log("Seeded home-page.");
	}

	// ---- contact-page ----
	const contactPage = await payload.findGlobal({ slug: "contact-page", locale: "es" });
	if (contactPage.headingPrefix) {
		console.log("contact-page already seeded, skipping.");
	} else {
		await payload.updateGlobal({
			slug: "contact-page",
			locale: "all",
			data: {
				seo: {
					pageTitle: tt("Contacto | Quintana Früts", "Contact | Quintana Früts"),
					pageDescription: tt(
						"Ponte en contacto con Quintana Früts. Escríbenos o completa el formulario para más información sobre nuestras frutas exóticas premium de Ecuador.",
						"Get in touch with Quintana Früts. Write to us or fill out the form for more information about our premium exotic fruit from Ecuador.",
					),
				},
				headingPrefix: tt("Ponte en ", "Get in "),
				headingAccent: tt("contacto", "touch"),
				headingSuffix: tt(" con nosotros.", " with us."),
				subtextPrefix: tt("Estamos cerca de ti, escríbenos a ", "We're here for you, write to us at "),
				cardHeading: tt("Para más información, completa el formulario", "For more information, fill out the form"),
				form: {
					empresaLabel: tt("Empresa", "Company"),
					nombreLabel: tt("Nombre", "First name"),
					apellidosLabel: tt("Apellidos", "Last name"),
					emailLabel: tt("Correo electrónico", "Email"),
					asuntoLabel: tt("Asunto", "Subject"),
					comentarioLabel: tt("Comentario", "Message"),
					privacyPrefix: tt("He leído y acepto las condiciones de la ", "I have read and accept the "),
					privacyLinkLabel: tt("Política de Privacidad", "Privacy Policy"),
					privacyPolicyUrl: "#",
					submitLabel: tt("Enviar", "Send"),
					sendingLabel: tt("Enviando...", "Sending..."),
					successMessage: tt(
						"¡Gracias! Recibimos tu mensaje y te contactaremos pronto.",
						"Thank you! We've received your message and will contact you soon.",
					),
					errorMessage: tt(
						"No pudimos enviar tu mensaje. Intenta de nuevo o escríbenos directo a sales@quintanafruts.com.",
						"We couldn't send your message. Please try again or email us directly at sales@quintanafruts.com.",
					),
				},
				_status: "published",
			},
		});

		console.log("Seeded contact-page.");
	}

	console.log("Seed complete.");
}

// top-level await: `payload run` resolves its dynamic import() as soon as this
// module's synchronous body finishes, so without awaiting here the process
// exits before run()'s async DB work ever completes.
await run()
	.catch((error) => {
		console.error(error);
		process.exitCode = 1;
	})
	.finally(async () => {
		// avoid process.exit() — on Windows it can truncate buffered
		// stdout/stderr writes to a redirected file before they're flushed.
		await payloadInstance?.db.destroy?.();
	});
