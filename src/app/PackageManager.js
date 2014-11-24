var fs = require('fs-extra');
var path = require('path');
var SkeletonFactory = require('./SkeletonFactory');
var helpers = require('./helpers');
var message = require('./messages');
var program = require('commander');

class PackageManager {

	create(name, options) {
		name = this.getName(name);

		if(helpers.isSkeleton(name)) {
			message.skeletonExists();
		}

		var extend = typeof options.extend === "undefined" ? false : options.extend;
		message.creating(name);
		new SkeletonFactory(message.done).create(name, extend);
	}

	getName(name) {
		if(typeof name === "undefined") {
			var folderName = process.cwd().split('/');
			name = folderName[folderName.length - 1];
		}

		return name;
	}

	addFile() {

	}

	deploy() {

	}
}

module.exports = new PackageManager();