"use strict";

var _classProps = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

var path = require("path");
var SkeletonFactory = require("./SkeletonFactory");
var helpers = require("./helpers");

var PackageManager = (function () {
  var PackageManager = function PackageManager() {};

  _classProps(PackageManager, null, {
    create: {
      writable: true,
      value: function (name, options) {
        if (typeof name === "undefined") {
          var folderName = process.cwd().split("/");
          name = folderName[folderName.length - 1];
        }

        console.log("Creating a new skeleton...");

        var skeleton = new SkeletonFactory(name, jelpers.done).create();
      }
    },
    addFile: {
      writable: true,
      value: function () {}
    },
    deploy: {
      writable: true,
      value: function () {}
    }
  });

  return PackageManager;
})();

module.exports = new PackageManager();