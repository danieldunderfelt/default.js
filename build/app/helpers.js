"use strict";

var fs = require("fs-extra");
var path = require("path");
var message = require("./messages");

module.exports = {
  err: function (err) {
    if (err) {
      message.error(err);
    }
  },

  userHome: function () {
    return process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
  },

  isSkeleton: function (dirName) {
    return fs.existsSync(path.resolve(this.userHome(), ".closet/" + dirName) + "/Skeletonfile");
  }
};