/**
 * Datos reales del sitio, centralizados en un único archivo.
 *
 * Todo lo marcado con "TODO:" es un valor de ejemplo — reemplazalo por el dato
 * real antes de publicar. Este archivo alimenta a la vez: el contenido visible,
 * los enlaces de WhatsApp, las metaetiquetas SEO/Open Graph y el JSON-LD.
 */

/** Nombres de día en inglés que exige la especificación de schema.org. */
export type DiaSemana =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

export interface Horario {
  /** Texto visible, ej: "Lunes a viernes". */
  etiqueta: string;
  /** Texto visible, ej: "9:00 a 19:00". */
  horario: string;
  /** Mismos días que "etiqueta", para el JSON-LD. */
  dias: DiaSemana[];
  /** Hora de apertura en formato 24h "HH:MM", para el JSON-LD. */
  abre: string;
  /** Hora de cierre en formato 24h "HH:MM", para el JSON-LD. */
  cierra: string;
}

export const site = {
  nombre: 'Mariela Acotto',
  tratamiento: 'Lic.',
  nombreCompleto: 'Lic. Mariela Acotto',
  profesion: 'Psicóloga',
  // TODO: número de matrícula profesional real.
  matricula: 'M.P. 00.000',

  // TODO: número de WhatsApp real, en formato internacional, solo dígitos (sin +, espacios ni guiones).
  whatsapp: '5493816281553',
  // Cómo se muestra ese mismo número en pantalla.
  whatsappDisplay: '+54 9 381 6281553',

  // TODO: ciudad y provincia reales (se usan en textos y en el JSON-LD para SEO local).
  ciudad: 'Yerba buena',
  provincia: 'Tucumán',

  // TODO: dirección completa. Se usa SOLO en el JSON-LD (no se muestra en el
  // texto visible de la página) porque es lo que Google utiliza para el
  // paquete de resultados locales ("Maps"). Si preferís no publicarla en
  // ningún formato, dejá este campo en null: src/lib/schema.ts usa
  // "areaServed" en vez de "address" cuando es null.
  direccionExacta: null as string | null,

  // TODO: coordenadas reales del consultorio (mejoran el posicionamiento en
  // Google Maps). Dejar en null si todavía no se cargó la dirección exacta.
  geo: null as { lat: number; lng: number } | null,

  horarios: [
    {
      etiqueta: 'Lunes a viernes',
      horario: '9:00 a 19:00',
      dias: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      abre: '09:00',
      cierra: '19:00',
    },
  ] satisfies Horario[],

  // Valor de reserva por si algo consulta "site.dominio" antes de que
  // Astro.site esté disponible. La fuente de verdad real es "site" en
  // astro.config.mjs — actualizá ese valor primero, y este para que coincida.
  dominio: 'https://psicologamarielaacotto.vercel.app',

  redes: {
    // TODO: usuario real de Instagram, o dejar en null para ocultar el enlace.
    instagram: null as string | null,
  },
} as const;

export interface Servicio {
  id: string;
  titulo: string;
  descripcion: string;
  audiencia: 'personas' | 'instituciones';
  mensajeWhatsapp: string;
}

export const servicios: Servicio[] = [
  {
    id: 'terapia-individual',
    titulo: 'Psicoterapia individual',
    descripcion:
      'Espacio de escucha y trabajo personal para jóvenes y adultos, desde el psicoanálisis y la psicoterapia focalizada.',
    audiencia: 'personas',
    mensajeWhatsapp: 'Hola Mariela, me gustaría consultar por una sesión.',
  },
  {
    id: 'sesiones-online',
    titulo: 'Sesiones online',
    descripcion:
      'La misma escucha profesional por videollamada, para quienes prefieren o necesitan un encuentro a distancia.',
    audiencia: 'personas',
    mensajeWhatsapp: 'Hola Mariela, quería consultar por sesiones online.',
  },
  {
    id: 'psicodiagnostico',
    titulo: 'Evaluaciones psicodiagnósticas',
    descripcion:
      'Evaluaciones psicodiagnósticas para instituciones escolares, como parte de procesos de admisión, seguimiento u orientación.',
    audiencia: 'instituciones',
    mensajeWhatsapp:
      'Hola, escribo desde una institución educativa por evaluaciones psicodiagnósticas.',
  },
  {
    id: 'capacitacion',
    titulo: 'Capacitación institucional',
    descripcion:
      'Espacios de formación para equipos docentes y directivos sobre temáticas de salud mental y desarrollo psicológico.',
    audiencia: 'instituciones',
    mensajeWhatsapp: 'Hola, quería consultar por capacitaciones para nuestra institución.',
  },
  {
    id: 'asesoramiento',
    titulo: 'Asesoramiento institucional',
    descripcion:
      'Acompañamiento a instituciones escolares en el abordaje de situaciones y consultas de índole psicológica.',
    audiencia: 'instituciones',
    mensajeWhatsapp: 'Hola, quería consultar por asesoramiento institucional.',
  },
];

export interface FaqItem {
  pregunta: string;
  respuesta: string;
}

export const faq: FaqItem[] = [
  {
    pregunta: '¿Cómo es la primera consulta?',
    respuesta:
      'Escribís por WhatsApp contando brevemente qué te trae a la consulta y coordinamos un primer encuentro. Ese espacio inicial sirve para conocernos y pensar juntas cómo seguir.',
  },
  {
    pregunta: '¿Con qué enfoque trabaja?',
    respuesta:
      'El trabajo se apoya en el psicoanálisis y, según cada situación, en la psicoterapia focalizada: un abordaje breve y centrado en el motivo de consulta.',
  },
  {
    pregunta: '¿Atiende sesiones online?',
    respuesta:
      'Sí, además del consultorio presencial hay disponibilidad de sesiones online por videollamada.',
  },
  {
    pregunta: '¿Atiende adolescentes?',
    respuesta: 'Sí, el trabajo incluye tanto a jóvenes como a adultos.',
  },
  {
    pregunta: '¿Dónde queda el consultorio?',
    respuesta: `El consultorio está en ${site.ciudad}, ${site.provincia}. La dirección exacta se comparte por WhatsApp al coordinar el turno.`,
  },
  {
    pregunta: '¿Cómo coordino un turno?',
    respuesta:
      'Por WhatsApp es la vía más rápida: contás brevemente tu situación y se coordina día y horario según disponibilidad.',
  },
  {
    pregunta: '¿Realizan evaluaciones para instituciones escolares?',
    respuesta:
      'Sí, se realizan evaluaciones psicodiagnósticas para instituciones, además de espacios de capacitación y asesoramiento institucional.',
  },
  {
    pregunta: '¿Cuáles son los honorarios y las formas de pago?',
    respuesta:
      'Esa información se conversa por WhatsApp, ya que puede variar según el tipo de consulta.',
  },
];

export interface VideoDestacado {
  /** ID de YouTube: los 11 caracteres después de "v=" o "youtu.be/". */
  id: string;
  titulo: string;
}

// Fragmentos del programa "Volver a Empezar".
export const videos: VideoDestacado[] = [
  { id: '6cxckXxHsHE', titulo: 'La separación' },
  { id: 'Fg68JMV7wPw', titulo: 'El amor de los hijos' },
  { id: 'EgkHcp5AIkQ', titulo: '¿Qué es la amistad?' },
  { id: '-b2pfr4quTA', titulo: 'Amistades tóxicas' },
  { id: 'IM-SudsGa04', titulo: 'Adicciones y consumos' },
  { id: 'w3WjJ49SBj0', titulo: 'El amor y la sexualidad' },
  { id: 'Fbx9q-Z86Nw', titulo: 'Orientación vocacional' },
  { id: '6DfhN_ahRSo', titulo: 'La importancia de hacer terapia' },
];
