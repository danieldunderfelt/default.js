"use strict";

var _classProps = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

var Skeleton = require("./Skeleton");
var path = require("path");
var chalk = require("chalk");
var fs = require("fs-extra");
var _ = require("lodash");
var Promise = require("bluebird");
Promise.longStackTraces();
var closet = require("./Closet");
var helpers = require("./helpers");
var message = require("./messages");
var ignore = require("./modules/ignore");
var getFileList = require("./modules/ReadDir");
var processPaths = require("./modules/ProcessFilepaths");
var makeSkeletonFile = require("./modules/MakeSkeletonFile");

var SkeletonFactory = (function () {
  var SkeletonFactory = function SkeletonFactory(callback) {
    this.callback = callback;
    this.skeleton = {};
  };

  _classProps(SkeletonFactory, null, {
    create: {
      writable: true,
      value: function (name, extend) {
        this.createInstance(name).then(closet.makeSkeletonDir).then(getFileList).then(ignore).then(processPaths.bind(this, this.skeleton.originalRoot)).then(this.setSkeletonFiles.bind(this)).then(this.callback()).error(helpers.err);
      }
    },
    createInstance: {
      writable: true,
      value: function (name) {
        var self = this;

        return new Promise(function (resolve) {
          self.skeleton = new Skeleton(name);
          self.skeleton.originalRoot = process.cwd();
          self.skeleton.root = root;
          resolve(name);
        });
      }
    },
    setSkeletonFiles: {
      writable: true,
      value: function (files) {
        this.skeleton.files = _.union(this.skeleton.files, files);

        if (this.skeleton.root === process.cwd()) {
          return makeSkeletonFile(this.skeleton);
        } else {
          return closet.put(this.skeleton);
        }
      }
    }
  });

  return SkeletonFactory;
})();

module.exports = SkeletonFactory;