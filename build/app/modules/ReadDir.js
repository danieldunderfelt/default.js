"use strict";

var Promise = require("bluebird");
var recursive = Promise.promisify(require("recursive-readdir"));

module.exports = function (dir) {
  return recursive(dir);
};