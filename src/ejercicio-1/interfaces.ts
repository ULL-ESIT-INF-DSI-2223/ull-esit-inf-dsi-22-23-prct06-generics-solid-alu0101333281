export interface Searchable<T> {
    searchByYear(year: number): T[];
    searchByName(name: string): T[];
    searchByGenre(genre: string): T[];
  }
  
export interface Streamable<T> extends Searchable<T> {
    getAll(): T[];
    add(item: T): void;
    remove(item: T): void;
  }