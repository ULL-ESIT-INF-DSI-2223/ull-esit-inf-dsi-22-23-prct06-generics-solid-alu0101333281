import {
    ICancion, ISingle, IDisco
  } from "../ejercicio-3/interfaces";

export class Disco<T extends ICancion> implements IDisco<T> {
    constructor(
      public nombre: string,
      public añoPublicacion: number,
      public canciones: T[],
      public singles?: ISingle[]
    ) {
      this.singles = singles || [];
    }
  }
  
  export abstract class DiscoSingle<
    T extends ICancion | ISingle
  > extends Disco<T> {
    declare singles?: ISingle[];
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