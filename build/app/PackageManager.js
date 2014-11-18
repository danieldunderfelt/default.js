"use strict";

var _classProps = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

var fs = require("fs-extra");
var path = require("path");
var SkeletonFactory = require("./SkeletonFactory");
var helpers = require("./helpers");
var message = require("./messages");
var program = require("commander");

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

        if (helpers.isSkeleton(name)) {
          message.skeletonExists();
        }

        var extend = typeof options.extend === "undefined" ? false : options.extend;

        message.creating();

        new SkeletonFactory(message.done).create(name, extend);
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