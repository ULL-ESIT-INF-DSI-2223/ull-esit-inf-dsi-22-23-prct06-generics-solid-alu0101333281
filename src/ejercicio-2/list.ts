/**
 * List is a generic class that represents a collection of elements of type T.
 */
export class List<T> {
  private elements: T[];
  /**
   * Creates a new List object.
   *
   * @param elements An array of elements to initialize the list. If not provided, the list will be empty.
   */
  constructor(elements?: T[]) {
    this.elements = elements ? elements : [];
  }
  /**
   * Appends the elements of the given list to the end of this list.
   *
   * @param list The list whose elements should be appended to this list.
   */
  public append(list: List<T>): void {
    this.elements.push(...list.toArray());
  }
  /**
   * Concatenates the elements of this list with the elements of the given lists, returning a new list containing all the elements.
   *
   * @param lists The lists to concatenate with this list.
   * @returns A new List object containing all the elements of this list and the given lists.
   */
  public concatenate(...lists: List<T>[]): List<T> {
    const concatenated = new List(this.toArray());
    for (const list of lists) {
      concatenated.append(list);
    }
    return concatenated;
  }
  /**
   * Returns a new list containing the elements of this list that satisfy the given predicate.
   *
   * @param predicate A function that returns true for elements that should be included in the filtered list.
   * @returns A new List object containing the elements that satisfy the predicate.
   */
  public filter(predicate: (element: T) => boolean): List<T> {
    const filtered = new List<T>();
    for (const element of this.elements) {
      if (predicate(element)) {
        filtered.add(element);
      }
    }
    return filtered;
  }

  /**
   * Returns the number of elements in the list.
   *
   * @returns The number of elements in the list.
   */
  public length(): number {
    return this.elements.length;
  }
  /**
   * Returns a new list containing the result of applying the given transform function to each element in this list.
   *
   * @param transform A function that maps elements of type T to elements of type U.
   * @returns A new List object containing the transformed elements.
   */
  public map<U>(transform: (element: T) => U): List<U> {
    const mapped = new List<U>();
    for (const element of this.elements) {
      mapped.add(transform(element));
    }
    return mapped;
  }
  /**
   * Applies the given reducer function to each element in the list to reduce the list to a single value.
   *
   * @param reducer A function that takes an accumulator of type U and an element of type T and returns a new accumulator.
   * @param initialAccumulator The initial value of the accumulator.
   * @returns The final value of the accumulator after applying the reducer to all elements of the list.
   */
  public reduce<U>(
    reducer: (accumulator: U, current: T) => U,
    initialAccumulator: U
  ): U {
    let accumulator = initialAccumulator;
    for (const element of this.elements) {
      accumulator = reducer(accumulator, element);
    }
    return accumulator;
  }

  /**
   * Returns a new list containing the elements of this list in reverse order.
   *
   * @returns A new List object containing the reversed elements.
   */
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
