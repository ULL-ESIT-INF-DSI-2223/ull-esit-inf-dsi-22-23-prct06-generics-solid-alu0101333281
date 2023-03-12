import {
    Searchable, Streamable
  } from "../ejercicio-1/interfaces";
  import {
    BasicStreamableCollection
  } from "../ejercicio-1/BasicStreamableCollection";

export class Series {
    constructor(
      public name: string,
      public year: number,
      public genre: string,
      public seasons: number
    ) {}
  }
  
  export class SeriesSeason {
    constructor(public seasonNumber: number, public episodes: number) {}
  }
  
  export class SeriesCollection
    extends BasicStreamableCollection<Series>
    implements Searchable<Series>
  {
    constructor(series: Series[]) {
      super(series);
    }
  
    searchByYear(year: number): Series[] {
      return this.items.filter((series) => series.year === year);
    }
  
    searchByName(name: string): Series[] {
      return this.items.filter((series) =>
        series.name.toLowerCase().includes(name.toLowerCase())
      );
    }
    searchByGenre(genre: string): Series[] {
      return this.items.filter((series) => series.genre.includes(genre));
    }
  }