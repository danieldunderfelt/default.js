"use strict";

var chalk = require("chalk");

module.exports = {
  skeletonExists: function () {
    print(chalk.bold.red("A skeleton with that name already exists!"), "\u2718");
    process.exit(1);
  },

  creating: function () {
    print(chalk.cyan("Creating your new skeleton..."), "\u2764");
  },

  done: function () {
    print(chalk.green("All done!"), "\u2714");
    process.exit();
  },

  error: function (err) {
    print(chalk.bold.red("Error!"), "\u2718");
    print(chalk.red("Here's the output if you're interested: "), "\u2718");
    console.log(err);
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