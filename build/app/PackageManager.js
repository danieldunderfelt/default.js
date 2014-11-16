"use strict";

var _classProps = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

var recursive = require("recursive-readdir");
var path = require("path");
var fs = require("fs-extra");
var helpers = require("./helpers");
var skeleton = require("./Skeleton");
var ignore = require("ignore");

var PackageManager = (function () {
  var PackageManager = function PackageManager() {
    this.currentSkeleton = {};
    this.ignorePath = path.resolve(process.cwd(), "data/.skeleton-ignore");
    this.ignore = ignore().addIgnoreFile(this.ignorePath);
  };

  _classProps(PackageManager, null, {
    create: {
      writable: true,
      value: function (skeletonName, options) {
        var self = this;
        var skeletonFolder = path.resolve(helpers.userHome(), ".closet/" + skeletonName);

        if (fs.existsSync(skeletonFolder)) {
          console.log("That skeleton is already spooking around!");
          return 1;
        }

        fs.ensureDirSync(skeletonFolder);

        this.currentSkeleton = new skeleton();
        this.currentSkeleton.name = skeletonName;
        this.currentSkeleton.originalRoot = process.cwd();
        this.currentSkeleton.root = skeletonFolder;

        recursive(process.cwd(), function (err, files) {
          if (err) {
            return helpers.err(err);
          }

          self.ignore.filter(files).forEach(function (file) {
            self.currentSkeleton.add(file);
          });

          self.putIntoCloset();
        });
      }
    },
    putIntoCloset: {
      writable: true,
      value: function () {
        var self = this;
        var done = false;

        this.currentSkeleton.files.forEach(function (file, i) {
          fs.copy(self.currentSkeleton.originalRoot + "/" + file, self.currentSkeleton.root + "/" + file, function (err) {
            if (err) {
              return helpers.err(err);
            }

            done = i === self.currentSkeleton.files.length - 1;
            if (done) this.makeSkeletonFile();
          });
        });
      }
    },
    makeSkeletonFile: {
      writable: true,
      value: function () {
        console.log("making skeleton file...");
      }
    },
    addFile: {
      writable: true,
      value: function () {}
    },
    dupe: {
      writable: true,
      value: function () {}
    },
    deploy: {
      writable: true,
      value: function () {}
    },
    done: {
      writable: true,
      value: function () {
        console.log(this.currentSkeleton);
      }
    }
  });

  return PackageManager;
})();

module.exports = new PackageManager();