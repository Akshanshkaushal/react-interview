Array.prototype.customMethod = function (callback, initialValue) {

  // result / accumulator variable
  let result = initialValue || [];

  // loop through current array
  for (let i = 0; i < this.length; i++) {

    // execute callback
    const returnedValue = callback(
      this[i], // current element
      i,       // current index
      this     // original array
    );

    // logic here
  }

  return result;
};


Array.prototype.myMap = function (callback) {

  const result = [];

  for (let i = 0; i < this.length; i++) {

    result.push(
      callback(this[i], i, this)
    );

  }

  return result;
};


Array.prototype.myFilter = function (callback) {

  const result = [];

  for (let i = 0; i < this.length; i++) {

    if (callback(this[i], i, this)) {
      result.push(this[i]);
    }

  }

  return result;
};


Array.prototype.myReduce = function (
  callback,
  initialValue
) {

  let accumulator = initialValue;

  for (let i = 0; i < this.length; i++) {

    accumulator = callback(
      accumulator,
      this[i],
      i,
      this
    );

  }

  return accumulator;
};


Array.prototype.myForEach = function (callback) {

  for (let i = 0; i < this.length; i++) {

    callback(this[i], i, this);

  }

};


Array.prototype.myFind = function (callback) {

  for (let i = 0; i < this.length; i++) {

    if (callback(this[i], i, this)) {
      return this[i];
    }

  }

};


Array.prototype.myMap = function () {}

// Polyfills are custom implementations of modern JavaScript methods used to
// provide support in older browsers. They are usually written using prototypes,
// loops, callbacks, and the this keyword.

// Prototype + this + loop + callback + return