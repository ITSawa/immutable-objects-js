const {
  ConstObject,
  ConstArray,
  OneTypeObject,
  OneTypeArray,
  deepEqual,
} = require("../src/immutableObjectsJs"); // Adjust the path as needed

describe("ConstObject", () => {
  it("should throw error when trying to modify a property", async () => {
    const chai = await import("chai");
    const { expect } = chai;
    const obj = new ConstObject({ name: "John" });
    expect(() => {
      obj.name = "Jane";
    }).to.throw("Can't change value of full const object");
  });

  it("should throw error when trying to delete a property", async () => {
    const chai = await import("chai");
    const { expect } = chai;
    const obj = new ConstObject({ name: "John" });
    expect(() => {
      delete obj.name;
    }).to.throw("Can't change value of full const object");
  });

  it("should allow reading properties", async () => {
    const chai = await import("chai");
    const { expect } = chai;
    const obj = new ConstObject({ name: "John" });
    expect(obj.name).to.be.equal("John");
  });
});

describe("ConstArray", () => {
  it("should throw error when trying to modify an element", async () => {
    const chai = await import("chai");
    const { expect } = chai;
    const arr = new ConstArray([1, 2, 3]);
    expect(() => {
      arr[0] = 4;
    }).to.throw("Can't change value of full const array");
  });

  it("should throw error when trying to delete an element", async () => {
    const chai = await import("chai");
    const { expect } = chai;
    const arr = new ConstArray([1, 2, 3]);
    expect(() => {
      delete arr[0];
    }).to.throw("Can't change value of full const array");
  });

  it("should allow reading elements", async () => {
    const chai = await import("chai");
    const { expect } = chai;
    const arr = new ConstArray([1, 2, 3]);
    expect(arr[0]).to.be.equal(1);
  });
});

describe("OneTypeObject", () => {
  it("should throw error when setting a property to a different type", async () => {
    const chai = await import("chai");
    const { expect } = chai;
    const obj = new OneTypeObject("string");
    expect(() => {
      obj.name = 123;
    }).to.throw(
      "Can't change type of oneTypeObject to a different type (current type is string)"
    );
  });

  it("should allow setting a property to the correct type", async () => {
    const chai = await import("chai");
    const { expect } = chai;
    const obj = new OneTypeObject("string");
    obj.name = "John";
    expect(obj.name).to.be.equal("John");
  });
});

describe("OneTypeArray", () => {
  it("should throw error when adding an element of a different type", async () => {
    const chai = await import("chai");
    const { expect } = chai;
    const arr = new OneTypeArray("number");
    expect(() => {
      arr.push("string");
    }).to.throw(
      "Can't change type of oneTypeArray to a different type (current type is number)"
    );
  });

  it("should allow adding elements of the correct type", async () => {
    const chai = await import("chai");
    const { expect } = chai;
    const arr = new OneTypeArray("number");
    arr.push(1);
    expect(arr[0]).to.be.equal(1);
  });
});

describe("DeepCompare", () => {
  it("should return true for two objects with identical properties and values", async () => {
    const chai = await import("chai");
    const { expect } = chai;
    const obj1 = { name: "John", age: 30 };
    const obj2 = { name: "John", age: 30 };
    expect(deepEqual(obj1, obj2)).to.be.true;
  });

  it("should return false for two objects with different properties", async () => {
    const chai = await import("chai");
    const { expect } = chai;
    const obj1 = { name: "John", age: 30 };
    const obj2 = { name: "Jane", age: 30 };
    expect(deepEqual(obj1, obj2)).to.be.false;
  });

  it("should return false for objects with identical properties but different values", async () => {
    const chai = await import("chai");
    const { expect } = chai;
    const obj1 = { name: "John", age: 30 };
    const obj2 = { name: "John", age: 31 };
    expect(deepEqual(obj1, obj2)).to.be.false;
  });

  it("should return false for arrays with different lengths", async () => {
    const chai = await import("chai");
    const { expect } = chai;
    const arr1 = [1, 2, 3];
    const arr2 = [1, 2];
    expect(deepEqual(arr1, arr2)).to.be.false;
  });

  it("should return true for arrays with identical elements in the same order", async () => {
    const chai = await import("chai");
    const { expect } = chai;
    const arr1 = [1, 2, 3];
    const arr2 = [1, 2, 3];
    expect(deepEqual(arr1, arr2)).to.be.true;
  });

  it("should return false for arrays with identical elements in a different order", async () => {
    const chai = await import("chai");
    const { expect } = chai;
    const arr1 = [1, 2, 3];
    const arr2 = [3, 2, 1];
    expect(deepEqual(arr1, arr2)).to.be.false;
  });
});
