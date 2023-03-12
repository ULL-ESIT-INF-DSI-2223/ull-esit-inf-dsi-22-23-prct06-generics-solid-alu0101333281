import { ICancion, ISingle, IDisco, IArtista } from "./interfaces";

/**

Clase abstracta que representa un artista musical.
@template T - Tipo de elemento musical que el artista produce (puede ser una canción o un single)
@implements IArtista
*/
export abstract class Artista<T extends ICancion | ISingle>
  implements IArtista<T>
{
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
