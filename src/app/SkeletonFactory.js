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
		var skeleton = new Skeleton(name);
		var root = closet.makeSkeletonDir(name);
		skeleton.originalRoot = process.cwd();
		skeleton.root = root;
		this.getSkeletonFiles(skeleton);
	}

	getSkeletonFiles(skeleton) {
		var self = this;
		recursive(process.cwd(), function(err, files) {
			if(err) {
				helpers.err(err);
			}

			self.setSkeletonFiles(skeleton, files);
		});
	}

	setSkeletonFiles(skeleton, files) {
		var ignoreProcessed = this.ignore.filter(files);
		var pathProcessed = ignoreProcessed.map(function(path) {
			return helpers.removeOrigPath(path, skeleton.originalRoot + '/');
		});

		this.currentSkeleton.files = pathProcessed;

		this.putIntoCloset();
	}

	putIntoCloset() {
		var self = this;

		if(this.currentSkeleton.root === process.cwd()) {
			this.makeSkeletonFile();
		}

		else {
			var count = this.currentSkeleton.files.length - 1;

			this.currentSkeleton.files.forEach(function(file, i) {

				message.fileTransfer(file);

				var from = self.currentSkeleton.originalRoot + '/' + file;
				var to = self.currentSkeleton.root + '/' + file;

				fs.copy(from, to, function(err) {
					if(err) {
						helpers.err(err);
					}

					if(i === count) self.makeSkeletonFile();
				});
			});
		}
	}

	makeSkeletonFile() {
		var self = this;
		message.makeSkelFile();
		fs.writeJson(this.currentSkeleton.root + '/Skeletonfile', this.currentSkeleton, function(err) {
			self.callback();
		});
	}
}

module.exports = SkeletonFactory;