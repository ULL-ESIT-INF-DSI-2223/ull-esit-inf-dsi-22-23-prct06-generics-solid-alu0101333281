import "mocha";
import { expect } from "chai";
import { Series, SeriesCollection, Movie, MovieCollection, Documentary, DocumentaryCollection } from "../src/ejercicio-1";
import { List } from "../src/ejercicio-2";
import { Single,ArtistaImpl, Artista, Disco, DiscoSingle,  } from "../src/ejercicio-3";


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

describe('List', () => {
  describe('append', () => {
    it('should append the elements of a list to another list', () => {
      const list1 = new List([1, 2, 3]);
      const list2 = new List([4, 5, 6]);
      list1.append(list2);
      expect(list1.toArray()).to.eql([1, 2, 3, 4, 5, 6]);
    });
  });

  describe('concatenate', () => {
    it('should concatenate multiple lists into one', () => {
      const list1 = new List([1, 2, 3]);
      const list2 = new List([4, 5, 6]);
      const list3 = new List([7, 8, 9]);
      const concatenatedList = list1.concatenate(list2, list3);
      expect(concatenatedList.toArray()).to.eql([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });
  });

  describe('filter', () => {
    it('should filter elements in the list based on a predicate', () => {
      const list = new List([1, 2, 3, 4, 5]);
      const filteredList = list.filter((element) => element % 2 === 0);
      expect(filteredList.toArray()).to.eql([2, 4]);
    });
  });

  describe('length', () => {
    it('should return the number of elements in the list', () => {
      const list = new List([1, 2, 3]);
      expect(list.length()).to.equal(3);
    });
  });

  describe('map', () => {
    it('should apply a function to every element in the list', () => {
      const list = new List([1, 2, 3]);
      const mappedList = list.map((element) => element * 2);
      expect(mappedList.toArray()).to.eql([2, 4, 6]);
    });
  });

  describe('reduce', () => {
    it('should reduce the list to a single value using an accumulator and a reducer function', () => {
      const list = new List([1, 2, 3, 4, 5]);
      const sum = list.reduce((accumulator, current) => accumulator + current, 0);
      expect(sum).to.equal(15);
    });
  });

  describe('reverse', () => {
    it('should reverse the order of the elements in the list', () => {
      const list = new List([1, 2, 3]);
      const reversedList = list.reverse();
      expect(reversedList.toArray()).to.eql([3, 2, 1]);
    });
  });

  describe('forEach', () => {
    it('should execute a function for each element in the list', () => {
      const list = new List([1, 2, 3]);
      const newArray = [];
      list.forEach((element) => newArray.push(element * 2));
      expect(newArray).to.eql([2, 4, 6]);
    });
  });

  describe('#add', () => {
    it('should add an element to the list', () => {
      const list = new List([1, 2, 3]);
      list.add(4);
      expect(list.toArray()).to.deep.equal([1, 2, 3, 4]);
    });
  });
});


// Pruebas para la función numCancionesEnDisco de ArtistaImpl
describe('numCancionesEnDisco', function() {
  it('debería devolver el número correcto de canciones y singles en un disco existente', function() {
    const disco = new Disco('Mi disco', 2023, [
      {nombre: 'Canción 1', duracion: 180, generos: ['Rock'], single: false, reproducciones: 100},
      {nombre: 'Canción 2', duracion: 240, generos: ['Pop'], single: false, reproducciones: 50}
    ], [
      {nombre: 'Mi single', duracion: 200, generos: ['Rock'], single: true,reproducciones: 75}
    ]);
    const artista = new ArtistaImpl('Mi artista', 1000, [disco]);

    const numCanciones = artista.numCancionesEnDisco('Mi disco');
    expect(numCanciones).to.equal(3);
  });

  it('debería lanzar un error si el disco no existe', function() {
    const artista = new ArtistaImpl('Mi artista', 1000, []);

    expect(() => artista.numCancionesEnDisco('Disco inexistente')).to.throw(Error);
  });
});

// Pruebas para la función duracionDisco de ArtistaImpl
describe('duracionDisco', function() {
  it('debería devolver la duración correcta de un disco existente', function() {
    const disco = new Disco('Mi disco', 2023, [
      {nombre: 'Canción 1', duracion: 180, generos: ['Rock'], single: false, reproducciones: 100},
      {nombre: 'Canción 2', duracion: 240, generos: ['Pop'], single: false, reproducciones: 50}
    ], [
      {nombre: 'Mi single', duracion: 200, generos: ['Rock'],single: true, reproducciones: 75}
    ]);
    const artista = new ArtistaImpl('Mi artista', 1000, [disco]);

    const duracion = artista.duracionDisco('Mi disco');
    expect(duracion).to.equal(620);
  });

  it('debería lanzar un error si el disco no existe', function() {
    const artista = new ArtistaImpl('Mi artista', 1000, []);

    expect(() => artista.duracionDisco('Disco inexistente')).to.throw(Error);
  });
});

// Pruebas para la función reproduccionesDisco de ArtistaImpl
describe('reproduccionesDisco', function() {
  it('debería devolver el número correcto de reproducciones de un disco existente', function() {
    const disco = new Disco('Mi disco', 2023, [
      {nombre: 'Canción 1', duracion: 180, generos: ['Rock'], single: false, reproducciones: 100},
      {nombre: 'Canción 2', duracion: 240, generos: ['Pop'], single: false, reproducciones: 50}
    ], [
      {nombre: 'Mi single', duracion: 200, generos: ['Rock'],single: true, reproducciones: 75}
    ]);
    const artista = new ArtistaImpl('Mi artista', 1000, [disco]);
    it('debería devolver el número correcto de reproducciones de un disco existente', function() {
      const disco = new Disco('Mi disco', 2023, [
      {nombre: 'Canción 1', duracion: 180, generos: ['Rock'], single: false, reproducciones: 100},
      {nombre: 'Canción 2', duracion: 240, generos: ['Pop'], single: false, reproducciones: 50}
      ], [
      {nombre: 'Mi single', duracion: 200, generos: ['Rock'], single: true,reproducciones: 75}
      ]);
      const artista = new ArtistaImpl('Mi artista', 1000, [disco]);
      const reproducciones = artista.reproduccionesDisco('Mi disco');
expect(reproducciones).to.equal(225);
});

it('debería lanzar un error si el disco no existe', function() {
const artista = new ArtistaImpl('Mi artista', 1000, []);
expect(() => artista.reproduccionesDisco('Disco inexistente')).to.throw(Error);
});
});
});

describe("Single", () => {
  it("should create a single with versiones", () => {
    const cancion1 = { nombre: "Cancion 1", duracion: 120, generos: ["pop"], single: false,reproducciones: 500 };
    const cancion2 = { nombre: "Cancion 2", duracion: 180, generos: ["rock"], single: true,reproducciones: 1000 };
    const single = new Single("Single 1", 300, ["pop"], 1500, [cancion1, cancion2]);
    expect(single.nombre).to.equal("Single 1");
    expect(single.duracion).to.equal(300);
    expect(single.generos).to.deep.equal(["pop"]);
    expect(single.reproducciones).to.equal(1500);
    expect(single.versiones).to.deep.equal([cancion1, cancion2]);
  });

  it("should create a single without versiones", () => {
    const single = new Single("Single 2", 240, ["rock"], 800);
    expect(single.nombre).to.equal("Single 2");
    expect(single.duracion).to.equal(240);
    expect(single.generos).to.deep.equal(["rock"]);
    expect(single.reproducciones).to.equal(800);
    expect(single.versiones).to.deep.equal([]);
  });
});