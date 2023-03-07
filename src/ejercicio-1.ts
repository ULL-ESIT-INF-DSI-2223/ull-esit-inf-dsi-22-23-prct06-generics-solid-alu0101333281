/**

Represents a song in a music library
*/
interface Cancion {
  nombre: string;
  duracion: number;
  generos: string[];
  single: boolean;
  reproducciones: number;
}
/**

Represents an album in a music library
*/
interface Disco {
  nombre: string;
  añoPublicacion: number;
  canciones: Cancion[];
}
/**

Represents a music artist in a music library
*/
export class Artista {
  nombre: string;
  oyentesMensuales: number;
  discografia: Disco[];
  /**

Constructs an instance of the Artista class
@param nombre Name of the artist
@param oyentesMensuales Number of monthly listeners of the artist
@param discografia List of albums of the artist
*/
  constructor(nombre: string, oyentesMensuales: number, discografia: Disco[]) {
    this.nombre = nombre;
    this.oyentesMensuales = oyentesMensuales;
    this.discografia = discografia;
  }
  /**

Returns the number of songs in the specified album of the artist
@param discoNombre Name of the album
@returns The number of songs in the album
@throws An error if the artist does not have an album with the specified name
*/
  numCancionesEnDisco(discoNombre: string): number {
    const disco = this.discografia.find((d) => d.nombre === discoNombre);
    if (disco) {
      return disco.canciones.length;
    } else {
      throw new Error(
        `El artista ${this.nombre} no tiene un disco llamado ${discoNombre}`
      );
    }
  }
  /**

Returns the total duration in seconds of the songs in the specified album of the artist
@param discoNombre Name of the album
@returns The total duration in seconds of the songs in the album
@throws An error if the artist does not have an album with the specified name
*/
  duracionDisco(discoNombre: string): number {
    const disco = this.discografia.find((d) => d.nombre === discoNombre);
    if (disco) {
      return disco.canciones.reduce(
        (totalDuracion, cancion) => totalDuracion + cancion.duracion,
        0
      );
    } else {
      throw new Error(
        `El artista ${this.nombre} no tiene un disco llamado ${discoNombre}`
      );
    }
  }
  /**

Returns the total number of times the songs in the specified album of the artist have been played
@param discoNombre Name of the album
@returns The total number of times the songs in the album have been played
@throws An error if the artist does not have an album with the specified name
*/
  reproduccionesDisco(discoNombre: string): number {
    const disco = this.discografia.find((d) => d.nombre === discoNombre);
    if (disco) {
      return disco.canciones.reduce(
        (totalReproducciones, cancion) =>
          totalReproducciones + cancion.reproducciones,
        0
      );
    } else {
      throw new Error(
        `El artista ${this.nombre} no tiene un disco llamado ${discoNombre}`
      );
    }
  }
}

export class BibliotecaMusical {
  artistas: Artista[];
  /**

Crea una instancia de BibliotecaMusical.
@param artistas - Lista de artistas en la biblioteca musical.
*/
  constructor(artistas: Artista[]) {
    this.artistas = artistas;
  }
  /**

Muestra información resumida de los artistas en la biblioteca musical en la consola.
*/
  mostrarInformacion(): void {
    console.table(
      this.artistas.map((a) => ({
        Nombre: a.nombre,
        OyentesMensuales: a.oyentesMensuales,
        Discografia: a.discografia.map((d) => d.nombre).join(", "),
      }))
    );
  }
  /**

Busca y muestra información de los artistas que coinciden con una consulta dada en la consola.
@param query - Consulta de búsqueda.
*/
  buscarArtistas(query: string): void {
    const resultados = this.artistas.filter((a) =>
      a.nombre.toLowerCase().includes(query.toLowerCase())
    );
    console.table(
      resultados.map((a) => ({
        Nombre: a.nombre,
        OyentesMensuales: a.oyentesMensuales,
        Discografia: a.discografia.map((d) => d.nombre).join(", "),
      }))
    );
  }
  /**

Busca y muestra información de los discos que coinciden con una consulta dada en la consola.
@param query - Consulta de búsqueda.
*/
  buscarDiscos(query: string): void {
    const resultados = this.artistas.flatMap((a) =>
      a.discografia
        .filter((d) => d.nombre.toLowerCase().includes(query.toLowerCase()))
        .map((d) => ({
          Artista: a.nombre,
          Disco: d.nombre,
          AñoPublicacion: d.añoPublicacion,
        }))
    );
    console.table(resultados);
  }
  /**

Busca y muestra información de las canciones que coinciden con una consulta dada en la consola.
@param query - Consulta de búsqueda.
*/
  buscarCanciones(query: string): void {
    const resultados = this.artistas.flatMap((a) =>
      a.discografia.flatMap((d) =>
        d.canciones
          .filter((c) => c.nombre.toLowerCase().includes(query.toLowerCase()))
          .map((c) => ({
            Artista: a.nombre,
            Disco: d.nombre,
            Cancion: c.nombre,
            Duracion: c.duracion,
            Generos: c.generos.join(", "),
            Single: c.single,
            Reproducciones: c.reproducciones,
          }))
      )
    );
    console.table(resultados);
  }
}
