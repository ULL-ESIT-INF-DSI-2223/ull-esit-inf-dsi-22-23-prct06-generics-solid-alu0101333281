import {
    Searchable, Streamable
  } from "../ejercicio-1/interfaces";
  import {
    BasicStreamableCollection
  } from "../ejercicio-1/BasicStreamableCollection";

export class Movie {
    constructor(
      public title: string,
      public year: number,
      public genre: string,
      public director: string
    ) {}
  }
  
  export class MovieCollection
    extends BasicStreamableCollection<Movie>
    implements Searchable<Movie>
  {
    constructor(movies: Movie[]) {
      super(movies);
    }
  
    searchByYear(year: number): Movie[] {
      return this.items.filter((movie) => movie.year === year);
    }
  
    searchByName(name: string): Movie[] {
      return this.items.filter((movie) =>
        movie.title.toLowerCase().includes(name.toLowerCase())
      );
    }
  
    searchByGenre(genre: string): Movie[] {
      return this.items.filter((movie) => movie.genre === genre);
    }
  }