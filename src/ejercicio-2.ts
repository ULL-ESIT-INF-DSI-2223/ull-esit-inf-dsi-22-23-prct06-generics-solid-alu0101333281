export class List<T> {
  private elements: T[];

  constructor(elements?: T[]) {
    this.elements = elements ? elements : [];
  }

  public append(list: List<T>): void {
    this.elements.push(...list.toArray());
  }

  public concatenate(...lists: List<T>[]): List<T> {
    const concatenated = new List(this.toArray());
    for (const list of lists) {
      concatenated.append(list);
    }
    return concatenated;
  }

  public filter(predicate: (element: T) => boolean): List<T> {
    const filtered = new List<T>();
    for (const element of this.elements) {
      if (predicate(element)) {
        filtered.add(element);
      }
    }
    return filtered;
  }

  public length(): number {
    return this.elements.length;
  }

  public map<U>(transform: (element: T) => U): List<U> {
    const mapped = new List<U>();
    for (const element of this.elements) {
      mapped.add(transform(element));
    }
    return mapped;
  }

  public reduce<U>(reducer: (accumulator: U, current: T) => U, initialAccumulator: U): U {
    let accumulator = initialAccumulator;
    for (const element of this.elements) {
      accumulator = reducer(accumulator, element);
    }
    return accumulator;
  }

  public reverse(): List<T> {
    const reversed = new List<T>();
    for (let i = this.length() - 1; i >= 0; i--) {
      reversed.add(this.elements[i]);
    }
    return reversed;
  }

  public forEach(operation: (element: T) => void): void {
    for (const element of this.elements) {
      operation(element);
    }
  }

  public add(element: T): void {
    this.elements.push(element);
  }

  public toArray(): T[] {
    return this.elements.slice();
  }
}
