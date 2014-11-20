"use strict";

var path = require("path");
var fs = require("fs-extra");
var helpers = require("./helpers");
var message = require("./messages");

module.exports = {
  path: path.resolve(helpers.userHome(), ".closet"),

  get: function (skeleton) {},

  put: function (skeleton, callback) {
    var self = this;
    var count = skeleton.files.length - 1;

    skeleton.files.forEach(function (file, i) {
      message.fileTransfer(file);

      file = "/" + file;
      var from = skeleton.originalRoot + file;
      var to = skeleton.root + file;

      fs.copy(from, to, function (err) {
        helpers.err(err);
        if (i === count) callback(skeleton);
      });
    });
  },

  make: function () {
    if (!fs.existsSync(this.path)) {
      var data = this.getIgnoreData();
      fs.outputFileSync(this.path + "/.skeleton-ignore", data);
    }
  },

  makeSkeletonDir: function (name) {
    var skeletonDir = path.resolve(helpers.userHome(), ".closet/" + name);
    fs.ensureDirSync(skeletonDir);
    return skeletonDir;
  },

  getIgnoreData: function () {
    return fs.readFileSync(path.resolve(__dirname, "../data/.skeleton-ignore"));
  }

};