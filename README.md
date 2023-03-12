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

Este es un código que define una clase List genérica. Esta clase representa una colección de elementos del tipo T y proporciona una serie de métodos para trabajar con ella.

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
/**
 * Representa una canción.
 * @interface
 */
export interface ICancion {
    /** Nombre de la canción. */
    nombre: string;
    /** Duración de la canción en segundos. */
    duracion: number;
    /** Géneros asociados a la canción. */
    generos: string[];
    /** Indica si la canción es un single. */
    single: boolean;
    /** Número de reproducciones de la canción. */
    reproducciones: number;
  }
  
  /**
   * Representa un single, que es una canción con la posibilidad de tener varias versiones.
   * @interface
   */
  export interface ISingle extends ICancion {
    /** Lista de versiones del single. */
    versiones?: ICancion[];
  }
  
  /**
   * Representa un disco, que es un conjunto de canciones y/o singles.
   * @interface
   * @template T - Tipo de elementos del disco, que pueden ser canciones o singles.
   */
  export interface IDisco<T extends ICancion | ISingle> {
    /** Nombre del disco. */
    nombre: string;
    /** Año de publicación del disco. */
    añoPublicacion: number;
    /** Lista de canciones y/o singles en el disco. */
    canciones: T[];
    /** Lista de singles en el disco. */
    singles?: ISingle[];
  }
  
  /**
   * Representa un artista, que es una persona que crea canciones y/o singles.
   * @interface
   * @template T - Tipo de elementos de la discografía del artista, que pueden ser canciones o singles.
   */
  export interface IArtista<T extends ICancion | ISingle> {
    /** Nombre del artista. */
    nombre: string;
    /** Número de oyentes mensuales del artista. */
    oyentesMensuales: number;
    /** Discografía del artista, que es una lista de discos que contienen canciones y/o singles. */
    discografia: IDisco<T>[];
  }
   /**
   * Clase que representa un disco que contiene canciones y, opcionalmente, singles.
   * @implements {IDisco<T>}
   * @template T El tipo de las canciones del disco.
   */
  export class Disco<T extends ICancion> implements IDisco<T> {
    /**
     * Crea una instancia de Disco.
     * @param {string} nombre El nombre del disco.
     * @param {number} añoPublicacion El año en que se publicó el disco.
     * @param {T[]} canciones Las canciones del disco.
     * @param {ISingle[]} [singles] Los singles del disco (opcional).
     */
    constructor(
      public nombre: string,
      public añoPublicacion: number,
      public canciones: T[],
      public singles?: ISingle[]
    ) {
      this.singles = singles || [];
    }
  }
  
  /**
   * Clase abstracta que representa un disco que contiene canciones y singles.
   * @extends {Disco<T>}
   * @template T El tipo de las canciones y singles del disco.
   */
  export abstract class DiscoSingle<
    T extends ICancion | ISingle
  > extends Disco<T> {
    /**
     * Los singles del disco (opcional).
     */
    declare singles?: ISingle[];
    /**
     * Crea una instancia de DiscoSingle.
     * @param {string} nombre El nombre del disco.
     * @param {number} añoPublicacion El año en que se publicó el disco.
     * @param {T[]} canciones Las canciones y singles del disco.
     * @param {ISingle[]} [singles] Los singles del disco (opcional).
     */
    constructor(
      nombre: string,
      añoPublicacion: number,
      canciones: T[],
      singles?: ISingle[]
    ) {
      super(nombre, añoPublicacion, canciones);
      this.singles = singles;
    }
  }
  /**

Clase abstracta que representa un artista musical.
@template T - Tipo de elemento musical que el artista produce (puede ser una canción o un single)
@implements IArtista
*/
export abstract class Artista<T extends ICancion | ISingle> implements IArtista<T> {
  /**
  
  Constructor de la clase Artista.
  @param nombre - Nombre del artista.
  @param oyentesMensuales - Número de oyentes mensuales que tiene el artista.
  @param discografia - Discografía del artista (lista de discos y/o singles que ha producido).
  */
  constructor(
  public nombre: string,
  public oyentesMensuales: number,
  public discografia: IDisco<T>[]
  ) {}
  /**
  
  Método abstracto que devuelve el número de canciones en un disco del artista.
  @abstract
  @param discoNombre - Nombre del disco.
  @returns Número de canciones en el disco.
  */
  abstract numCancionesEnDisco(discoNombre: string): number;
  /**
  
  Método abstracto que devuelve la duración total de un disco del artista.
  @abstract
  @param discoNombre - Nombre del disco.
  @returns Duración total del disco en segundos.
  */
  abstract duracionDisco(discoNombre: string): number;
  /**
  
  Método abstracto que devuelve el número total de reproducciones de un disco del artista.
  @abstract
  @param discoNombre - Nombre del disco.
  @returns Número total de reproducciones del disco.
  */
  abstract reproduccionesDisco(discoNombre: string): number;
  }

  /**
Clase que implementa la interfaz IArtista para representar un artista musical.
@template T - Tipo de elemento musical que el artista produce (puede ser una canción o un single).
@extends Artista
*/
export class ArtistaImpl<T extends ICancion | ISingle> extends Artista<T> {
    /**
  Método que devuelve el número de canciones y singles en un disco del artista.
  @param discoNombre - Nombre del disco.
  @returns Número de canciones y singles en el disco.
  @throws {Error} Si el artista no tiene un disco o single con el nombre especificado.
  */
  numCancionesEnDisco(discoNombre: string): number {
    const disco = this.discografia.find((d) => d.nombre === discoNombre);
    if (disco) {
      return (
        disco.canciones.length + (disco.singles ? disco.singles.length : 0)
      );
    } else {
      throw new Error(
        `El artista ${this.nombre} no tiene un disco o single llamado ${discoNombre}`
      );
    }
  }
    /**
  Método que devuelve la duracion de disco.
  @param discoNombre - Nombre del disco.
  @returns Número de canciones y singles en el disco.
  @throws {Error} Si el artista no tiene un disco o single con el nombre especificado.
  */
  duracionDisco(discoNombre: string): number {
    const disco = this.discografia.find((d) => d.nombre === discoNombre);
    if (disco) {
      const duracionCanciones = disco.canciones.reduce(
        (totalDuracion, cancion) => totalDuracion + cancion.duracion,
        0
      );
      const duracionSingles = disco.singles
        ? disco.singles.reduce((totalDuracion, single) => {
            const duracionVersiones = single.versiones
              ? single.versiones.reduce(
                  (totalDuracion, version) => totalDuracion + version.duracion,
                  0
                )
              : 0;
            return totalDuracion + single.duracion + duracionVersiones;
          }, 0)
        : 0;
      return duracionCanciones + duracionSingles;
    } else {
      throw new Error(
        `El artista ${this.nombre} no tiene un disco o single llamado ${discoNombre}`
      );
    }
  }
    /**
  Método que devuelve el número de reproducciones.
  @param discoNombre - Nombre del disco.
  @returns Número de canciones y singles en el disco.
  @throws {Error} Si el artista no tiene un disco o single con el nombre especificado.
  */
  reproduccionesDisco(discoNombre: string): number {
    const disco = this.discografia.find((d) => d.nombre === discoNombre);
    if (disco) {
      const reproduccionesCanciones = disco.canciones.reduce(
        (totalReproducciones, cancion) =>
          totalReproducciones + cancion.reproducciones,
        0
      );
      const reproduccionesSingles = disco.singles
        ? disco.singles.reduce((totalReproducciones, single) => {
            const reproduccionesVersiones = single.versiones
              ? single.versiones.reduce(
                  (totalReproducciones, version) =>
                    totalReproducciones + version.reproducciones,
                  0
                )
              : 0;
            return (
              totalReproducciones +
              single.reproducciones +
              reproduccionesVersiones
            );
          }, 0)
        : 0;
      return reproduccionesCanciones + reproduccionesSingles;
    } else {
      throw new Error(
        `El artista ${this.nombre} no tiene un disco o single llamado ${discoNombre}`
      );
    }
  }
}


/**

Clase que representa un single musical.
@implements ISingle
*/
export class Single implements ISingle {
  /** 
Constructor de la clase Single.
@param nombre - Nombre del single.
@param duracion - Duración del single en segundos.
@param generos - Lista de géneros del single.
@param reproducciones - Número de reproducciones del single.
@param versiones - Lista de canciones que conforman el single.
*/
  constructor(
    public nombre: string,
    public duracion: number,
    public generos: string[],
    public reproducciones: number,
    public versiones?: ICancion[]
  ) {
    this.versiones = versiones || [];
  }
  single: boolean;
}


```

Este código contiene la definición de varias interfaces y clases que representan elementos de la industria musical, como canciones, singles, discos y artistas.

La interfaz ICancion representa una canción con algunos atributos como el nombre, la duración, los géneros, el número de reproducciones y un indicador booleano que indica si la canción es un single o no.

La interfaz ISingle extiende la interfaz ICancion y agrega la posibilidad de tener varias versiones de un single.

La interfaz IDisco representa un disco, que puede contener canciones y/o singles. Es una interfaz parametrizada con un tipo T que puede ser ICancion o ISingle.

La interfaz IArtista representa un artista que produce canciones y/o singles. Es una interfaz parametrizada con un tipo T que puede ser ICancion o ISingle.

La clase Disco implementa la interfaz IDisco y representa un disco que contiene canciones y, opcionalmente, singles. Esta clase tiene un constructor que recibe el nombre del disco, el año de publicación, una lista de canciones y una lista de singles (opcional).

La clase abstracta DiscoSingle extiende la clase Disco y representa un disco que contiene canciones y singles. Esta clase también tiene un constructor que recibe los mismos parámetros que el constructor de Disco.

La clase abstracta Artista implementa la interfaz IArtista y representa un artista musical. Esta clase tiene un constructor que recibe el nombre del artista, el número de oyentes mensuales y la discografía del artista (una lista de discos y/o singles que ha producido). Además, esta clase tiene tres métodos abstractos que deben ser implementados por las clases que extienden Artista. Estos métodos son numCancionesEnDisco, que devuelve el número de canciones en un disco del artista, duracionDisco, que devuelve la duración total de un disco del artista, y numReproduccionesDisco, que devuelve el número total de reproducciones de un disco del artista.

Los tests son:

```
import "mocha";
import { expect } from "chai";
import {
  Single,
  ArtistaImpl
} from "../src/ejercicio-3/artista";
import {
  Disco
} from "../src/ejercicio-3/disco";

// Pruebas para la función numCancionesEnDisco de ArtistaImpl
describe("numCancionesEnDisco", function () {
    it("debería devolver el número correcto de canciones y singles en un disco existente", function () {
      const disco = new Disco(
        "Mi disco",
        2023,
        [
          {
            nombre: "Canción 1",
            duracion: 180,
            generos: ["Rock"],
            single: false,
            reproducciones: 100,
          },
          {
            nombre: "Canción 2",
            duracion: 240,
            generos: ["Pop"],
            single: false,
            reproducciones: 50,
          },
        ],
        [
          {
            nombre: "Mi single",
            duracion: 200,
            generos: ["Rock"],
            single: true,
            reproducciones: 75,
          },
        ]
      );
      const artista = new ArtistaImpl("Mi artista", 1000, [disco]);
  
      const numCanciones = artista.numCancionesEnDisco("Mi disco");
      expect(numCanciones).to.equal(3);
    });
  
    it("debería lanzar un error si el disco no existe", function () {
      const artista = new ArtistaImpl("Mi artista", 1000, []);
  
      expect(() => artista.numCancionesEnDisco("Disco inexistente")).to.throw(
        Error
      );
    });
  });
  
  // Pruebas para la función duracionDisco de ArtistaImpl
  describe("duracionDisco", function () {
    it("debería devolver la duración correcta de un disco existente", function () {
      const disco = new Disco(
        "Mi disco",
        2023,
        [
          {
            nombre: "Canción 1",
            duracion: 180,
            generos: ["Rock"],
            single: false,
            reproducciones: 100,
          },
          {
            nombre: "Canción 2",
            duracion: 240,
            generos: ["Pop"],
            single: false,
            reproducciones: 50,
          },
        ],
        [
          {
            nombre: "Mi single",
            duracion: 200,
            generos: ["Rock"],
            single: true,
            reproducciones: 75,
          },
        ]
      );
      const artista = new ArtistaImpl("Mi artista", 1000, [disco]);
  
      const duracion = artista.duracionDisco("Mi disco");
      expect(duracion).to.equal(620);
    });
  
    it("debería lanzar un error si el disco no existe", function () {
      const artista = new ArtistaImpl("Mi artista", 1000, []);
  
      expect(() => artista.duracionDisco("Disco inexistente")).to.throw(Error);
    });
  });
  
  // Pruebas para la función reproduccionesDisco de ArtistaImpl
  describe("reproduccionesDisco", function () {
    it("debería devolver el número correcto de reproducciones de un disco existente", function () {
      const disco = new Disco(
        "Mi disco",
        2023,
        [
          {
            nombre: "Canción 1",
            duracion: 180,
            generos: ["Rock"],
            single: false,
            reproducciones: 100,
          },
          {
            nombre: "Canción 2",
            duracion: 240,
            generos: ["Pop"],
            single: false,
            reproducciones: 50,
          },
        ],
        [
          {
            nombre: "Mi single",
            duracion: 200,
            generos: ["Rock"],
            single: true,
            reproducciones: 75,
          },
        ]
      );
      const artista = new ArtistaImpl("Mi artista", 1000, [disco]);
      it("debería devolver el número correcto de reproducciones de un disco existente", function () {
        const disco = new Disco(
          "Mi disco",
          2023,
          [
            {
              nombre: "Canción 1",
              duracion: 180,
              generos: ["Rock"],
              single: false,
              reproducciones: 100,
            },
            {
              nombre: "Canción 2",
              duracion: 240,
              generos: ["Pop"],
              single: false,
              reproducciones: 50,
            },
          ],
          [
            {
              nombre: "Mi single",
              duracion: 200,
              generos: ["Rock"],
              single: true,
              reproducciones: 75,
            },
          ]
        );
        const artista = new ArtistaImpl("Mi artista", 1000, [disco]);
        const reproducciones = artista.reproduccionesDisco("Mi disco");
        expect(reproducciones).to.equal(225);
      });
  
      it("debería lanzar un error si el disco no existe", function () {
        const artista = new ArtistaImpl("Mi artista", 1000, []);
        expect(() => artista.reproduccionesDisco("Disco inexistente")).to.throw(
          Error
        );
      });
    });
  });
  
  describe("Single", () => {
    it("should create a single with versiones", () => {
      const cancion1 = {
        nombre: "Cancion 1",
        duracion: 120,
        generos: ["pop"],
        single: false,
        reproducciones: 500,
      };
      const cancion2 = {
        nombre: "Cancion 2",
        duracion: 180,
        generos: ["rock"],
        single: true,
        reproducciones: 1000,
      };
      const single = new Single("Single 1", 300, ["pop"], 1500, [
        cancion1,
        cancion2,
      ]);
      expect(single.nombre).to.equal("Single 1");
      expect(single.duracion).to.equal(300);
      expect(single.generos).to.deep.equal(["pop"]);
      expect(single.reproducciones).to.equal(1500);
      expect(single.versiones).to.deep.equal([cancion1, cancion2]);
    });
  
    it("should create a single without versiones", () => {
      const single = new Single("Single 2", 240, ["rock"], 800);
      expect(single.nombre).to.equal("Single 2");
      expect(single.duracion).to.equal(240);
      expect(single.generos).to.deep.equal(["rock"]);
      expect(single.reproducciones).to.equal(800);
      expect(single.versiones).to.deep.equal([]);
    });
  });
```


### Ejercicio Modificacion

El codigo realizado es:

```
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

```

Este código define tres interfaces y dos clases en TypeScript. La primera interface Collectable<T> define un conjunto de métodos que deben ser implementados por una clase que represente una colección de elementos de tipo T. La segunda interface Searchable<T> define un método search que debe ser implementado por una clase que permita buscar elementos de tipo T en la colección. Ambas interfaces son implementadas por la clase abstracta SearchableCollection<T> que contiene un arreglo de elementos de tipo T y los métodos necesarios para agregar, obtener, eliminar y contar elementos. Además, la clase abstracta SearchableCollection<T> tiene un método abstracto search que debe ser implementado por las clases que extienden esta clase.

Las dos clases que extienden SearchableCollection<T> son NumericSearchableCollection y StringSearchableCollection. La clase NumericSearchableCollection implementa el método search para buscar números en la colección de números. La clase StringSearchableCollection implementa el método search para buscar cadenas de texto en la colección de cadenas de texto.

En resumen, este código proporciona una estructura básica para crear clases que representen colecciones de elementos de tipo T y permitan buscar elementos en ellas.

Los tests son:

```
import "mocha";
import { expect } from "chai";
import { NumericSearchableCollection, StringSearchableCollection } from "../src/ejercicio-mod/ejercicio-mod";

// Pruebas para NumericSearchableCollection
describe('NumericSearchableCollection', () => {
  let collection: NumericSearchableCollection;

  beforeEach(() => {
    collection = new NumericSearchableCollection();
    collection.addItem(10);
    collection.addItem(20);
    collection.addItem(30);
    collection.addItem(10);
  });

  it('Debe buscar un número existente y devolver un array con todas las ocurrencias', () => {
    const result = collection.search(10);
    expect(result).to.have.lengthOf(2);
    expect(result).to.deep.equal([10, 10]);
  });

  it('Debe buscar un número inexistente y devolver un array vacío', () => {
    const result = collection.search(40);
    expect(result).to.be.empty;
  });
  it('Debe remover un item', () => {
    const result = collection.removeItem(10);
    expect(result).to.be.eql(undefined);
  });
  it('Debe decir el numero de items', () => {
    const result = collection.getNumberOfItems();
    expect(result).to.be.eql(4);
  });
  it('Debe obtener un item', () => {
    const result = collection.getItem(2);
    expect(result).to.be.eql(30);
  });
  it('Debe obtener ningun item ya que es negativo', () => {
    const result = collection.getItem(-1);
    expect(result).to.be.eql(undefined);
  });
  it('Debe remover un item que no existe', () => {
    const result = collection.removeItem(100);
    expect(result).to.be.eql(undefined);
  });
});

// Pruebas para StringSearchableCollection
describe('StringSearchableCollection', () => {
  let collection: StringSearchableCollection;

  beforeEach(() => {
    collection = new StringSearchableCollection();
    collection.addItem('hola');
    collection.addItem('adios');
    collection.addItem('hello');
    collection.addItem('hola mundo');
  });

  it('Debe buscar una subcadena existente y devolver un array con todas las ocurrencias', () => {
    const result = collection.search('o');
    expect(result).to.have.lengthOf(4);
    expect(result).to.deep.equal(['hola', 'adios', 'hello', 'hola mundo']);
  });

  it('Debe buscar una subcadena inexistente y devolver un array vacío', () => {
    const result = collection.search('xyz');
    expect(result).to.be.empty;
  });
  it('Debe remover un item', () => {
    const result = collection.removeItem(1);
    expect(result).to.be.eql('adios');
  });
  it('Debe decir el numero de items', () => {
    const result = collection.getNumberOfItems();
    expect(result).to.be.eql(4);
  });
  it('Debe obtener un item', () => {
    const result = collection.getItem(2);
    expect(result).to.be.eql('hello');
  });
  it('Debe obtener un item', () => {
    const result = collection.getItem(-1);
    expect(result).to.be.eql(undefined);
  });
  it('Debe remover un item', () => {
    const result = collection.removeItem(10);
    expect(result).to.be.eql(undefined);
  });
});

```

### Coveralls

[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct06-generics-solid-alu0101333281/badge.svg?branch=src)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct06-generics-solid-alu0101333281?branch=src)

## Conclusion

Se ha plasmado atraves de este informe todos los conocimientos aprendidos en esta practica sobre clases genericas y principios de SOLID, tanto la destreza como para poder realizar modificaciones del mismo en la hora de entrega. 


## Bibliografia

1. https://coveralls.io/

2. https://jfbarrios.com/principios-solid-en-javascript

3. https://www.typescriptlang.org/docs/handbook/2/generics.html

4. https://openai.com/blog/chatgpt

