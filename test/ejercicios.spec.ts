import "mocha";
import { expect } from "chai";
import { Series, SeriesCollection, Movie, MovieCollection, Documentary, DocumentaryCollection } from "../src/ejercicio-1";


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

