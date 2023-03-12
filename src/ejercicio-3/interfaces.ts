export interface ICancion {
    nombre: string;
    duracion: number;
    generos: string[];
    single: boolean;
    reproducciones: number;
  }
  
export interface ISingle extends ICancion {
    versiones?: ICancion[];
  }

export interface IDisco<T extends ICancion | ISingle> {
    nombre: string;
    añoPublicacion: number;
    canciones: T[];
    singles?: ISingle[];
  }

export interface ISingle {
    nombre: string;
    duracion: number;
    generos: string[];
    reproducciones: number;
    versiones?: ICancion[];
  }

export interface IArtista<T extends ICancion | ISingle> {
    nombre: string;
    oyentesMensuales: number;
    discografia: IDisco<T>[];
  }
  