"use strict";

module.exports = function (obj, fn) {
  const keys = Object.keys(obj);

  keys.forEach((key, index) => {
    fn(obj[key], key, index);
  });
};