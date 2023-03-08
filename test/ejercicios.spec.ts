import "mocha";
import { expect } from "chai";
import { BasicStreamableCollection, Series, SeriesSeason, SeriesCollection, Movie, MovieCollection, Documentary, DocumentaryCollection } from "../src/ejercicio-1";
import { Connect4 } from "../src/ejercicio-2";

describe("Streamable Collection Tests", () => {
  describe("Series Collection", () => {
    const series1 = new Series("Stranger Things", 2016, "Mystery", 3);
    const series2 = new Series("Breaking Bad", 2008, "Crime", 5);
    const series3 = new Series("The Crown", 2016, "History", 4);
    const seriesCollection = new SeriesCollection([series1, series2, series3]);

    it("should search by year and return the correct series", () => {
      const result = seriesCollection.searchByYear(2016);
      expect(result).to.deep.equal([series1, series3]);
    });

    it("should search by name and return the correct series", () => {
      const result = seriesCollection.searchByName("Stranger Things");
      expect(result).to.deep.equal([series1]);
    });

    it("should search by genre and return the correct series", () => {
      const result = seriesCollection.searchByGenre("Crime");
      expect(result).to.be.eql([series2]);
    });
  });

  describe("Movie Collection", () => {
    const movie1 = new Movie("The Shawshank Redemption", 1994, "Drama", "Pedro");
    const movie2 = new Movie("The Godfather", 1972, "Crime", "Juan");
    const movie3 = new Movie("The Dark Knight", 2008, "Action", "Palomino");
    const movieCollection = new MovieCollection([movie1, movie2, movie3]);

    it("should search by year and return the correct movies", () => {
      const result = movieCollection.searchByYear(2008);
      expect(result).to.deep.equal([movie3]);
    });

    it("should search by name and return the correct movie", () => {
      const result = movieCollection.searchByName("The Godfather");
      expect(result).to.deep.equal([movie2]);
    });

    it("should search by genre and return the correct movies", () => {
      const result = movieCollection.searchByGenre("Drama");
      expect(result).to.be.eql([movie1]);
    });
  });
  
  describe('DocumentaryCollection', () => {
    const documentaries: Documentary[] = [
      new Documentary('Planet Earth', 2006, 'Nature', 'David Attenborough'),
      new Documentary('The Social Dilemma', 2020, 'Social Media', 'Jeff Orlowski'),
      new Documentary('The True Cost', 2015, 'Fashion', 'Andrew Morgan'),
    ];
  
    const documentaryCollection = new DocumentaryCollection(documentaries);
  
    describe('searchByYear', () => {
      it('should return documentaries released in a given year', () => {
        const result = documentaryCollection.searchByYear(2015);
        expect(result).to.have.lengthOf(1);
        expect(result[0].title).to.equal('The True Cost');
      });
    });
  
    describe('searchByGenre', () => {
      it('should return documentaries of a given genre', () => {
        const result = documentaryCollection.searchByGenre('Nature');
        expect(result).to.have.lengthOf(1);
        expect(result[0].title).to.equal('Planet Earth');
      });
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



