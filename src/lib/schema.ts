import { site, servicios, faq } from '../config/site';

/**
 * Constructores de datos estructurados (JSON-LD). Reutilizan exactamente los
 * mismos datos que se muestran en pantalla (site, servicios, faq) para que el
 * contenido visible y el que lee Google nunca se desincronicen.
 */

// Las claves de JSON-LD (@type, @context) no son identificadores TS válidos,
// así que se tipa como un registro abierto en vez de una interfaz estricta.
type JsonLd = Record<string, unknown>;

/**
 * PostalAddress mínima cuando NO se publica la calle: locality/region/country
 * son datos públicos y no inventados. Si se conoce la dirección exacta,
 * se agrega `streetAddress`. Fabricar una calle viola la política de Google
 * (los datos estructurados deben ser verificables) y este sitio publica
 * deliberadamente la dirección solo por WhatsApp, así que la versión locality-
 * only es la correcta por defecto.
 */
function buildAddress(): JsonLd {
  const address: JsonLd = {
    '@type': 'PostalAddress',
    addressLocality: site.ciudad,
    addressRegion: site.provincia,
    addressCountry: 'AR',
  };
  if (site.direccionExacta) {
    address.streetAddress = site.direccionExacta;
  }
  return address;
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
    // Estructurado como EducationalOccupationalCredential (en vez de string
    // suelto) para alinearse con el rango esperado por schema.org. Puro: en
    // cuanto se carguen universidad y año, se pueden agregar más nodos.
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'license',
      name: site.matricula,
    },
    knowsAbout: [
      'Psicoanálisis',
      'Psicoterapia focalizada',
      'Psicología educacional',
      'Terapia de pareja',
      'Terapia familiar',
      'Salud mental de adolescentes',
      'Salud mental de adultos',
      'Salud mental de adultos mayores',
    ],
    // PostalAddress con locality-only es el "address" que Google acepta
    // como señal de Local sin que invente una calle. Ver buildAddress() arriba.
    address,
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
    // sameAs: cada URL (perfiles sociales + GBP + directorios profesionales)
    // confirma que la persona detrás del sitio también existe en esos
    // sitios. Google lo usa como señal de verificación externa. Si no
    // hay nada cargado todavía, omitir la propiedad entera (no
    // devolver array vacío).
    ...(() => {
      const urls: string[] = [];
      if (site.redes.instagram) urls.push(site.redes.instagram);
      if (site.redes.linkedin) urls.push(site.redes.linkedin);
      if (site.redes.googleBusiness) urls.push(site.redes.googleBusiness);
      if (site.redes.directorios) urls.push(...site.redes.directorios);
      return urls.length ? { sameAs: urls } : {};
    })(),
  };
}

/**
 * Identidad del sitio. Es la señal más fuerte que usa Google para decidir qué
 * "nombre de sitio" mostrar en los resultados de búsqueda (más que
 * og:site_name) — sin esto, Google puede llegar a mostrar el nombre del
 * hosting (ej. "Vercel") en vez del nombre real del sitio.
 */
export function buildWebsiteSchema(siteUrl: URL | string): JsonLd {
  const base = typeof siteUrl === 'string' ? siteUrl : siteUrl.toString();
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.nombreCompleto,
    alternateName: `${site.nombre} · ${site.profesion}`,
    url: base,
    // Coincide con <html lang="es-AR">. Señal menor pero barata para
    // motores multi-idioma.
    inLanguage: 'es-AR',
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
