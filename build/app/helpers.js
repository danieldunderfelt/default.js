"use strict";

var fs = require("fs");

module.exports = {
  err: function (err) {
    console.log(err);
    return 1;
  },

  userHome: function () {
    return process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
  }
};