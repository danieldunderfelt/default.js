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
        var skeleton = this.createInstance(name);
        var root = closet.makeSkeletonDir(name);
        skeleton.originalRoot = process.cwd();
        skeleton.root = root;
        this.getSkeletonFiles(skeleton);
      }
    },
    createInstance: {
      writable: true,
      value: function (name) {
        return new Skeleton(name);
      }
    },
    getSkeletonFiles: {
      writable: true,
      value: function (skeleton) {
        var self = this;
        recursive(process.cwd(), function (err, files) {
          helpers.err(err);
          self.processFiles(skeleton, files);
        });
      }
    },
    processFiles: {
      writable: true,
      value: function (skeleton, files) {
        var ignoreProcessed = this.ignore.filter(files);
        var pathProcessed = ignoreProcessed.map(function (path) {
          return helpers.removeOrigPath(path, skeleton.originalRoot + "/");
        });

        this.setSkeletonFiles(skeleton, pathProcessed);
      }
    },
    setSkeletonFiles: {
      writable: true,
      value: function (skeleton, files) {
        skeleton.files = files;

        if (skeleton.root === process.cwd()) {
          this.makeSkeletonFile(skeleton);
        } else {
          closet.put(skeleton, this.makeSkeletonFile.bind(this));
        }
      }
    },
    makeSkeletonFile: {
      writable: true,
      value: function (skeleton) {
        var self = this;

        message.makeSkelFile();

        fs.writeJson(skeleton.root + "/Skeletonfile", skeleton, function (err) {
          helpers.err(err);
          self.callback();
        });
      }
    }
  });

  return SkeletonFactory;
})();

module.exports = SkeletonFactory;