/**

Represents a Collectable of an item
*/
export interface Collectable<T> {
  addItem(item: T): void;
  getItem(index: number): T | undefined;
  removeItem(index: number): T;
  getNumberOfItems(): number;
}
/**

Represents a Searchable of an item
*/
export interface Searchable<T> {
  search(term: T): T[] | undefined;
}
