# Immutable Objects Library

A library for working with immutable objects and arrays in JavaScript. This library provides utility classes to create fully immutable objects and arrays, as well as objects and arrays that enforce a single type for all values or elements. Additionally, it includes a function to compare two objects for deep equality.

## Features

- **ConstObject**: A class to create fully immutable objects. Once created, the object's properties cannot be modified, deleted, or redefined.
- **ConstArray**: A class to create fully immutable arrays. Once created, the array's elements cannot be modified, deleted, or redefined.
- **OneTypeObject**: A class to create objects where all properties must be of a specific type. Attempts to set properties to values of other types will throw an error.
- **OneTypeArray**: A class to create arrays where all elements must be of a specific type. Attempts to set elements to values of other types will throw an error.
- **deepEqual**: A function to compare two objects for deep equality.

## Installation

You can install the library via npm:

```bash
npm install immutable-objects-js
Alternatively, you can include the JavaScript file in your project.

Usage
ConstObject
Creates an immutable object. Once created, the object's properties cannot be modified, deleted, or redefined.

javascript

const { ConstObject } = require('immutable-objects');

const obj = new ConstObject({ name: 'John', age: 30 });

// Throws an error: Can't change value of full const object
obj.name = 'Jane';
ConstArray
Creates an immutable array. The array's elements cannot be modified, deleted, or redefined.

javascript

const { ConstArray } = require('immutable-objects');

const arr = new ConstArray([1, 2, 3]);

// Throws an error: Can't change value of full const array
arr[0] = 10;
OneTypeObject
Creates an object where all properties must be of a specified type. Attempts to set properties to values of other types will throw an error.

javascript

const { OneTypeObject } = require('immutable-objects');

const obj = new OneTypeObject('string');
obj.name = 'John';  // Works fine

// Throws an error: Can't change type of oneTypeObject to a different type
obj.name = 30;
OneTypeArray
Creates an array where all elements must be of a specified type. Attempts to set elements to values of other types will throw an error.

javascript

const { OneTypeArray } = require('immutable-objects');

const arr = new OneTypeArray('number');
arr.push(1);  // Works fine

// Throws an error: Can't change type of oneTypeArray to a different type
arr.push('string');
deepEqual
Compares two objects for deep equality.

javascript

const { deepEqual } = require('immutable-objects');

const obj1 = { name: 'John', age: 30 };
const obj2 = { name: 'John', age: 30 };

console.log(deepEqual(obj1, obj2));  // true
API
ConstObject
javascript

new ConstObject(obj);
obj: The object to be made immutable.
ConstArray
javascript

new ConstArray(arr);
arr: The array to be made immutable.
OneTypeObject
javascript

new OneTypeObject(type);
type: The type that all values in the object must have.
OneTypeArray
javascript

new OneTypeArray(type);
type: The type that all elements in the array must have.
deepEqual
javascript

deepEqual(obj1, obj2);
obj1: The first object to compare.
obj2: The second object to compare.
License
This library is released under the MIT License. See LICENSE for more information.
```
