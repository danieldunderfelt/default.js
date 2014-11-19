"use strict";

var _classProps = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

var path = require("path");
var fs = require("fs-extra");
var helpers = require("./helpers");
var message = require("./messages");

var Closet = (function () {
  var Closet = function Closet() {
    this.path = path.resolve(helpers.userHome(), ".closet");
  };

  _classProps(Closet, null, {
    get: {
      writable: true,
      value: function (skeleton) {}
    },
    put: {
      writable: true,
      value: function (skeleton, callback) {
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
      }
    },
    make: {
      writable: true,
      value: function () {
        if (!fs.existsSync(this.path)) {
          var data = this.getIgnoreData();
          fs.outputFileSync(this.path + "/.skeleton-ignore", data);
        }
      }
    },
    makeSkeletonDir: {
      writable: true,
      value: function (name) {
        var skeletonDir = path.resolve(helpers.userHome(), ".closet/" + name);
        fs.ensureDirSync(skeletonDir);
        return skeletonDir;
      }
    },
    getIgnoreData: {
      writable: true,
      value: function () {
        return fs.readFileSync(path.resolve(__dirname, "../data/.skeleton-ignore"));
      }
    }
  });

  return Closet;
})();

module.exports = new Closet();