"use strict";

function Skeleton(name) {
  this.name = name;
  this.extend = "";
  this.files = [];
  this.usedIn = [];
  this.root = "";
  this.originalRoot = "";
}

module.exports = Skeleton;