import {
    ICancion, ISingle, IDisco
  } from "../ejercicio-3/interfaces";
  
  /**
   * Clase que representa un disco que contiene canciones y, opcionalmente, singles.
   * @implements {IDisco<T>}
   * @template T El tipo de las canciones del disco.
   */
  export class Disco<T extends ICancion> implements IDisco<T> {
    /**
     * Crea una instancia de Disco.
     * @param {string} nombre El nombre del disco.
     * @param {number} añoPublicacion El año en que se publicó el disco.
     * @param {T[]} canciones Las canciones del disco.
     * @param {ISingle[]} [singles] Los singles del disco (opcional).
     */
    constructor(
      public nombre: string,
      public añoPublicacion: number,
      public canciones: T[],
      public singles?: ISingle[]
    ) {
      this.singles = singles || [];
    }
  }
  
  /**
   * Clase abstracta que representa un disco que contiene canciones y singles.
   * @extends {Disco<T>}
   * @template T El tipo de las canciones y singles del disco.
   */
  export abstract class DiscoSingle<
    T extends ICancion | ISingle
  > extends Disco<T> {
    /**
     * Los singles del disco (opcional).
     */
    declare singles?: ISingle[];
    /**
     * Crea una instancia de DiscoSingle.
     * @param {string} nombre El nombre del disco.
     * @param {number} añoPublicacion El año en que se publicó el disco.
     * @param {T[]} canciones Las canciones y singles del disco.
     * @param {ISingle[]} [singles] Los singles del disco (opcional).
     */
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
  