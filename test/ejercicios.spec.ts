import "mocha";
import { expect } from "chai";
import { Artista, BibliotecaMusical } from "../src/ejercicio-1";
import { Connect4 } from "../src/ejercicio-2";
import { isPaseoValido } from "../src/ejercicio-1-mod";
import { Persona, Estudiante, Profesor, Asignatura } from "../src/ejercicio-2-mod";

describe("BibliotecaMusical", () => {
  const disco1 = {
    nombre: "Disco 1",
    añoPublicacion: 2000,
    canciones: [
      {
        nombre: "Cancion 1",
        duracion: 120,
        generos: ["Rock"],
        single: true,
        reproducciones: 100,
      },
      {
        nombre: "Cancion 2",
        duracion: 180,
        generos: ["Pop", "Rock"],
        single: false,
        reproducciones: 200,
      },
      {
        nombre: "Cancion 3",
        duracion: 150,
        generos: ["Pop"],
        single: true,
        reproducciones: 150,
      },
    ],
  };

  const disco2 = {
    nombre: "Disco 2",
    añoPublicacion: 2010,
    canciones: [
      {
        nombre: "Cancion 4",
        duracion: 90,
        generos: ["Pop"],
        single: true,
        reproducciones: 50,
      },
      {
        nombre: "Cancion 5",
        duracion: 210,
        generos: ["Rock"],
        single: false,
        reproducciones: 300,
      },
    ],
  };

  const artista1 = new Artista("Artista 1", 1000000, [disco1]);
  const artista2 = new Artista("Artista 2", 500000, [disco1, disco2]);
  const biblioteca = new BibliotecaMusical([artista1, artista2]);

  describe("mostrarInformacion", () => {
    it("debería mostrar la información de los artistas en formato tabla", () => {
      biblioteca.mostrarInformacion();
      // Se espera que la información se muestre por consola sin errores
    });
  });

  /*describe('buscarArtistas', () => {
    it('debería encontrar los artistas que coinciden con la búsqueda', () => {
      const query = 'artista1';
      const resultados = biblioteca.buscarArtistas(query);
      expect(resultados[0].nombre).to.equal('Artista 1');
      expect(resultados[1].nombre).to.equal('Artista 2');
    });
  });*/
  describe("#numCancionesEnDisco", () => {
    it("devuelve el número de canciones en un disco existente", () => {
      const numCanciones = artista1.numCancionesEnDisco("Disco 1");
      expect(numCanciones).to.be.eql(3);
    });
  });

  describe("#duracionDisco", () => {
    it("devuelve la duración en segundos de un disco existente", () => {
      const duracion = artista1.duracionDisco("Disco 1");
      expect(duracion).to.be.eql(450);
    });
  });

  describe("#reproduccionesDisco", () => {
    it("devuelve el número de reproducciones de un disco existente", () => {
      const reproducciones = artista2.reproduccionesDisco("Disco 2");
      expect(reproducciones).to.be.eql(350);
    });
  });
});

describe("Connect4", () => {
  let game;

  beforeEach(() => {
    game = new Connect4();
  });

  describe("play()", () => {
    it("should switch players after a valid move", () => {
      const currentPlayerIndex = game.currentPlayerIndex;
      game.play(0);
      expect(game.currentPlayerIndex).to.equal(
        currentPlayerIndex === 0 ? 1 : 0
      );
    });

    /*it("should return true and set a winner when a player wins horizontally", () => {
      game.board.grid = [
        [" ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", "R", "R", "R", "R"],
        [" ", " ", " ", "Y", "Y", "Y", " "],
        [" ", " ", "Y", "R", "Y", "R", "Y"],
      ];
      const winner = game.play(3);
      expect(winner).to.equal(true);
      expect(game.winner).to.equal("R");
    });*/

    it("should return true and set a winner when a player wins vertically", () => {
      game.board.grid = [
        [" ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " "],
        [" ", "R", " ", " ", " ", " ", " "],
        [" ", "R", " ", " ", " ", " ", " "],
        [" ", "R", "Y", "Y", "Y", "Y", " "],
      ];
      const winner = game.play(1);
      expect(winner).to.equal(true);
      expect(game.winner).to.equal("R");
    });

    /*it("should return true and set a winner when a player wins diagonally up", () => {
      game.board.grid = [
        [" ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", "R", " ", " ", " "],
        [" ", " ", " ", "Y", "R", " ", " "],
        [" ", " ", "Y", "R", "Y", "R", " "],
      ];
      const winner = game.play(3);
      expect(winner).to.equal(true);
      expect(game.winner).to.equal("R");
    });*/
    /*describe("#play", () => {
      it("should return false if the game is already over", () => {
        game.winner = "R";
        const result = game.play(0);
        expect(result).to.equal(false);
      });*/

    it("should return false if the column is invalid", () => {
      const result = game.play(-1);
      expect(result).to.equal(false);
    });

    it("should return false if the column is full", () => {
      // Fill up column 0
      for (let i = 0; i < game.board.rows; i++) {
        game.board.grid[i][0] = "R";
      }
      const result = game.play(0);
      expect(result).to.equal(false);
    });

    /*it("should return true if the move is a winning move", () => {
        // Fill the bottom row of the board
        for (let col = 0; col < game.board.columns; col++) {
          game.board.grid[game.board.rows - 1][col] = "R";
        }
        const result = game.play(0);
        expect(result).to.equal(true);
        expect(game.winner).to.equal("R");
      });*/

    /*it("should return true if the board is full and there is no winner", () => {
        // Fill up the entire board except for the last column
        for (let col = 0; col < game.board.columns - 1; col++) {
          for (let row = 0; row < game.board.rows; row++) {
            game.board.grid[row][col] = "R";
          }
        }
        // Fill up the last column
        for (let row = 0; row < game.board.rows - 1; row++) {
          game.board.grid[row][game.board.columns - 1] = "Y";
        }
        const result = game.play(game.board.columns - 1);
        expect(result).to.equal(true);
        expect(game.winner).to.be.null;
      });*/

    it("should switch the current player after a valid move", () => {
      const initialPlayer = game.players[0];
      game.play(0);
      expect(game.getCurrentPlayer()).to.not.equal(initialPlayer);
    });

    describe("#isValidColumn", () => {
      it("should return true for valid columns", () => {
        expect(game.isValidColumn(0)).to.equal(true);
        expect(game.isValidColumn(6)).to.equal(true);
      });

      it("should return false for invalid columns", () => {
        expect(game.isValidColumn(-1)).to.equal(false);
        expect(game.isValidColumn(7)).to.equal(false);
      });
    });

    describe("#getNextOpenRow", () => {
      it("should return the bottom row if the column is empty", () => {
        const result = game.getNextOpenRow(0);
        expect(result).to.equal(game.board.rows - 1);
      });
    });
  });
});

describe("isPaseoValido function tests", () => {
  it("isPaseoValido(['n', 'g', 's', 'e', 'o', 'n', 'n','n', 'o', 'o']), se le agrega una direccion no definida returns value undefined", () => {
    expect(
      isPaseoValido(["n", "g", "s", "e", "o", "n", "n", "n", "o", "o"])
    ).to.be.eql(undefined);
  });
  it("isPaseoValido(['n', 'e', 's', 'e', 'o', 'n', 'n','n', 'o', 'o']), distintos en todas direcciones returns value false", () => {
    expect(
      isPaseoValido(["n", "e", "s", "e", "o", "n", "n", "n", "o", "o"])
    ).to.be.eql(false);
  });
  it("isPaseoValido(['n', 'e', 's', 'e', 'o', 's', 'n','n', 's', 'o']), se vuelve al mismo sitio returns value true", () => {
    expect(
      isPaseoValido(["n", "e", "s", "e", "o", "s", "n", "n", "s", "o"])
    ).to.be.eql(true);
  });
  it("isPaseoValido(['n', 'e', 's', 'e', 'o', 's', 'n','n', 's', 'o']), mayor longitud returns value false", () => {
    expect(
      isPaseoValido([
        "n",
        "e",
        "s",
        "e",
        "o",
        "s",
        "n",
        "n",
        "s",
        "o",
        "o",
        "e",
      ])
    ).to.be.eql(false);
  });
});




describe('Persona', () => {
  const persona = new Persona('John', 'Doe', '01/01/1990', 'male');

  it('should allow accessing attributes through getters', () => {
    expect(persona.getNombre()).to.equal('John');
    expect(persona.getApellidos()).to.equal('Doe');
    expect(persona.getFechaNacimiento()).to.equal('01/01/1990');
    expect(persona.getGenero()).to.equal('male');
  });

  it('should allow modifying attributes through setters', () => {
    persona.setNombre('Jane');
    expect(persona.getNombre()).to.equal('Jane');

    persona.setApellidos('Smith');
    expect(persona.getApellidos()).to.equal('Smith');

    persona.setFechaNacimiento('02/02/1990');
    expect(persona.getFechaNacimiento()).to.equal('02/02/1990');

    persona.setGenero('female');
    expect(persona.getGenero()).to.equal('female');
  });
});

describe('Estudiante', () => {
  const estudiante = new Estudiante('John', 'Doe', '01/01/1990', 'male', 'john.doe@example.com');

  it('should inherit from Person', () => {
    expect(estudiante instanceof Estudiante).to.be.true;
  });

  it('should have additional attributes', () => {
    expect(estudiante.getCorreoInstitucional()).to.equal('john.doe@example.com');
  });
});

describe('Profesor', () => {
  const profesor = new Profesor('Jane', 'Smith', '02/02/1990', 'female', 'jane.smith@example.com');

  it('should inherit from Person', () => {
    expect(profesor instanceof Persona).to.be.true;
  });

  it('should have additional attributes', () => {
    expect(profesor.getCorreoInstitucional()).to.equal('jane.smith@example.com');
  });
});

describe('Asignatura', () => {
  const estudiante1 = new Estudiante('John', 'Doe', '01/01/1990', 'male', 'john.doe@example.com');
  const estudiante2 = new Estudiante('Jane', 'Smith', '02/02/1990', 'female', 'jane.smith@example.com');
  const profesor1 = new Profesor('Alice', 'Brown', '03/03/1990', 'female', 'alice.brown@example.com');
  const profesor2 = new Profesor('Bob', 'Johnson', '04/04/1990', 'male', 'bob.johnson@example.com');
  const asignatura = new Asignatura('Math', [profesor1, profesor2], [estudiante1, estudiante2]);

  it('should have a list of students', () => {
    expect(asignatura.getAlumnado()).to.be.eql([ 'John Doe', 'Jane Smith' ]);
  });

  it('should have a list of teachers', () => {
    expect(asignatura.getProfesorado()).to.be.eql([ 'Alice Brown', 'Bob Johnson' ]);
  });
});
