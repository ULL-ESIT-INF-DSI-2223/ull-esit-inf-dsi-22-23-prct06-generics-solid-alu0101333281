/**
 * Representa una canción.
 * @interface
 */
export interface ICancion {
  /** Nombre de la canción. */
  nombre: string;
  /** Duración de la canción en segundos. */
  duracion: number;
  /** Géneros asociados a la canción. */
  generos: string[];
  /** Indica si la canción es un single. */
  single: boolean;
  /** Número de reproducciones de la canción. */
  reproducciones: number;
}

/**
 * Representa un single, que es una canción con la posibilidad de tener varias versiones.
 * @interface
 */
export interface ISingle extends ICancion {
  /** Lista de versiones del single. */
  versiones?: ICancion[];
}

/**
 * Representa un disco, que es un conjunto de canciones y/o singles.
 * @interface
 * @template T - Tipo de elementos del disco, que pueden ser canciones o singles.
 */
export interface IDisco<T extends ICancion | ISingle> {
  /** Nombre del disco. */
  nombre: string;
  /** Año de publicación del disco. */
  añoPublicacion: number;
  /** Lista de canciones y/o singles en el disco. */
  canciones: T[];
  /** Lista de singles en el disco. */
  singles?: ISingle[];
}

/**
 * Representa un artista, que es una persona que crea canciones y/o singles.
 * @interface
 * @template T - Tipo de elementos de la discografía del artista, que pueden ser canciones o singles.
 */
export interface IArtista<T extends ICancion | ISingle> {
  /** Nombre del artista. */
  nombre: string;
  /** Número de oyentes mensuales del artista. */
  oyentesMensuales: number;
  /** Discografía del artista, que es una lista de discos que contienen canciones y/o singles. */
  discografia: IDisco<T>[];
}
