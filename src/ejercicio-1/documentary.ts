import {
  Searchable, Streamable
} from "../ejercicio-1/interfaces";
import {
  BasicStreamableCollection
} from "../ejercicio-1/BasicStreamableCollection";





export class Documentary {
  constructor(
    public title: string,
    public year: number,
    public genre: string,
    public narrator: string
  ) {}
}

export class DocumentaryCollection
  extends BasicStreamableCollection<Documentary>
  implements Searchable<Documentary>
{
  constructor(documentaries: Documentary[]) {
    super(documentaries);
  }

  searchByYear(year: number): Documentary[] {
    return this.items.filter((documentary) => documentary.year === year);
  }

  searchByName(name: string): Documentary[] {
    return this.items.filter((documentary) =>
      documentary.title.toLowerCase().includes(name.toLowerCase())
    );
  }
  searchByGenre(genre: string): Documentary[] {
    return this.items.filter((doc) => doc.genre.includes(genre));
  }
}
