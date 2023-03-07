/**
 * Verifica si un paseo generado por la aplicación se puede realizar en exactamente 10 minutos.
 *
 * @param paseo - Array de cadenas de una única letra que representan las direcciones en las que debemos caminar.
 * @returns Devuelve verdadero o falso si el paseo se puede realizar en exactamente 10 minutos.
 *          Devuelve undefined si el paseo incluye alguna dirección no válida o un array vacío.
 */
export function isPaseoValido(paseo: string[]): boolean | undefined {
  if (paseo.length === 0) {
    return undefined;
  }

  let norte = 0;
  let sur = 0;
  let este = 0;
  let oeste = 0;

  for (let direccion of paseo) {
    if (direccion === "n") {
      norte++;
    } else if (direccion === "s") {
      sur++;
    } else if (direccion === "e") {
      este++;
    } else if (direccion === "o") {
      oeste++;
    } else {
      return undefined;
    }
  }

  if (norte !== sur || este !== oeste) {
    return false;
  }

  if (norte + sur + este + oeste !== 10) {
    return false;
  }

  return true;
}
