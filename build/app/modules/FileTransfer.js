"use strict";

var Promise = require("bluebird");
var fs = Promise.promisifyAll(require("fs-extra"));
var message = require("../messages");
var helpers = require("../helpers");

var files = [];

module.exports = function (files, from, to) {
  var count = files.length - 1;
  var done = 0;

  files.forEach(function (file, i) {
    message.fileTransfer(file);

    file = "/" + file;
    var fromLoc = from + file;
    var toLoc = to + file;

    fs.copyAsync(fromLoc, toLoc).then(function () {
      return done++;
    }).error(helpers.err);
  });
};