import "mocha";
import { expect } from "chai";
import { NumericSearchableCollection, StringSearchableCollection } from "../src/ejercicio-mod/ejercicio-mod";

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
