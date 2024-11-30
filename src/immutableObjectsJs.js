// A library for working with immutable objects

/**
 * A class to create fully immutable objects.
 * Once created, the object's properties cannot be modified, deleted, or redefined.
 * @class
 */
class ConstObject {
  constructor(obj) {
    return this.#makeConst(obj);
  }

  #makeConst(obj) {
    if (typeof obj !== "object" || obj === null) {
      throw new Error("ConstObject can only be created from a non-null object");
    }

    const handler = {
      set(target, prop, value) {
        throw new Error("Can't change value of full const object");
      },
      deleteProperty(target, prop) {
        throw new Error("Can't change value of full const object");
      },
      defineProperty(target, prop, descriptor) {
        throw new Error("Can't change value of full const object");
      },
      setPrototypeOf(target, proto) {
        throw new Error("Can't change value of full const object");
      },
      get(target, prop) {
        const value = target[prop];
        if (typeof value === "object" && value !== null) {
          return new Proxy(value, handler);
        }
        return value;
      },
    };

    return new Proxy(obj, handler);
  }
}

/**
 * A class to create fully immutable arrays.
 * Once created, the array's elements cannot be modified, deleted, or redefined.
 * @class
 */
class ConstArray {
  constructor(arr) {
    return this.#makeConst(arr);
  }

  #makeConst(arr) {
    if (!Array.isArray(arr)) {
      throw new Error("ConstArray can only be created from an array");
    }

    const handler = {
      set(target, prop, value) {
        throw new Error("Can't change value of full const array");
      },
      deleteProperty(target, prop) {
        throw new Error("Can't change value of full const array");
      },
      defineProperty(target, prop, descriptor) {
        throw new Error("Can't change value of full const array");
      },
      setPrototypeOf(target, proto) {
        throw new Error("Can't change value of full const array");
      },
      get(target, prop) {
        const value = target[prop];
        if (Array.isArray(value)) {
          return new Proxy(value, handler); // for nested arrays
        } else if (typeof value === "object" && value !== null) {
          return new Proxy(value, handler); // for nested objects
        }
        return value;
      },
    };

    return new Proxy(arr, handler);
  }
}

/**
 * A class to create objects that only allow values of a single specified type.
 * Attempts to set properties to values of other types will throw an error.
 * @class
 * @param {string} type - The allowed type for the object's values.
 */
class OneTypeObject {
  constructor(type) {
    this.type = type;
    return this.#makeOneType({});
  }

  #makeOneType(obj) {
    if (typeof obj !== "object" || obj === null) {
      throw new Error(
        "OneTypeObject can only be created from a non-null object"
      );
    }

    return new Proxy(obj, {
      set: (target, prop, value) => {
        if (typeof value !== this.type) {
          throw new Error(
            `Can't change type of oneTypeObject to a different type (current type is ${this.type})`
          );
        }
        target[prop] = value;
        return true;
      },
    });
  }
}

/**
 * A class to create arrays that only allow elements of a single specified type.
 * Attempts to set elements to values of other types will throw an error.
 * @class
 * @param {string} type - The allowed type for the array's elements.
 */
class OneTypeArray {
  constructor(type) {
    this.type = type;
    return this.#makeOneType([]);
  }

  #makeOneType(arr) {
    if (!Array.isArray(arr)) {
      throw new Error("OneTypeArray can only be created from an array");
    }

    return new Proxy(arr, {
      set: (target, prop, value) => {
        if (prop !== "length" && typeof value !== this.type) {
          throw new Error(
            `Can't change type of oneTypeArray to a different type (current type is ${this.type})`
          );
        }
        target[prop] = value;
        return true;
      },
    });
  }
}

/**
 * A function to compare two objects for deep equality.
 * @function
 */
function deepEqual(obj1, obj2) {
  if (obj1 === obj2) return true;
  if (
    typeof obj1 !== "object" ||
    typeof obj2 !== "object" ||
    obj1 === null ||
    obj2 === null
  ) {
    return false;
  }

  let keys1 = Object.keys(obj1);
  let keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (let key of keys1) {
    if (!keys2.includes(key)) return false;
    if (!deepEqual(obj1[key], obj2[key])) return false;
  }

  return true;
}

module.exports = {
  ConstObject,
  ConstArray,
  OneTypeObject,
  OneTypeArray,
  deepEqual,
};
