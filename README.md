# Practica 6 Clases e interfaces genéricas. Principios SOLID

## Introduccion
Se realizaran una serie de ejercicios los cuales estan relacionados con Clases e interfaces genéricas. Tambien una modificacion enviada en el laboratorio sobre el mismo tema.


### Ejercicio 1 

Ejercicio 1 - DSIflix
Imagine que tiene que diseñar el modelo de datos de una plataforma de vídeo en streaming. A través del catálogo de dicha plataforma se puede acceder a películas, series y documentales:

Defina una interfaz genérica Streamable que trate de especificar propiedades y métodos con los que debería contar una colección de emisiones concreta como, por ejemplo, una colección de series. Por ejemplo, deberían definirse métodos de búsqueda en dicha interfaz, que permitan obtener listados en función de diferentes términos de búsqueda: por año o por nombre, entre otros.
Defina una clase abstracta genérica BasicStreamableCollection que implemente dicha interfaz genérica. En este punto, podrá particularizar algunas de las propiedades y métodos de la interfaz Streamable, aunque otros tendrán que permanecer como abstractos para ser definidos más abajo en la jerarquía de clases. Todo dependerá del diseño que haya llevado a cabo.
Tendrá que extender la clase abstracta anterior para obtener subclases que modelen cada uno de los tres tipos de colecciones: series, películas y documentales.
Trate de aplicar los principios SOLID. Preste especial atención al diseño de la interfaz Streamable. Si cree que debe dividirla en interfaces genéricas más pequeñas porque su diseño inicial es muy complejo, hágalo, con el objetivo de cumplir con el cuarto principio SOLID Interface segregation.

El codigo realizado fue el siguiente:

```
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
/**
 * Clase que representa una película.
 */
export class Movie {
  constructor(
    /**
     * Título de la película.
     */
    public title: string,
    /**
     * Año de lanzamiento de la película.
     */
    public year: number,
    /**
     * Género de la película.
     */
    public genre: string,
    /**
     * Director de la película.
     */
    public director: string
  ) {}
}

/**
 * Clase que representa una colección de películas.
 */
export class MovieCollection
  extends BasicStreamableCollection<Movie>
  implements Searchable<Movie>
{
  constructor(movies: Movie[]) {
    super(movies);
  }

  /**
   * Busca todas las películas que se lanzaron en un año determinado.
   * @param year Año de lanzamiento de las películas a buscar.
   * @returns Un array de películas que se lanzaron en el año especificado.
   */
  searchByYear(year: number): Movie[] {
    return this.items.filter((movie) => movie.year === year);
  }

  /**
   * Busca todas las películas que contienen una cadena de caracteres en su título.
   * @param name Cadena de caracteres a buscar en los títulos de las películas.
   * @returns Un array de películas que contienen la cadena de caracteres especificada en su título.
   */
  searchByName(name: string): Movie[] {
    return this.items.filter((movie) =>
      movie.title.toLowerCase().includes(name.toLowerCase())
    );
  }

  /**
   * Busca todas las películas que pertenecen a un género determinado.
   * @param genre Género de las películas a buscar.
   * @returns Un array de películas que pertenecen al género especificado.
   */
  searchByGenre(genre: string): Movie[] {
    return this.items.filter((movie) => movie.genre === genre);
  }
}
/**
 * Represents a TV series.
 */
export class Series {
  constructor(
    /**
     * The name of the series.
     */
    public name: string,
    /**
     * The year the series was released.
     */
    public year: number,
    /**
     * The genre of the series.
     */
    public genre: string,
    /**
     * The number of seasons the series has.
     */
    public seasons: number
  ) {}
}

/**
 * Represents a single season of a TV series.
 */
export class SeriesSeason {
  constructor(
    /**
     * The number of the season.
     */
    public seasonNumber: number,
    /**
     * The number of episodes in the season.
     */
    public episodes: number
  ) {}
}

/**
 * Represents a collection of TV series.
 */
export class SeriesCollection extends BasicStreamableCollection<Series>
  implements Searchable<Series> {
  constructor(series: Series[]) {
    super(series);
  }

  /**
   * Returns an array of series that were released in the specified year.
   * @param year The year to search for.
   * @returns An array of series that were released in the specified year.
   */
  searchByYear(year: number): Series[] {
    return this.items.filter((series) => series.year === year);
  }

  /**
   * Returns an array of series whose name contains the specified string (case-insensitive).
   * @param name The string to search for.
   * @returns An array of series whose name contains the specified string.
   */
  searchByName(name: string): Series[] {
    return this.items.filter((series) =>
      series.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  /**
   * Returns an array of series that belong to the specified genre.
   * @param genre The genre to search for.
   * @returns An array of series that belong to the specified genre.
   */
  searchByGenre(genre: string): Series[] {
    return this.items.filter((series) => series.genre.includes(genre));
  }
}
/**
 * Una clase que representa un documental con un título, un año de lanzamiento,
 * un género y un narrador.
 */
export class Documentary {
  constructor(
    public title: string,
    public year: number,
    public genre: string,
    public narrator: string
  ) {}
}

/**
 * Una colección de documentales que extiende la clase `BasicStreamableCollection`
 * y también implementa la interfaz `Searchable` para buscar documentales en la colección.
 */
export class DocumentaryCollection extends BasicStreamableCollection<Documentary> implements Searchable<Documentary> {

  /**
   * Crea una nueva instancia de `DocumentaryCollection`.
   *
   * @param documentaries Un arreglo de objetos `Documentary` para agregar a la colección.
   */
  constructor(documentaries: Documentary[]) {
    super(documentaries);
  }

  /**
   * Busca los documentales en la colección que tengan un año de lanzamiento
   * coincidente con el valor proporcionado.
   *
   * @param year El año de lanzamiento a buscar en los documentales.
   * @returns Un arreglo de objetos `Documentary` que coinciden con el año proporcionado.
   */
  searchByYear(year: number): Documentary[] {
    return this.items.filter((documentary) => documentary.year === year);
  }

  /**
   * Busca los documentales en la colección que contengan el valor proporcionado
   * en el título del documental (la búsqueda no distingue entre mayúsculas y minúsculas).
   *
   * @param name El texto a buscar en los títulos de los documentales.
   * @returns Un arreglo de objetos `Documentary` que contienen el texto proporcionado en el título.
   */
  searchByName(name: string): Documentary[] {
    return this.items.filter((documentary) =>
      documentary.title.toLowerCase().includes(name.toLowerCase())
    );
  }

  /**
   * Busca los documentales en la colección que pertenezcan al género proporcionado.
   *
   * @param genre El género a buscar en los documentales.
   * @returns Un arreglo de objetos `Documentary` que pertenecen al género proporcionado.
   */
  searchByGenre(genre: string): Documentary[] {
    return this.items.filter((doc) => doc.genre.includes(genre));
  }
}

```
Este código define varias interfaces y clases relacionadas con la gestión de una colección de películas o series.

La interfaz Searchable<T> define métodos para buscar objetos por año, nombre o género. La interfaz Streamable<T> hereda de Searchable<T> y define métodos para obtener, agregar y eliminar elementos de una colección.

La clase abstracta BasicStreamableCollection<T> implementa la interfaz Streamable<T> y proporciona una implementación básica de los métodos definidos en ella. Además, define un constructor que acepta una matriz de elementos para inicializar la colección.

La clase Movie define una película con un título, un año de lanzamiento, un género y un director.

La clase MovieCollection extiende BasicStreamableCollection<Movie> e implementa la interfaz Searchable<Movie>. Define métodos para buscar películas por año, nombre y género.

Finalmente, la clase Series define una serie con un título, un año de lanzamiento, un género y un creador.


Los tests son:

```
import "mocha";
import { expect } from "chai";
import {
  Series,
  SeriesCollection,
} from "../src/ejercicio-1/Series";
import {
  Movie,
  MovieCollection,
} from "../src/ejercicio-1/Movies";
import {
  Documentary,
  DocumentaryCollection,
} from "../src/ejercicio-1/documentary";

describe("Streamable Collection Tests", () => {
    describe("Series Collection", () => {
      const series1 = new Series("Stranger Things", 2016, "Mystery", 3);
      const series2 = new Series("Breaking Bad", 2008, "Crime", 5);
      const series3 = new Series("The Crown", 2016, "History", 4);
      const seriesCollection = new SeriesCollection([series1, series2, series3]);
  
      it("should search by year and return the correct series", () => {
        const result = seriesCollection.searchByYear(2016);
        expect(result).to.deep.equal([series1, series3]);
      });
  
      it("should search by name and return the correct series", () => {
        const result = seriesCollection.searchByName("Stranger Things");
        expect(result).to.deep.equal([series1]);
      });
  
      it("should search by genre and return the correct series", () => {
        const result = seriesCollection.searchByGenre("Crime");
        expect(result).to.be.eql([series2]);
      });
    });
  
    describe("Movie Collection", () => {
      const movie1 = new Movie(
        "The Shawshank Redemption",
        1994,
        "Drama",
        "Pedro"
      );
      const movie2 = new Movie("The Godfather", 1972, "Crime", "Juan");
      const movie3 = new Movie("The Dark Knight", 2008, "Action", "Palomino");
      const movieCollection = new MovieCollection([movie1, movie2, movie3]);
  
      it("should search by year and return the correct movies", () => {
        const result = movieCollection.searchByYear(2008);
        expect(result).to.deep.equal([movie3]);
      });
  
      it("should search by name and return the correct movie", () => {
        const result = movieCollection.searchByName("The Godfather");
        expect(result).to.deep.equal([movie2]);
      });
  
      it("should search by genre and return the correct movies", () => {
        const result = movieCollection.searchByGenre("Drama");
        expect(result).to.be.eql([movie1]);
      });
    });
  
    describe("DocumentaryCollection", () => {
      const documentaries: Documentary[] = [
        new Documentary("Planet Earth", 2006, "Nature", "David Attenborough"),
        new Documentary(
          "The Social Dilemma",
          2020,
          "Social Media",
          "Jeff Orlowski"
        ),
        new Documentary("The True Cost", 2015, "Fashion", "Andrew Morgan"),
      ];
  
      const documentaryCollection = new DocumentaryCollection(documentaries);
  
      describe("searchByYear", () => {
        it("should return documentaries released in a given year", () => {
          const result = documentaryCollection.searchByYear(2015);
          expect(result).to.have.lengthOf(1);
          expect(result[0].title).to.equal("The True Cost");
        });
      });
  
      describe("searchByGenre", () => {
        it("should return documentaries of a given genre", () => {
          const result = documentaryCollection.searchByGenre("Nature");
          expect(result).to.have.lengthOf(1);
          expect(result[0].title).to.equal("Planet Earth");
        });
      });
    });
  });
```

### Ejercicio 2

En este ejercicio tendrá que implementar una clase genérica que modele una lista de elementos de cualquier tipo y sus operaciones sin hacer uso de ninguna de las funcionlidades proporcionadas por Array.prototype. Se permite, sin embargo, el uso de [].

Deberá incluir, al menos, las siguientes operaciones para trabajar con su lista:

Método append, el cual, dadas dos listas, permite añadir al final de la primera los elementos de la segunda.
Método concatenate, que dado un número variable de listas, combina todos sus elementos en una única lista que retorna.
Método filter, que dada una lista y un predicado lógico retorna una lista con todos los elementos de la lista inicial para los cuales el predicado lógico es verdadero.
Método length, que devuelve el número de elementos de la lista.
Método map, que dada una lista y una función, retorna la lista resultante de aplicar a cada elemento de la lista inicial la función.
Método reduce, que dada una lista, una función y un acumulador inicial, reduce cada elemento al acumulador utilizando la función.
Método reverse, el cual dada una lista, retorna una lista con los elementos originales pero en orden inverso.
Método forEach, que dada una lista y una función, permite iterar en los elementos de la lista e invocar la función con cada uno de ellos.
Instancie diferentes listas que contengan elementos de diferentes tipos y lleve a cabo pruebas suficientes con cada una de las listas definidas para comprobar la generalidad de la clase diseñada.


El codigo realizado es:

```
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

```

Este es un código TypeScript que define una clase List genérica. Esta clase representa una colección de elementos del tipo T y proporciona una serie de métodos para trabajar con ella.

El constructor de la clase acepta un parámetro opcional elements que es un array de elementos para inicializar la lista. Si no se proporciona ningún parámetro, la lista estará vacía.

La clase tiene varios métodos útiles para trabajar con listas, como append, que permite agregar los elementos de otra lista al final de la lista actual, filter, que permite crear una nueva lista que contiene los elementos que cumplen una condición, map, que permite transformar los elementos de la lista en otra lista usando una función de transformación, reduce, que permite reducir la lista a un valor único usando una función acumuladora, y reverse, que invierte el orden de los elementos en la lista. Además, la clase tiene métodos auxiliares como add, toArray y length que permiten agregar elementos a la lista, obtener un array de los elementos en la lista y obtener la longitud de la lista, respectivamente.

En resumen, la clase List es una forma genérica y útil de trabajar con listas de elementos en TypeScript.

Los tests son:

```
import "mocha";
import { expect } from "chai";
import { List } from "../src/ejercicio-2/list";

describe("List", () => {
    describe("append", () => {
      it("should append the elements of a list to another list", () => {
        const list1 = new List([1, 2, 3]);
        const list2 = new List([4, 5, 6]);
        list1.append(list2);
        expect(list1.toArray()).to.eql([1, 2, 3, 4, 5, 6]);
      });
    });
  
    describe("concatenate", () => {
      it("should concatenate multiple lists into one", () => {
        const list1 = new List([1, 2, 3]);
        const list2 = new List([4, 5, 6]);
        const list3 = new List([7, 8, 9]);
        const concatenatedList = list1.concatenate(list2, list3);
        expect(concatenatedList.toArray()).to.eql([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      });
    });
  
    describe("filter", () => {
      it("should filter elements in the list based on a predicate", () => {
        const list = new List([1, 2, 3, 4, 5]);
        const filteredList = list.filter((element) => element % 2 === 0);
        expect(filteredList.toArray()).to.eql([2, 4]);
      });
    });
  
    describe("length", () => {
      it("should return the number of elements in the list", () => {
        const list = new List([1, 2, 3]);
        expect(list.length()).to.equal(3);
      });
    });
  
    describe("map", () => {
      it("should apply a function to every element in the list", () => {
        const list = new List([1, 2, 3]);
        const mappedList = list.map((element) => element * 2);
        expect(mappedList.toArray()).to.eql([2, 4, 6]);
      });
    });
  
    describe("reduce", () => {
      it("should reduce the list to a single value using an accumulator and a reducer function", () => {
        const list = new List([1, 2, 3, 4, 5]);
        const sum = list.reduce(
          (accumulator, current) => accumulator + current,
          0
        );
        expect(sum).to.equal(15);
      });
    });
  
    describe("reverse", () => {
      it("should reverse the order of the elements in the list", () => {
        const list = new List([1, 2, 3]);
        const reversedList = list.reverse();
        expect(reversedList.toArray()).to.eql([3, 2, 1]);
      });
    });
  
    describe("forEach", () => {
      it("should execute a function for each element in the list", () => {
        const list = new List([1, 2, 3]);
        const newArray = [];
        list.forEach((element) => newArray.push(element * 2));
        expect(newArray).to.eql([2, 4, 6]);
      });
    });
  
    describe("#add", () => {
      it("should add an element to the list", () => {
        const list = new List([1, 2, 3]);
        list.add(4);
        expect(list.toArray()).to.deep.equal([1, 2, 3, 4]);
      });
    });
  });
```


### Ejercicio 3 

Teniendo en cuenta el ejercicio de la biblioteca musical implementado en la práctica 5, mejore su diseño tratando de cumplir todos los principios SOLID si es que aún no los cumple.

Luego, trate de introducir las siguientes modificaciones a su diseño:

Ahora, la discografía de un artista podrá estar formada por una colección de discos o de singles. Por lo tanto, tendrá que contemplar la nueva entidad single. Generalmente, un single se diferencia de un disco en que el single contiene una única canción o varias versiones de la misma canción.

Además, ahora deberá hacer que la discografía sea una clase genérica. En algún punto de su código deberá concretar esta clase genérica indicando que la discografía puede ser una colección de discos, una colección de singles o una colección de discos y singles.

El codigo realizado es:

```

```

Los tests son:

```

```


### Ejercicio Modificacion

El codigo realizado es:

```

```

Los tests son:

```

```
