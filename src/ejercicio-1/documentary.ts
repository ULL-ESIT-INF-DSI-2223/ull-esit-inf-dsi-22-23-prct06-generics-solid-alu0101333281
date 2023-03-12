import { Searchable, Streamable } from "../ejercicio-1/interfaces";
import { BasicStreamableCollection } from "../ejercicio-1/BasicStreamableCollection";

/**
 * Una clase que representa un documental con un título, un año de lanzamiento,
 * un género y un narrador.
 */
export class Documentary {
  constructor(
    public title: string,
    public year: number,
    public genre: string,
    public narrator: string
  ) {}
}

/**
 * Una colección de documentales que extiende la clase `BasicStreamableCollection`
 * y también implementa la interfaz `Searchable` para buscar documentales en la colección.
 */
export class DocumentaryCollection
  extends BasicStreamableCollection<Documentary>
  implements Searchable<Documentary>
{
  /**
   * Crea una nueva instancia de `DocumentaryCollection`.
   *
   * @param documentaries Un arreglo de objetos `Documentary` para agregar a la colección.
   */
  constructor(documentaries: Documentary[]) {
    super(documentaries);
  }

  /**
   * Busca los documentales en la colección que tengan un año de lanzamiento
   * coincidente con el valor proporcionado.
   *
   * @param year El año de lanzamiento a buscar en los documentales.
   * @returns Un arreglo de objetos `Documentary` que coinciden con el año proporcionado.
   */
  searchByYear(year: number): Documentary[] {
    return this.items.filter((documentary) => documentary.year === year);
  }

  /**
   * Busca los documentales en la colección que contengan el valor proporcionado
   * en el título del documental (la búsqueda no distingue entre mayúsculas y minúsculas).
   *
   * @param name El texto a buscar en los títulos de los documentales.
   * @returns Un arreglo de objetos `Documentary` que contienen el texto proporcionado en el título.
   */
  searchByName(name: string): Documentary[] {
    return this.items.filter((documentary) =>
      documentary.title.toLowerCase().includes(name.toLowerCase())
    );
  }

  /**
   * Busca los documentales en la colección que pertenezcan al género proporcionado.
   *
   * @param genre El género a buscar en los documentales.
   * @returns Un arreglo de objetos `Documentary` que pertenecen al género proporcionado.
   */
  searchByGenre(genre: string): Documentary[] {
    return this.items.filter((doc) => doc.genre.includes(genre));
  }
}
