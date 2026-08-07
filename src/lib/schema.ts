import { site, servicios, faq } from '../config/site';

/**
 * Constructores de datos estructurados (JSON-LD). Reutilizan exactamente los
 * mismos datos que se muestran en pantalla (site, servicios, faq) para que el
 * contenido visible y el que lee Google nunca se desincronicen.
 */

// Las claves de JSON-LD (@type, @context) no son identificadores TS válidos,
// así que se tipa como un registro abierto en vez de una interfaz estricta.
type JsonLd = Record<string, unknown>;

function buildAddress(): JsonLd | undefined {
  if (!site.direccionExacta) return undefined;
  return {
    '@type': 'PostalAddress',
    streetAddress: site.direccionExacta,
    addressLocality: site.ciudad,
    addressRegion: site.provincia,
    addressCountry: 'AR',
  };
}

function buildGeo(): JsonLd | undefined {
  if (!site.geo) return undefined;
  return {
    '@type': 'GeoCoordinates',
    latitude: site.geo.lat,
    longitude: site.geo.lng,
  };
}

/**
 * Perfil profesional + negocio local. Es el bloque que habilita el paquete de
 * resultados locales de Google ("psicóloga en <ciudad>").
 *
 * @param siteUrl Dominio del sitio (normalmente `Astro.site`). Se recibe como
 *   parámetro en vez de leerse de config/site.ts para que astro.config.mjs
 *   quede como única fuente de verdad del dominio: canonical, sitemap,
 *   robots.txt y este schema siempre citan el mismo valor.
 */
export function buildPsychologistSchema(siteUrl: URL | string): JsonLd {
  const base = typeof siteUrl === 'string' ? siteUrl : siteUrl.toString();
  const address = buildAddress();
  const geo = buildGeo();

  return {
    '@context': 'https://schema.org',
    '@type': ['Psychologist', 'Person'],
    name: site.nombreCompleto,
    url: base,
    telephone: `+${site.whatsapp}`,
    image: new URL('/og.jpg', base).toString(),
    jobTitle: site.profesion,
    honorificPrefix: site.tratamiento,
    hasCredential: site.matricula,
    knowsAbout: [
      'Psicoanálisis',
      'Psicoterapia focalizada',
      'Psicodiagnóstico',
      'Salud mental de adolescentes',
      'Salud mental de adultos',
    ],
    // Si no hay dirección exacta publicada, se declara la ciudad como área de
    // cobertura en vez de un domicilio puntual.
    ...(address ? { address } : { areaServed: { '@type': 'City', name: site.ciudad } }),
    ...(geo ? { geo } : {}),
    openingHoursSpecification: site.horarios.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.dias,
      opens: h.abre,
      closes: h.cierra,
    })),
    makesOffer: servicios.map((s) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: s.titulo,
        description: s.descripcion,
      },
    })),
    ...(site.redes.instagram ? { sameAs: [site.redes.instagram] } : {}),
  };
}

/** Preguntas frecuentes, generadas desde el mismo array que renderiza <Faq />. */
export function buildFaqSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.pregunta,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.respuesta,
      },
    })),
  };
}
