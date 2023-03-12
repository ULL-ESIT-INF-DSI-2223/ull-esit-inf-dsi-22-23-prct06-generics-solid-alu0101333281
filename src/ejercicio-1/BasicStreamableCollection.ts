import {
    Streamable
  } from "../ejercicio-1/interfaces";

export abstract class BasicStreamableCollection<T> implements Streamable<T> {
    protected items: T[];
  
    constructor(items: T[] = []) {
      this.items = items;
    }
  
    getAll(): T[] {
      return this.items;
    }
  
    add(item: T): void {
      this.items.push(item);
    }
  
    remove(item: T): void {
      const index = this.items.indexOf(item);
      if (index !== -1) {
        this.items.splice(index, 1);
      }
    }
  
    abstract searchByYear(year: number): T[];
    abstract searchByName(name: string): T[];
    abstract searchByGenre(genre: string): T[];
  }