interface Searchable<T> {
  searchByYear(year: number): T[];
  searchByName(name: string): T[];
  searchByGenre(genre: string): T[];
}

interface Streamable<T> extends Searchable<T> {
  getAll(): T[];
  add(item: T): void;
  remove(item: T): void;
}

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

export class Series {
  constructor(public name: string, public year: number, public genre: string,public seasons: number) {}
}

export class SeriesSeason {
  constructor(public seasonNumber: number, public episodes: number) {}
}

export class SeriesCollection extends BasicStreamableCollection<Series> implements Searchable<Series> {
  constructor(series: Series[]) {
    super(series);
  }

  searchByYear(year: number): Series[] {
    return this.items.filter((series) => series.year === year);
  }

  searchByName(name: string): Series[] {
    return this.items.filter((series) => series.name.toLowerCase().includes(name.toLowerCase()));
  }
  searchByGenre(genre: string): Series[] {
    return this.items.filter((series) => series.genre.includes(genre));
  }
}

export class Movie {
  constructor(public title: string, public year: number, public genre: string,public director: string) {}
}

export class MovieCollection extends BasicStreamableCollection<Movie> implements Searchable<Movie> {
  constructor(movies: Movie[]) {
    super(movies);
  }

  searchByYear(year: number): Movie[] {
    return this.items.filter((movie) => movie.year === year);
  }

  searchByName(name: string): Movie[] {
    return this.items.filter((movie) => movie.title.toLowerCase().includes(name.toLowerCase()));
  }
  
  searchByGenre(genre: string): Movie[] {
    return this.items.filter((movie) => movie.genre === genre);
  }
}

export class Documentary {
  constructor(public title: string, public year: number, public genre: string, public narrator: string) {}
}

export class DocumentaryCollection extends BasicStreamableCollection<Documentary> implements Searchable<Documentary> {
  constructor(documentaries: Documentary[]) {
    super(documentaries);
  }

  searchByYear(year: number): Documentary[] {
    return this.items.filter((documentary) => documentary.year === year);
  }

  searchByName(name: string): Documentary[] {
    return this.items.filter((documentary) => documentary.title.toLowerCase().includes(name.toLowerCase()));
  }
  searchByGenre(genre: string): Documentary[] {
    return this.items.filter((doc) => doc.genre.includes(genre));
  }
}
