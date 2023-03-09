import { Collectable, Searchable } from "../src/ejercicio-mod-interfaces";
  
  abstract class SearchableCollection<T> implements Collectable<T>, Searchable<T> {
    protected items: T[];
  
    constructor() {
      this.items = [];
    }
  
    addItem(item: T): void {
      this.items.push(item);
    }
  
    getItem(index: number): T | undefined {
        if (index >= 0 && index < this.items.length) {
          return this.items[index];
        }
        return undefined;
      }
    
  
    removeItem(index: number): T {
      if (index >= 0 && index < this.items.length) {
        this.items.splice(index, 1);
      }
      return this.items[index];
    }
  
    getNumberOfItems(): number {
      return this.items.length;
    }
  
    abstract search(term: T): T[] | undefined;
  }
  
  export class NumericSearchableCollection extends SearchableCollection<number> {
    search(term: number): number[] | undefined {
      return this.items.filter((item) => item === term);
    }
  }
  
  export class StringSearchableCollection extends SearchableCollection<string> {
    search(term: string): string[] | undefined {
      return this.items.filter((item) => item.includes(term));
    }
  }
  