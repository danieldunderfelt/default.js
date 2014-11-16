"use strict";

var fs = require("fs");

module.exports = {
  err: function (err) {
    console.log(err);
    process.exit(1);
  },

  userHome: function () {
    return process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
  },

  done: function () {
    console.log("All done!");
    process.exit();
  }
};