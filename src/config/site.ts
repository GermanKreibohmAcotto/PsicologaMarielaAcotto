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
  matricula: 'M.P. 950',

  // TODO: número de WhatsApp real, en formato internacional, solo dígitos (sin +, espacios ni guiones).
  whatsapp: '5493816281553',
  // Cómo se muestra ese mismo número en pantalla.
  whatsappDisplay: '+54 9 381 6281553',

  // TODO: ciudad y provincia reales (se usan en textos y en el JSON-LD para SEO local).
  ciudad: 'Yerba Buena',
  provincia: 'Tucumán',

  // TODO: dirección completa. Se usa SOLO en el JSON-LD (no se muestra en el
  // texto visible de la página) porque es lo que Google utiliza para el
  // paquete de resultados locales ("Maps"). Si preferís no publicarla en
  // ningún formato, dejá este campo en null: src/lib/schema.ts usa
  // "areaServed" en vez de "address" cuando es null.
  direccionExacta: null as string | null,

  // TODO: coordenadas reales del consultorio (mejoran el posicionamiento en
  // Google Maps). Dejar en null si todavía no se cargó la dirección exacta.
  geo: { lat: -26.8102154, lng: -65.2977502 } as { lat: number; lng: number } | null,

  horarios: [
    {
      etiqueta: 'Lunes a viernes',
      horario: '11:00 a 20:00',
      dias: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      abre: '11:00',
      cierra: '20:00',
    },
  ] satisfies Horario[],

  // Valor de reserva por si algo consulta "site.dominio" antes de que
  // Astro.site esté disponible. La fuente de verdad real es "site" en
  // astro.config.mjs — actualizá ese valor primero, y este para que coincida.
  dominio: 'https://psicologa-mariela-acotto.vercel.app',

  redes: {
    // TODO: usuario real de Instagram, o dejar en null para ocultar el enlace.
    instagram: null as string | null,
    linkedin: 'https://www.linkedin.com/in/mariela-acotto-30b109345/' as string | null,
    /**
     * Google Business Profile canónico. Es la URL que aparece al compartir
     * el perfil desde Google Maps. Es distinto de los directorios de
     * terceros (Buscopsi, Doctoralia) porque es EL perfil oficial de
     * Google — pero a nivel schema `sameAs` se concatenan igual.
     */
    googleBusiness:
      'https://www.google.com/maps/place/Psic%C3%B3loga+Lic.+Mariela+Acotto/@-26.8102106,-65.3003251,17z/data=!3m1!4b1!4m6!3m5!1s0x942243001df905f1:0x43fcb4c3cdfcc489!8m2!3d-26.8102154!4d-65.2977502!16s%2Fg%2F11zdg_yypl' as string | null,
    /**
     * Perfiles profesionales en directorios públicos. Cada URL alimenta:
     * - el JSON-LD `sameAs` del bloque Psychologist (señal de autoridad
     *   externa para Google — confirma que Mariela existe más allá de
     *   este sitio)
     * - los links visibles en el footer
     *
     * Mantener este array en null o vacío para ocultar todos los enlaces
     * a la vez. Agregar una URL acá propaga a schema + footer sin tocar
     * otro archivo.
     */
    directorios: [
      'https://buscopsi.com/psicologo/mariela-acotto/',
      'https://www.psicologos.com.ar/psicologa-lic-mariela-acotto-F1506C1041D',
      // TODO: agregar URL de Doctoralia cuando esté publicada.
    ] as string[] | null,
  },
} as const;

export interface Servicio {
  id: string;
  titulo: string;
  descripcion: string;
  /**
   * Descripción alternativa para la sección #instituciones. El componente
   * `Instituciones.astro` prefiere este campo cuando existe; si está ausente,
   * usa `descripcion`. Sirve para diferenciar copy de un mismo servicio
   * entre audiencia individual (pacientes) y B2B (escuelas), que tienen
   * información y decisiones diferentes.
   */
  descripcionInstitucional?: string;
  audiencia: 'personas' | 'instituciones';
  mensajeWhatsapp: string;
}

export const servicios: Servicio[] = [
  {
    id: 'terapia-individual',
    titulo: 'Psicoterapia individual',
    descripcion:
      'Espacio de escucha y trabajo personal para jóvenes, adultos y adultos mayores, desde el psicoanálisis y la psicoterapia focalizada.',
    audiencia: 'personas',
    mensajeWhatsapp: 'Hola Mariela, me gustaría consultar por una sesión.',
  },
  {
    id: 'terapia-pareja',
    titulo: 'Terapia de pareja',
    descripcion:
      'Espacio para pensar juntos lo que les pasa, desde la clínica psicoanalítica y la psicoterapia focalizada.',
    audiencia: 'personas',
    mensajeWhatsapp: 'Hola Mariela, quería consultar por terapia de pareja.',
  },
  {
    id: 'terapia-familiar',
    titulo: 'Terapia familiar',
    descripcion:
      'Acompañamiento profesional para abordar situaciones de la dinámica familiar, en un encuadre psicoanalítico.',
    audiencia: 'personas',
    mensajeWhatsapp: 'Hola Mariela, quería consultar por terapia familiar.',
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
    descripcionInstitucional:
      'Proceso de evaluación con entrevistas, observación y pruebas proyectivas, con informe escrito y devolución presencial a la familia y al equipo institucional. Habitualmente se coordina en dos o tres encuentros.',
    audiencia: 'instituciones',
    mensajeWhatsapp:
      'Hola, escribo desde una institución educativa por evaluaciones psicodiagnósticas.',
  },
  {
    id: 'capacitacion',
    titulo: 'Capacitación institucional',
    descripcion:
      'Espacios de formación para equipos docentes y directivos sobre temáticas de salud mental y desarrollo psicológico.',
    descripcionInstitucional:
      'Talleres y jornadas para equipos docentes y directivos, ajustados a la necesidad del establecimiento: duración, frecuencia y formato (charla, taller o serie) se acuerdan previamente.',
    audiencia: 'instituciones',
    mensajeWhatsapp: 'Hola, quería consultar por capacitaciones para nuestra institución.',
  },
  {
    id: 'asesoramiento',
    titulo: 'Asesoramiento institucional',
    descripcion:
      'Acompañamiento a instituciones escolares en el abordaje de situaciones y consultas de índole psicológica.',
    descripcionInstitucional:
      'Acompañamiento profesional para pensar situaciones puntuales de la dinámica institucional: cómo recibir una consulta, encuadrar una conversación con familias o derivar cuando hace falta.',
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
    pregunta: '¿Con qué enfoque trabaja?',
    respuesta:
      'El trabajo se apoya en el psicoanálisis y, según cada situación, en la psicoterapia focalizada: un abordaje breve y centrado en el motivo de consulta.',
  },
  {
    pregunta: '¿Atiende sesiones online?',
    respuesta:
      'Sí, además del consultorio presencial hay disponibilidad de sesiones online.',
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
    pregunta: '¿Realizan evaluaciones para instituciones escolares?',
    respuesta:
      'Sí, se realizan evaluaciones psicodiagnósticas para instituciones, además de espacios de capacitación y asesoramiento institucional.',
  },
  {
    pregunta: '¿Cuáles son los honorarios y las formas de pago?',
    respuesta:
      'Esa información se conversa por WhatsApp, ya que puede variar según el tipo de consulta.',
  },
  {
    pregunta: '¿Cuánto dura cada sesión y con qué frecuencia se asiste?',
    respuesta:
      'Las sesiones individuales tienen una duración aproximada de 50 minutos. La frecuencia habitual es una vez por semana, aunque puede ajustarse según el caso.',
  },
  {
    pregunta: '¿Desde qué edad atendés?',
    respuesta:
      'Atiendo jóvenes, adultos y adultos mayores. La edad mínima concreta se conversa al inicio según la situación, ya que depende del motivo de consulta y del grado de autonomía de quien consulta.',
  },
  {
    pregunta: '¿Aceptás obra social o prepaga?',
    respuesta:
      'La atención es de modalidad particular. Si tenés cobertura por obra social o prepaga, puedo orientarte sobre cómo pedir reintegro según tu plan, o derivarte a un colega que sí trabaje con tu cobertura.',
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
