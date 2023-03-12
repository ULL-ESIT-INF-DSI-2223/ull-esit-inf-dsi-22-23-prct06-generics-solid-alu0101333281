import {
  Streamable
} from "../ejercicio-1/interfaces";

/**
 * Represents a basic implementation of a streamable collection of items.
 * @typeparam T The type of items contained in the collection.
 */
export abstract class BasicStreamableCollection<T> implements Streamable<T> {
    /**
     * The list of items contained in the collection.
     */
    protected items: T[];
  
    /**
     * Creates a new instance of the `BasicStreamableCollection` class.
     * @param items An array of items to initialize the collection with. Defaults to an empty array.
     */
    constructor(items: T[] = []) {
      this.items = items;
    }
  
    /**
     * Gets all the items in the collection.
     * @returns An array containing all the items in the collection.
     */
    getAll(): T[] {
      return this.items;
    }
  
    /**
     * Adds an item to the collection.
     * @param item The item to add to the collection.
     */
    add(item: T): void {
      this.items.push(item);
    }
  
    /**
     * Removes an item from the collection.
     * @param item The item to remove from the collection.
     */
    remove(item: T): void {
      const index = this.items.indexOf(item);
      if (index !== -1) {
        this.items.splice(index, 1);
      }
    }
  
    /**
     * Searches the collection for items published in a given year.
     * @param year The year to search for.
     * @returns An array containing all the items published in the given year.
     */
    abstract searchByYear(year: number): T[];
  
    /**
     * Searches the collection for items with a given name.
     * @param name The name to search for.
     * @returns An array containing all the items with the given name.
     */
    abstract searchByName(name: string): T[];
  
    /**
     * Searches the collection for items with a given genre.
     * @param genre The genre to search for.
     * @returns An array containing all the items with the given genre.
     */
    abstract searchByGenre(genre: string): T[];
}
