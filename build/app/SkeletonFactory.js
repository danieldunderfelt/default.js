"use strict";

var _classProps = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

var Skeleton = require("./Skeleton");
var ignore = require("ignore");
var recursive = require("recursive-readdir");
var path = require("path");
var fs = require("fs-extra");
var closet = require("./Closet");
var helpers = require("./helpers");
var message = require("./messages");

var SkeletonFactory = (function () {
  var SkeletonFactory = function SkeletonFactory(callback) {
    this.ignorePath = path.resolve(helpers.userHome(), ".closet");
    this.ignore = ignore().addIgnoreFile(this.ignorePath);
    this.callback = callback;
  };

  _classProps(SkeletonFactory, null, {
    create: {
      writable: true,
      value: function (name, extend) {
        var skeleton = new Skeleton(name);
        var root = closet.makeSkeletonDir(name);
        skeleton.originalRoot = process.cwd();
        skeleton.root = root;
        this.getSkeletonFiles(skeleton);
      }
    },
    getSkeletonFiles: {
      writable: true,
      value: function (skeleton) {
        var self = this;
        recursive(process.cwd(), function (err, files) {
          if (err) {
            helpers.err(err);
          }

          self.setSkeletonFiles(skeleton, files);
        });
      }
    },
    setSkeletonFiles: {
      writable: true,
      value: function (skeleton, files) {
        var ignoreProcessed = this.ignore.filter(files);
        var pathProcessed = ignoreProcessed.map(function (path) {
          return helpers.removeOrigPath(path, skeleton.originalRoot + "/");
        });

        this.currentSkeleton.files = pathProcessed;

        this.putIntoCloset();
      }
    },
    putIntoCloset: {
      writable: true,
      value: function () {
        var self = this;

        if (this.currentSkeleton.root === process.cwd()) {
          this.makeSkeletonFile();
        } else {
          var count = this.currentSkeleton.files.length - 1;

          this.currentSkeleton.files.forEach(function (file, i) {
            message.fileTransfer(file);

            var from = self.currentSkeleton.originalRoot + "/" + file;
            var to = self.currentSkeleton.root + "/" + file;

            fs.copy(from, to, function (err) {
              if (err) {
                helpers.err(err);
              }

              if (i === count) self.makeSkeletonFile();
            });
          });
        }
      }
    },
    makeSkeletonFile: {
      writable: true,
      value: function () {
        var self = this;
        message.makeSkelFile();
        fs.writeJson(this.currentSkeleton.root + "/Skeletonfile", this.currentSkeleton, function (err) {
          self.callback();
        });
      }
    }
  });

  return SkeletonFactory;
})();

module.exports = SkeletonFactory;