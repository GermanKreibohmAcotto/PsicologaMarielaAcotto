import { site } from '../config/site';

/**
 * Construye una URL de wa.me con el número del consultorio y un mensaje
 * pre-cargado, para que quien haga clic solo tenga que apretar "enviar".
 * Reducir esa fricción es lo que más impacta en la tasa de contacto real.
 */
export function buildWhatsAppUrl(mensaje: string): string {
  const texto = encodeURIComponent(mensaje);
  return `https://wa.me/${site.whatsapp}?text=${texto}`;
}

export const whatsappGeneral = buildWhatsAppUrl(
  'Hola Mariela, me gustaría consultar por una sesión.'
);
