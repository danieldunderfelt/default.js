"use strict";

var ignore = require("ignore");
var path = require("path");
var helpers = require("../helpers");

var ignorePath = path.resolve(helpers.userHome(), ".closet");
var ignore = ignore().addIgnoreFile(ignorePath);

module.exports = function (files) {
  return ignore.filter(files);
};