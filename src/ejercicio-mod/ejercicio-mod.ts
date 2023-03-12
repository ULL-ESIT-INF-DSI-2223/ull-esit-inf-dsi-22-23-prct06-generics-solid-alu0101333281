import { Collectable, Searchable } from "../ejercicio-mod/ejercicio-mod-interfaces";

/**
 * Abstract class that implements the Collectable and Searchable interfaces.
 * It contains an array of items of type T and implements the necessary methods
 * to add, get, remove and count items, as well as an abstract method for searching
 * items of type T.
 */
abstract class SearchableCollection<T> implements Collectable<T>, Searchable<T> {
  /**
   * Array of items of type T.
   */
  protected items: T[];

  /**
   * Creates an instance of SearchableCollection and initializes the items array.
   */
  constructor() {
    this.items = [];
  }

  /**
   * Adds an item of type T to the items array.
   * @param item The item of type T to add.
   */
  addItem(item: T): void {
    this.items.push(item);
  }

  /**
   * Gets the item of type T located at the specified index in the items array.
   * @param index The index of the item to get.
   * @returns The item of type T located at the specified index or undefined if the index is out of range.
   */
  getItem(index: number): T | undefined {
    if (index >= 0 && index < this.items.length) {
      return this.items[index];
    }
    return undefined;
  }

  /**
   * Removes the item of type T located at the specified index in the items array.
   * @param index The index of the item to remove.
   * @returns The item of type T that was removed from the array or undefined if the index is out of range.
   */
  removeItem(index: number): T {
    if (index >= 0 && index < this.items.length) {
      return this.items.splice(index, 1)[0];
    }
    return undefined;
  }

  /**
   * Gets the number of items of type T in the items array.
   * @returns The number of items of type T in the items array.
   */
  getNumberOfItems(): number {
    return this.items.length;
  }

  /**
   * Abstract method for searching items of type T in the items array.
   * @param term The search term of type T.
   * @returns An array of items of type T that match the search term or undefined if no matches were found.
   */
  abstract search(term: T): T[] | undefined;
}

/**
 * Class that extends the SearchableCollection class and implements the search method for searching
 * for numbers in the items array.
 */
export class NumericSearchableCollection extends SearchableCollection<number> {
  /**
   * Searches for numbers in the items array that match the specified search term.
   * @param term The search term of type number.
   * @returns An array of numbers that match the search term or undefined if no matches were found.
   */
  search(term: number): number[] | undefined {
    return this.items.filter((item) => item === term);
  }
}

/**
 * Class that extends the SearchableCollection class and implements the search method for searching
 * for strings in the items array.
 */
export class StringSearchableCollection extends SearchableCollection<string> {
  /**
   * Searches for strings in the items array that contain the specified search term.
   * @param term The search term of type string.
   * @returns An array of strings that contain the search term or undefined if no matches were found.
   */
  search(term: string): string[] | undefined {
    return this.items.filter((item) => item.includes(term));
  }
}
