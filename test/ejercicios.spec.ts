import "mocha";
import { expect } from "chai";
import { List } from "../src/ejercicio-2";
import {
  Single,
  ArtistaImpl,
  Disco
} from "../src/ejercicio-3";

import { NumericSearchableCollection, StringSearchableCollection } from "../src/ejercicio-mod";



describe("List", () => {
  describe("append", () => {
    it("should append the elements of a list to another list", () => {
      const list1 = new List([1, 2, 3]);
      const list2 = new List([4, 5, 6]);
      list1.append(list2);
      expect(list1.toArray()).to.eql([1, 2, 3, 4, 5, 6]);
    });
  });

  describe("concatenate", () => {
    it("should concatenate multiple lists into one", () => {
      const list1 = new List([1, 2, 3]);
      const list2 = new List([4, 5, 6]);
      const list3 = new List([7, 8, 9]);
      const concatenatedList = list1.concatenate(list2, list3);
      expect(concatenatedList.toArray()).to.eql([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });
  });

  describe("filter", () => {
    it("should filter elements in the list based on a predicate", () => {
      const list = new List([1, 2, 3, 4, 5]);
      const filteredList = list.filter((element) => element % 2 === 0);
      expect(filteredList.toArray()).to.eql([2, 4]);
    });
  });

  describe("length", () => {
    it("should return the number of elements in the list", () => {
      const list = new List([1, 2, 3]);
      expect(list.length()).to.equal(3);
    });
  });

  describe("map", () => {
    it("should apply a function to every element in the list", () => {
      const list = new List([1, 2, 3]);
      const mappedList = list.map((element) => element * 2);
      expect(mappedList.toArray()).to.eql([2, 4, 6]);
    });
  });

  describe("reduce", () => {
    it("should reduce the list to a single value using an accumulator and a reducer function", () => {
      const list = new List([1, 2, 3, 4, 5]);
      const sum = list.reduce(
        (accumulator, current) => accumulator + current,
        0
      );
      expect(sum).to.equal(15);
    });
  });

  describe("reverse", () => {
    it("should reverse the order of the elements in the list", () => {
      const list = new List([1, 2, 3]);
      const reversedList = list.reverse();
      expect(reversedList.toArray()).to.eql([3, 2, 1]);
    });
  });

  describe("forEach", () => {
    it("should execute a function for each element in the list", () => {
      const list = new List([1, 2, 3]);
      const newArray = [];
      list.forEach((element) => newArray.push(element * 2));
      expect(newArray).to.eql([2, 4, 6]);
    });
  });

  describe("#add", () => {
    it("should add an element to the list", () => {
      const list = new List([1, 2, 3]);
      list.add(4);
      expect(list.toArray()).to.deep.equal([1, 2, 3, 4]);
    });
  });
});

// Pruebas para la función numCancionesEnDisco de ArtistaImpl
describe("numCancionesEnDisco", function () {
  it("debería devolver el número correcto de canciones y singles en un disco existente", function () {
    const disco = new Disco(
      "Mi disco",
      2023,
      [
        {
          nombre: "Canción 1",
          duracion: 180,
          generos: ["Rock"],
          single: false,
          reproducciones: 100,
        },
        {
          nombre: "Canción 2",
          duracion: 240,
          generos: ["Pop"],
          single: false,
          reproducciones: 50,
        },
      ],
      [
        {
          nombre: "Mi single",
          duracion: 200,
          generos: ["Rock"],
          single: true,
          reproducciones: 75,
        },
      ]
    );
    const artista = new ArtistaImpl("Mi artista", 1000, [disco]);

    const numCanciones = artista.numCancionesEnDisco("Mi disco");
    expect(numCanciones).to.equal(3);
  });

  it("debería lanzar un error si el disco no existe", function () {
    const artista = new ArtistaImpl("Mi artista", 1000, []);

    expect(() => artista.numCancionesEnDisco("Disco inexistente")).to.throw(
      Error
    );
  });
});

// Pruebas para la función duracionDisco de ArtistaImpl
describe("duracionDisco", function () {
  it("debería devolver la duración correcta de un disco existente", function () {
    const disco = new Disco(
      "Mi disco",
      2023,
      [
        {
          nombre: "Canción 1",
          duracion: 180,
          generos: ["Rock"],
          single: false,
          reproducciones: 100,
        },
        {
          nombre: "Canción 2",
          duracion: 240,
          generos: ["Pop"],
          single: false,
          reproducciones: 50,
        },
      ],
      [
        {
          nombre: "Mi single",
          duracion: 200,
          generos: ["Rock"],
          single: true,
          reproducciones: 75,
        },
      ]
    );
    const artista = new ArtistaImpl("Mi artista", 1000, [disco]);

    const duracion = artista.duracionDisco("Mi disco");
    expect(duracion).to.equal(620);
  });

  it("debería lanzar un error si el disco no existe", function () {
    const artista = new ArtistaImpl("Mi artista", 1000, []);

    expect(() => artista.duracionDisco("Disco inexistente")).to.throw(Error);
  });
});

// Pruebas para la función reproduccionesDisco de ArtistaImpl
describe("reproduccionesDisco", function () {
  it("debería devolver el número correcto de reproducciones de un disco existente", function () {
    const disco = new Disco(
      "Mi disco",
      2023,
      [
        {
          nombre: "Canción 1",
          duracion: 180,
          generos: ["Rock"],
          single: false,
          reproducciones: 100,
        },
        {
          nombre: "Canción 2",
          duracion: 240,
          generos: ["Pop"],
          single: false,
          reproducciones: 50,
        },
      ],
      [
        {
          nombre: "Mi single",
          duracion: 200,
          generos: ["Rock"],
          single: true,
          reproducciones: 75,
        },
      ]
    );
    const artista = new ArtistaImpl("Mi artista", 1000, [disco]);
    it("debería devolver el número correcto de reproducciones de un disco existente", function () {
      const disco = new Disco(
        "Mi disco",
        2023,
        [
          {
            nombre: "Canción 1",
            duracion: 180,
            generos: ["Rock"],
            single: false,
            reproducciones: 100,
          },
          {
            nombre: "Canción 2",
            duracion: 240,
            generos: ["Pop"],
            single: false,
            reproducciones: 50,
          },
        ],
        [
          {
            nombre: "Mi single",
            duracion: 200,
            generos: ["Rock"],
            single: true,
            reproducciones: 75,
          },
        ]
      );
      const artista = new ArtistaImpl("Mi artista", 1000, [disco]);
      const reproducciones = artista.reproduccionesDisco("Mi disco");
      expect(reproducciones).to.equal(225);
    });

    it("debería lanzar un error si el disco no existe", function () {
      const artista = new ArtistaImpl("Mi artista", 1000, []);
      expect(() => artista.reproduccionesDisco("Disco inexistente")).to.throw(
        Error
      );
    });
  });
});

describe("Single", () => {
  it("should create a single with versiones", () => {
    const cancion1 = {
      nombre: "Cancion 1",
      duracion: 120,
      generos: ["pop"],
      single: false,
      reproducciones: 500,
    };
    const cancion2 = {
      nombre: "Cancion 2",
      duracion: 180,
      generos: ["rock"],
      single: true,
      reproducciones: 1000,
    };
    const single = new Single("Single 1", 300, ["pop"], 1500, [
      cancion1,
      cancion2,
    ]);
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

// Pruebas para NumericSearchableCollection
describe('NumericSearchableCollection', () => {
  let collection: NumericSearchableCollection;

  beforeEach(() => {
    collection = new NumericSearchableCollection();
    collection.addItem(10);
    collection.addItem(20);
    collection.addItem(30);
    collection.addItem(10);
  });

  it('Debe buscar un número existente y devolver un array con todas las ocurrencias', () => {
    const result = collection.search(10);
    expect(result).to.have.lengthOf(2);
    expect(result).to.deep.equal([10, 10]);
  });

  it('Debe buscar un número inexistente y devolver un array vacío', () => {
    const result = collection.search(40);
    expect(result).to.be.empty;
  });
  it('Debe remover un item', () => {
    const result = collection.removeItem(10);
    expect(result).to.be.eql(undefined);
  });
  it('Debe decir el numero de items', () => {
    const result = collection.getNumberOfItems();
    expect(result).to.be.eql(4);
  });
  it('Debe obtener un item', () => {
    const result = collection.getItem(2);
    expect(result).to.be.eql(30);
  });
  it('Debe obtener ningun item ya que es negativo', () => {
    const result = collection.getItem(-1);
    expect(result).to.be.eql(undefined);
  });
  it('Debe remover un item que no existe', () => {
    const result = collection.removeItem(100);
    expect(result).to.be.eql(undefined);
  });
});

// Pruebas para StringSearchableCollection
describe('StringSearchableCollection', () => {
  let collection: StringSearchableCollection;

  beforeEach(() => {
    collection = new StringSearchableCollection();
    collection.addItem('hola');
    collection.addItem('adios');
    collection.addItem('hello');
    collection.addItem('hola mundo');
  });

  it('Debe buscar una subcadena existente y devolver un array con todas las ocurrencias', () => {
    const result = collection.search('o');
    expect(result).to.have.lengthOf(4);
    expect(result).to.deep.equal(['hola', 'adios', 'hello', 'hola mundo']);
  });

  it('Debe buscar una subcadena inexistente y devolver un array vacío', () => {
    const result = collection.search('xyz');
    expect(result).to.be.empty;
  });
  it('Debe remover un item', () => {
    const result = collection.removeItem(1);
    expect(result).to.be.eql('adios');
  });
  it('Debe decir el numero de items', () => {
    const result = collection.getNumberOfItems();
    expect(result).to.be.eql(4);
  });
  it('Debe obtener un item', () => {
    const result = collection.getItem(2);
    expect(result).to.be.eql('hello');
  });
  it('Debe obtener un item', () => {
    const result = collection.getItem(-1);
    expect(result).to.be.eql(undefined);
  });
  it('Debe remover un item', () => {
    const result = collection.removeItem(10);
    expect(result).to.be.eql(undefined);
  });
});
