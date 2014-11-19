var Skeleton = require('./Skeleton');
var ignore = require('ignore');
var recursive = require('recursive-readdir');
var path = require('path');
var fs = require('fs-extra');
var closet = require('./Closet');
var helpers = require('./helpers');
var message = require('./messages');

class SkeletonFactory {

	constructor(callback) {
		this.ignorePath = path.resolve(helpers.userHome(), '.closet');
		this.ignore = ignore().addIgnoreFile(this.ignorePath);
		this.callback = callback;
	}

	create(name, extend) {
		var skeleton = this.createInstance(name);
		var root = closet.makeSkeletonDir(name);
		skeleton.originalRoot = process.cwd();
		skeleton.root = root;
		this.getSkeletonFiles(skeleton);
	}

	createInstance(name) {
		return new Skeleton(name);
	}

	getSkeletonFiles(skeleton) {
		var self = this;
		recursive(process.cwd(), function(err, files) {
			helpers.err(err);
			self.processFiles(skeleton, files);
		});
	}

	processFiles(skeleton, files) {
		var ignoreProcessed = this.ignore.filter(files);
		var pathProcessed = ignoreProcessed.map(function(path) {
			return helpers.removeOrigPath(path, skeleton.originalRoot + '/');
		});

		this.setSkeletonFiles(skeleton, pathProcessed);
	}

	setSkeletonFiles(skeleton, files) {
		skeleton.files = files;

		if(skeleton.root === process.cwd()) {
			this.makeSkeletonFile(skeleton);
		}
		else {
			closet.put(skeleton, this.makeSkeletonFile.bind(this));
		}
	}

	makeSkeletonFile(skeleton) {
		var self = this;

		message.makeSkelFile();

		fs.writeJson(skeleton.root + '/Skeletonfile', skeleton, function(err) {
			helpers.err(err);
			self.callback();
		});
	}
}

module.exports = SkeletonFactory;