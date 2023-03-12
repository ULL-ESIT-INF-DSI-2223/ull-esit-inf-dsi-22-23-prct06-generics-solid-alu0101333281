import "mocha";
import { expect } from "chai";
import { List } from "../src/ejercicio-2/list";

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
