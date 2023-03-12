/**
 * Interface representing an object that can be searched by year, name or genre.
 * @typeparam T the type of the object to be searched.
 */
export interface Searchable<T> {
  /**
   * Searches objects by year.
   * @param year the year to search for.
   * @returns an array of objects that match the specified year.
   */
  searchByYear(year: number): T[];

  /**
   * Searches objects by name.
   * @param name the name to search for.
   * @returns an array of objects that match the specified name.
   */
  searchByName(name: string): T[];

  /**
   * Searches objects by genre.
   * @param genre the genre to search for.
   * @returns an array of objects that match the specified genre.
   */
  searchByGenre(genre: string): T[];
}

/**
 * Interface representing an object that can be streamed, searched and modified.
 * @typeparam T the type of the object to be streamed.
 */
export interface Streamable<T> extends Searchable<T> {
  /**
   * Returns all the objects.
   * @returns an array of all the objects.
   */
  getAll(): T[];

  /**
   * Adds an object to the stream.
   * @param item the object to add to the stream.
   */
  add(item: T): void;

  /**
   * Removes an object from the stream.
   * @param item the object to remove from the stream.
   */
  remove(item: T): void;
}
