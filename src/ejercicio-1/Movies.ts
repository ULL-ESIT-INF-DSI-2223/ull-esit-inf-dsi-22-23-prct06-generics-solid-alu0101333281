import { Searchable, Streamable } from "../ejercicio-1/interfaces";
import { BasicStreamableCollection } from "../ejercicio-1/BasicStreamableCollection";

/**
 * Clase que representa una película.
 */
export class Movie {
  constructor(
    /**
     * Título de la película.
     */
    public title: string,
    /**
     * Año de lanzamiento de la película.
     */
    public year: number,
    /**
     * Género de la película.
     */
    public genre: string,
    /**
     * Director de la película.
     */
    public director: string
  ) {}
}

/**
 * Clase que representa una colección de películas.
 */
export class MovieCollection
  extends BasicStreamableCollection<Movie>
  implements Searchable<Movie>
{
  constructor(movies: Movie[]) {
    super(movies);
  }

  /**
   * Busca todas las películas que se lanzaron en un año determinado.
   * @param year Año de lanzamiento de las películas a buscar.
   * @returns Un array de películas que se lanzaron en el año especificado.
   */
  searchByYear(year: number): Movie[] {
    return this.items.filter((movie) => movie.year === year);
  }

  /**
   * Busca todas las películas que contienen una cadena de caracteres en su título.
   * @param name Cadena de caracteres a buscar en los títulos de las películas.
   * @returns Un array de películas que contienen la cadena de caracteres especificada en su título.
   */
  searchByName(name: string): Movie[] {
    return this.items.filter((movie) =>
      movie.title.toLowerCase().includes(name.toLowerCase())
    );
  }

  /**
   * Busca todas las películas que pertenecen a un género determinado.
   * @param genre Género de las películas a buscar.
   * @returns Un array de películas que pertenecen al género especificado.
   */
  searchByGenre(genre: string): Movie[] {
    return this.items.filter((movie) => movie.genre === genre);
  }
}
