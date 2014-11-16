var path = require('path');
var SkeletonFactory = require('./SkeletonFactory');
var helpers = require('./helpers');

class PackageManager {

	create(name, options) {
		if(typeof name === "undefined") {
			var folderName = process.cwd().split('/');
			name = folderName[folderName.length - 1];
		}

		console.log("Creating a new skeleton...");

		var skeleton = new SkeletonFactory(name, jelpers.done).create();
	}

	addFile() {

	}

	deploy() {

	}
}

module.exports = new PackageManager();