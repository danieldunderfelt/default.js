"use strict";

var _classProps = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

var path = require("path");
var fs = require("fs-extra");
var helpers = require("./helpers");

var Closet = (function () {
  var Closet = function Closet() {};

  _classProps(Closet, null, {
    get: {
      writable: true,
      value: function (skeleton) {}
    },
    put: {
      writable: true,
      value: function (skeletonObj) {}
    },
    make: {
      writable: true,
      value: function () {}
    },
    makeSkeletonDir: {
      writable: true,
      value: function (name) {
        var skeletonFolder = path.resolve(helpers.userHome(), ".closet/" + name);
        fs.ensureDirSync(skeletonFolder);
        return skeletonFolder;
      }
    }
  });

  return Closet;
})();

module.exports = new Closet();