/**

    Clase que representa una persona.
    /
    export class Persona {
    /*
        @param nombre El nombre de la persona.
        @param apellidos Los apellidos de la persona.
        @param fechaNacimiento La fecha de nacimiento de la persona.
        @param genero El género de la persona.
*/
export class Persona {
    private _nombre: string;
    private _apellidos: string;
    private _fechaNacimiento: string;
    private _genero: string;
  
    constructor(nombre: string, apellidos: string, fechaNacimiento: string, genero: string) {
      this._nombre = nombre;
      this._apellidos = apellidos;
      this._fechaNacimiento = fechaNacimiento;
      this._genero = genero;
    }
  
    getNombre(): string {
      return this._nombre;
    }
  
    setNombre(value: string) {
      this._nombre = value;
    }
  
    getApellidos(): string {
      return this._apellidos;
    }
  
    setApellidos(value: string) {
      this._apellidos = value;
    }
  
    getFechaNacimiento(): string {
      return this._fechaNacimiento;
    }
  
    setFechaNacimiento(value: string) {
      this._fechaNacimiento = value;
    }
  
    getGenero(): string {
      return this._genero;
    }
  
    setGenero(value: string) {
      this._genero = value;
    }
  }
  /**
 * Clase que representa a un estudiante.
 *
 * @extends Persona
 */
  export class Estudiante extends Persona {
    private _correoInstitucional: string;
    /**
   * Crea una instancia de `Estudiante`.
   *
   * @param nombre - El nombre del estudiante.
   * @param apellidos - Los apellidos del estudiante.
   * @param fechaNacimiento - La fecha de nacimiento del estudiante.
   * @param genero - El género del estudiante.
   * @param correoInstitucional - El correo institucional del estudiante.
   */
    constructor(nombre: string, apellidos: string, fechaNacimiento: string, genero: string, correoInstitucional: string) {
      super(nombre, apellidos, fechaNacimiento, genero);
      this._correoInstitucional = correoInstitucional;
    }
    /**
   * Devuelve el correo institucional del estudiante.
   *
   * @returns El correo institucional del estudiante.
   */
    getCorreoInstitucional(): string {
      return this._correoInstitucional;
    }
    /**
   * Establece el correo institucional del estudiante.
   *
   * @param value - El nuevo correo institucional del estudiante.
   */
    setCorreoInstitucional(value: string) {
      this._correoInstitucional = value;
    }
  }
  
  export class Profesor extends Persona {
    private _correoInstitucional: string;
  
    constructor(nombre: string, apellidos: string, fechaNacimiento: string, genero: string, correoInstitucional: string) {
      super(nombre, apellidos, fechaNacimiento, genero);
      this._correoInstitucional = correoInstitucional;
    }
  
    getCorreoInstitucional(): string {
      return this._correoInstitucional;
    }
  
    setCorreoInstitucional(value: string) {
      this._correoInstitucional = value;
    }
  }
  
  export class Asignatura {
    private _nombre: string;
    private _profesores: Profesor[];
    private _estudiantes: Estudiante[];
  
    constructor(nombre: string, profesores: Profesor[], estudiantes: Estudiante[]) {
      this._nombre = nombre;
      this._profesores = profesores;
      this._estudiantes = estudiantes;
    }
  
    getNombre(): string {
      return this._nombre;
    }
  
    setNombre(value: string) {
      this._nombre = value;
    }
  
    getProfesores(): Profesor[] {
      return this._profesores;
    }
  
    setProfesores(value: Profesor[]) {
      this._profesores = value;
    }
  
    getEstudiantes(): Estudiante[] {
      return this._estudiantes;
    }
  
    setEstudiantes(value: Estudiante[]) {
      this._estudiantes = value;
    }
  
    getAlumnado(): string[] {
      return this._estudiantes.map((estudiante) => estudiante.getNombre() + ' ' + estudiante.getApellidos());
    }
  
    getProfesorado(): string[] {
      return this._profesores.map((profesor) => profesor.getNombre() + ' ' + profesor.getApellidos());
    }
}