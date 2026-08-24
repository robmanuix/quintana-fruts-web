export const translations = {
	es: {
		header: {
			nav: {
				nosotros: "Nosotros",
				porQueElegirnos: "¿Por qué elegirnos?",
				productos: "Productos",
				contacto: "Contacténos",
			},
			logoAlt: "Quintana Früts - inicio",
			openMenu: "Abrir menú",
			closeMenu: "Cerrar menú",
			mainNav: "Navegación principal",
			switchTo: "EN",
		},
		hero: {
			titleLine1: "Donde la calidad",
			titleLine2Prefix: "comienza ",
			titleAccent: "desde el origen",
			subtitleLine1: "Frutas exóticas premium",
			subtitleLine2: "de Ecuador.",
			cta: "Solicitar información",
			ctaAsunto: "Información general",
		},
		nosotros: {
			headingLine1: "De Ecuador",
			headingLine2: "para el mundo,",
			headingAccent: "con transparencia.",
			body: [
				{ text: "En Quintana Früts nos especializamos en la exportación de frutas exóticas premium de Ecuador, donde hacemos de la " },
				{ text: "transparencia en la cadena", highlight: true },
				{ text: " y el " },
				{ text: "cultivo limpio", highlight: true },
				{ text: " los pilares de nuestra operación." },
			],
			features: [
				{ label: ["Cultivo", "Resposable"] },
				{ label: ["Trazabilidad", "Total"] },
				{ label: ["Calidad que cruza fronteras"] },
			],
			compromisoPrefix: "Frutas excepcionales, relaciones ",
			compromisoAccent: "duraderas",
			compromisoBody:
				"Trabajamos junto a productores locales de confianza para ofrecer frutas exóticas con los más altos estándares de calidad, seguridad alimentaria y responsabilidad social.",
			mainImageAlt: "Cultivo de granadillas de Quintana Früts en Ecuador",
			galleryAlt1: "Granadilla fresca recién cortada",
			galleryAlt2: "Cultivos de Quintana Früts en las montañas de Ecuador",
		},
		porQueElegirnos: {
			headingPrefix: "Lo que nos hace tu ",
			headingAccent: "mejor aliado.",
			body: "Trabajamos junto a productores locales de confianza para ofrecer frutas exóticas con los más altos estándares de calidad, seguridad alimentaria y responsabilidad social.",
			cards: [
				{
					title: "Origen directo desde Ecuador",
					description: "Eliminamos intermediarios conectando tu negocio directamente con el origen.",
				},
				{
					title: "Frutas exóticas premium",
					description: "Iniciamos nuestra oferta global con una selección estratégica de alta gama.",
				},
				{
					title: "Logística de exportación confiable",
					description: "Diseñamos soluciones logísticas a la medida de los mercados más exigentes.",
				},
				{
					title: "Estándares de calidad internacional",
					description: "Garantizamos la máxima integridad del producto mediante procesos alineados con los mercados más exigentes.",
				},
				{
					title: "Relaciones comerciales duraderas",
					description: "Alineamos nuestros objetivos con los suyos para convertirnos en una extensión de su propia cadena de valor.",
				},
				{
					title: "Disponibilidad todo el año",
					description:
						"Aprovechamos la ubicación ecuatorial privilegiada y los microclimas de Ecuador para romper la estacionalidad de las frutas exóticas.",
				},
			],
			dotsAriaLabel: "Seleccionar tarjeta",
			dotAriaLabel: "Ver",
			captionText: "De Ecuador para el mundo, con calidad que se siente y confianza que perdura.",
		},
		productos: {
			heading: "Frutas de Ecuador seleccionadas para el mundo.",
			subheading: "Calidad superior, trazabilidad y relaciones que perduran.",
			products: [
				{
					name: "Gulupa",
					description:
						"Fruta de corteza púrpura y pulpa aromática con un balance agridulce perfecto. Fuente natural de antioxidantes y vitamina C que contribuye al bienestar diario.",
					statValues: { origen: "Ecuador", sabor: "Agridulce", temporada: "Todo el año", transporte: "Aéreo" },
				},
				{
					name: "Granadilla",
					description:
						"Fruto de cáscara dorada con pulpa transparente y sumamente dulce. Destaca por su alto contenido de fibra y agua, siendo excelente para la digestión y el cuidado estomacal.",
					statValues: { origen: "Ecuador", sabor: "Dulce", temporada: "Todo el año", transporte: "Aéreo" },
				},
				{
					name: "Naranjilla",
					description:
						"Fruto tropical de corteza naranja y pulpa densa, con un excelente aporte de vitamina A y C. Ideal para fortalecer el sistema inmune.",
					statValues: { origen: "Ecuador", sabor: "Ácido - Dulce", temporada: "Todo el año", transporte: "Aéreo" },
				},
			],
			statLabels: { origen: "Origen", sabor: "Sabor", temporada: "Temporada", transporte: "Transporte" },
			ctaFicha: "Ficha técnica",
			ctaCotizar: "Solicitar cotización",
			ctaAsunto: "Cotización de productos",
			photoAltMain: (name: string) => `${name} en su cultivo`,
			photoAltTop: (name: string) => `${name} cortada`,
			photoAltBottom: (name: string) => `Planta de ${name}`,
			trustStats: [
				{ title: ["Calidad", "excepcional"], desc: ["Seleccionamos frutas exóticas con los más", "altos estándares"] },
				{ title: ["Trazabilidad", "completa"], desc: ["Controlamos cada etapa para garantizar", "transparencia y origen confiable."] },
				{ title: ["Logística", "confiable"], desc: ["Coordinamos envíos internacionales", "seguros y eficientes."] },
				{ title: ["Relaciones", "duraderas"], desc: ["Construimos alianzas basadas en", "confianza y compromiso."] },
				{ title: ["Disponibilidad", "todo el año"], desc: ["Suministro constante para acompañar", "tu demanda."] },
			],
		},
		footer: {
			desc: "Exportadora de frutas exóticas de Ecuador. Seleccionamos fruta premium y trabajamos directamente con productores de confianza.",
			followUs: "Síguenos en:",
			socialLabels: { instagram: "Instagram", linkedin: "LinkedIn", email: "Correo", whatsapp: "WhatsApp" },
			contactHeading: "Contacto",
			location: "Guayaquil, Ecuador",
		},
		contacto: {
			pageTitle: "Contacto | Quintana Früts",
			pageDescription:
				"Ponte en contacto con Quintana Früts. Escríbenos o completa el formulario para más información sobre nuestras frutas exóticas premium de Ecuador.",
			headingPrefix: "Ponte en ",
			headingAccent: "contacto",
			headingSuffix: " con nosotros.",
			subtextPrefix: "Estamos cerca de ti, escríbenos a ",
			cardHeading: "Para más información, completa el formulario",
			form: {
				empresaLabel: "Empresa",
				empresaPlaceholder: "Empresa",
				nombreLabel: "Nombre",
				nombrePlaceholder: "Nombre*",
				apellidosLabel: "Apellidos",
				apellidosPlaceholder: "Apellidos*",
				emailLabel: "Correo electrónico",
				emailPlaceholder: "Correo electrónico*",
				asuntoLabel: "Asunto",
				asuntoPlaceholder: "Asunto*",
				reasons: ["Cotización de productos", "Información general"],
				comentarioLabel: "Comentario",
				comentarioPlaceholder: "Comentario*",
				privacyPrefix: "He leído y acepto las condiciones de la ",
				privacyLink: "Política de Privacidad",
				submit: "Enviar",
				sending: "Enviando...",
				success: "¡Gracias! Recibimos tu mensaje y te contactaremos pronto.",
				error: "No pudimos enviar tu mensaje. Intenta de nuevo o escríbenos directo a sales@quintanafruts.com.",
			},
		},
		layout: {
			defaultDescription:
				"Exportadora de frutas exóticas premium de Ecuador. Cultivo responsable, trazabilidad total y calidad que cruza fronteras.",
		},
		indexPage: {
			title: "Quintana Früts | Frutas exóticas premium de Ecuador",
		},
	},
	en: {
		header: {
			nav: {
				nosotros: "About Us",
				porQueElegirnos: "Why Choose Us?",
				productos: "Products",
				contacto: "Contact Us",
			},
			logoAlt: "Quintana Früts - home",
			openMenu: "Open menu",
			closeMenu: "Close menu",
			mainNav: "Main navigation",
			switchTo: "ES",
		},
		hero: {
			titleLine1: "Where quality",
			titleLine2Prefix: "begins ",
			titleAccent: "from the source",
			subtitleLine1: "Premium exotic fruits",
			subtitleLine2: "from Ecuador.",
			cta: "Request information",
			ctaAsunto: "General information",
		},
		nosotros: {
			headingLine1: "From Ecuador",
			headingLine2: "to the world,",
			headingAccent: "with transparency.",
			body: [
				{ text: "At Quintana Früts we specialize in exporting Ecuador's premium exotic fruit, making " },
				{ text: "supply chain transparency", highlight: true },
				{ text: " and " },
				{ text: "clean farming", highlight: true },
				{ text: " the pillars of our operation." },
			],
			features: [
				{ label: ["Responsible", "farming"] },
				{ label: ["Full", "traceability"] },
				{ label: ["Quality that crosses borders"] },
			],
			compromisoPrefix: "Exceptional fruit, relationships ",
			compromisoAccent: "built to last",
			compromisoBody:
				"We work with trusted local growers to deliver exotic fruit that meets the highest standards of quality, food safety, and social responsibility.",
			mainImageAlt: "Quintana Früts passion fruit crop in Ecuador",
			galleryAlt1: "Freshly cut passion fruit",
			galleryAlt2: "Quintana Früts crops in the mountains of Ecuador",
		},
		porQueElegirnos: {
			headingPrefix: "What makes us your ",
			headingAccent: "best ally.",
			body: "We work with trusted local growers to deliver exotic fruit that meets the highest standards of quality, food safety, and social responsibility.",
			cards: [
				{
					title: "Direct origin from Ecuador",
					description: "We cut out middlemen, connecting your business directly to the source.",
				},
				{
					title: "Premium exotic fruit",
					description: "We launch our global offering with a strategically curated, high-end selection.",
				},
				{
					title: "Reliable export logistics",
					description: "We design logistics solutions tailored to the most demanding markets.",
				},
				{
					title: "International quality standards",
					description: "We guarantee maximum product integrity through processes aligned with the most demanding markets.",
				},
				{
					title: "Lasting business relationships",
					description: "We align our goals with yours to become a true extension of your own value chain.",
				},
				{
					title: "Year-round availability",
					description:
						"We leverage Ecuador's privileged equatorial location and microclimates to break the seasonality of exotic fruit.",
				},
			],
			dotsAriaLabel: "Select card",
			dotAriaLabel: "View",
			captionText: "From Ecuador to the world, with quality you can feel and trust that lasts.",
		},
		productos: {
			heading: "Ecuador's fruit, selected for the world.",
			subheading: "Superior quality, full traceability, and relationships built to last.",
			products: [
				{
					name: "Gulupa",
					description:
						"A purple-skinned fruit with fragrant pulp and a perfectly balanced sweet-tart flavor. A natural source of antioxidants and vitamin C that supports everyday wellness.",
					statValues: { origen: "Ecuador", sabor: "Sweet-tart", temporada: "Year-round", transporte: "Air freight" },
				},
				{
					name: "Granadilla",
					description:
						"A golden-shelled fruit with translucent, exceptionally sweet pulp. Notable for its high fiber and water content, making it excellent for digestion and stomach health.",
					statValues: { origen: "Ecuador", sabor: "Sweet", temporada: "Year-round", transporte: "Air freight" },
				},
				{
					name: "Naranjilla",
					description:
						"A tropical fruit with orange skin and dense pulp, rich in vitamins A and C. Ideal for strengthening the immune system.",
					statValues: { origen: "Ecuador", sabor: "Tart-sweet", temporada: "Year-round", transporte: "Air freight" },
				},
			],
			statLabels: { origen: "Origin", sabor: "Flavor", temporada: "Season", transporte: "Shipping" },
			ctaFicha: "Technical sheet",
			ctaCotizar: "Request a quote",
			ctaAsunto: "Product quote",
			photoAltMain: (name: string) => `${name} in its crop`,
			photoAltTop: (name: string) => `Cut ${name}`,
			photoAltBottom: (name: string) => `${name} plant`,
			trustStats: [
				{ title: ["Exceptional", "quality"], desc: ["We select exotic fruit that meets the", "highest standards"] },
				{ title: ["Full", "traceability"], desc: ["We monitor every stage to ensure", "transparency and a trusted origin."] },
				{ title: ["Reliable", "logistics"], desc: ["We coordinate international shipments", "that are safe and efficient."] },
				{ title: ["Lasting", "relationships"], desc: ["We build partnerships based on", "trust and commitment."] },
				{ title: ["Year-round", "availability"], desc: ["Consistent supply to keep up", "with your demand."] },
			],
		},
		footer: {
			desc: "An exotic fruit exporter from Ecuador. We select premium fruit and work directly with trusted growers.",
			followUs: "Follow us:",
			socialLabels: { instagram: "Instagram", linkedin: "LinkedIn", email: "Email", whatsapp: "WhatsApp" },
			contactHeading: "Contact",
			location: "Guayaquil, Ecuador",
		},
		contacto: {
			pageTitle: "Contact | Quintana Früts",
			pageDescription:
				"Get in touch with Quintana Früts. Write to us or fill out the form for more information about our premium exotic fruit from Ecuador.",
			headingPrefix: "Get in ",
			headingAccent: "touch",
			headingSuffix: " with us.",
			subtextPrefix: "We're here for you, write to us at ",
			cardHeading: "For more information, fill out the form",
			form: {
				empresaLabel: "Company",
				empresaPlaceholder: "Company",
				nombreLabel: "First name",
				nombrePlaceholder: "First name*",
				apellidosLabel: "Last name",
				apellidosPlaceholder: "Last name*",
				emailLabel: "Email",
				emailPlaceholder: "Email*",
				asuntoLabel: "Subject",
				asuntoPlaceholder: "Subject*",
				reasons: ["Product quote", "General information"],
				comentarioLabel: "Message",
				comentarioPlaceholder: "Message*",
				privacyPrefix: "I have read and accept the ",
				privacyLink: "Privacy Policy",
				submit: "Send",
				sending: "Sending...",
				success: "Thank you! We've received your message and will contact you soon.",
				error: "We couldn't send your message. Please try again or email us directly at sales@quintanafruts.com.",
			},
		},
		layout: {
			defaultDescription:
				"Premium exotic fruit exporter from Ecuador. Responsible farming, full traceability, and quality that crosses borders.",
		},
		indexPage: {
			title: "Quintana Früts | Premium Exotic Fruit from Ecuador",
		},
	},
} as const;

export type Locale = keyof typeof translations;

export function getLocale(astroLocale: string | undefined): Locale {
	return astroLocale === "en" ? "en" : "es";
}
