import { Searchable, Streamable } from "../ejercicio-1/interfaces";
import { BasicStreamableCollection } from "../ejercicio-1/BasicStreamableCollection";

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
