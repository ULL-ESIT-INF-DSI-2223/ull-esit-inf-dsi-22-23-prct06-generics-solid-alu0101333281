
import {
  ICancion, ISingle, IDisco, IArtista
} from "./interfaces";


export abstract class Artista<T extends ICancion | ISingle>
  implements IArtista<T>
{
  constructor(
    public nombre: string,
    public oyentesMensuales: number,
    public discografia: IDisco<T>[]
  ) {}
  abstract numCancionesEnDisco(discoNombre: string): number;
  abstract duracionDisco(discoNombre: string): number;
  abstract reproduccionesDisco(discoNombre: string): number;
}

export class ArtistaImpl<T extends ICancion | ISingle> extends Artista<T> {
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



export class Single implements ISingle {
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

