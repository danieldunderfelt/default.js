"use strict";

var util = require("util");
var chalk = require("chalk");

module.exports = {
  skeletonExists: function () {
    print(chalk.bold.red("A skeleton with that name already exists!"), "\u2718");
    process.exit(1);
  },

  creating: function (name) {
    print(chalk.cyan("Creating skeleton with name " + name + "..."), "\u2620");
  },

  extending: function (extName) {
    print(chalk.cyan("Extending from skeleton " + extName + "..."), "\u271a");
  },

  done: function () {
    print(chalk.green("All done!"), "\u2714");
    process.exit();
  },

  error: function (err) {
    print(chalk.bold.red("Error!"), "\u2718");
    print(chalk.red("Here's the output if you're interested: "), "\u2718");
    util.debug(err.stack);
    process.exit(1);
  },

  fileTransfer: function (file) {
    print(chalk.dim("Added to skeleton: " + chalk.magenta(file)), "\u271a");
  },

  makeSkelFile: function () {
    print(chalk.cyan("Creating Skeletonfile..."), "\u271a");
  },

  closetCreated: function () {
    print(chalk.cyan("Closet and ignore file created!"), "\u271a");
  } };

var print = function (message, symbol) {
  console.log(symbol + "    " + message);
};