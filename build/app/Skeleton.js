"use strict";

var _classProps = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

var Skeleton = (function () {
  var Skeleton = function Skeleton() {
    this.name = "";
    this.files = [];
    this.usedIn = [];
    this.root = "";
    this.originalRoot = "";
  };

  _classProps(Skeleton, null, {
    add: {
      writable: true,
      value: function (file) {
        this.files.push(file.replace(process.cwd() + "/", ""));
      }
    }
  });

  return Skeleton;
})();

module.exports = Skeleton;