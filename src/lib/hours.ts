import { site } from '../config/site';

/**
 * Determina si en un instante dado Mariela está dentro de su horario de atención
 * publicado. Usa el array `site.horarios` como fuente única de verdad — si
 * algún día se cambia el horario en `site.ts`, esto se actualiza solo.
 *
 * La comparación de horas es naive (string comparison sobre "HH:MM"), lo que es
 * seguro porque los formatos están normalizados con zero-padding en site.ts.
 *
 * @param fecha Instante a evaluar. Si no se pasa, usa `new Date()`.
 *   Pasarlo explícitamente permite tests deterministas sin depender del
 *   reloj del sistema.
 * @returns `true` si la fecha cae dentro de un bloque de horario publicado.
 */
export function isWithinWorkingHours(fecha: Date = new Date()): boolean {
  // DayOfWeek en inglés que matchea los strings en `site.horarios[].dias`.
  const dayEnglish = ['Sunday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Monday'][fecha.getDay()];
  const timeString = `${String(fecha.getHours()).padStart(2, '0')}:${String(fecha.getMinutes()).padStart(2, '0')}`;

  return site.horarios.some((bloque) => {
    if (!bloque.dias.includes(dayEnglish as (typeof bloque.dias)[number])) return false;
    return timeString >= bloque.abre && timeString <= bloque.cierra;
  });
}

/**
 * Para el CTA del header: indica si la visita al sitio cae dentro del horario
 * publicado. Se evalúa al render del componente en server-side (Astro es
 * isomorfo), así que el resultado es exacto para el momento del request, no
 * para el cliente. En una sesión larga podría quedar desactualizado — es
 * aceptable: la etiqueta es informativa, no funcional.
 */
export const isOpenNow = isWithinWorkingHours();