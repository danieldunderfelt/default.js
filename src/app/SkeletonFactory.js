var Skeleton = require('./Skeleton');
var ignore = require('ignore');
var recursive = require('recursive-readdir');
var path = require('path');
var fs = require('fs-extra');
var helpers = require('./helpers');

class SkeletonFactory {

	constructor(name, callback) {
		this.currentSkeleton = new Skeleton(name);
		this.ignorePath = path.resolve(process.cwd(), 'data/.skeleton-ignore');
		this.ignore = ignore().addIgnoreFile(this.ignorePath);
		this.callback = callback;
	}

	create() {
		var self = this;
		var root = this.createSkeletonDir();
		this.setSkeletonData(root);
		this.setSkeletonFiles();
	}

	isSkeleton() {
		return fs.existsSync(process.cwd() + '/Skeletonfile');
	}

	createSkeletonDir() {
		var skeletonFolder = path.resolve(helpers.userHome(), '.closet/' + this.currentSkeleton.name);

		if(fs.existsSync(skeletonFolder) && this.isSkeleton()) {
			console.log("A skeleton with that name already exists!");
			process.exit(1);
		}

		fs.ensureDirSync(skeletonFolder);

		return skeletonFolder;
	}

	setSkeletonData(root) {
		this.currentSkeleton.originalRoot = process.cwd();
		this.currentSkeleton.root = root;
	}

	setSkeletonFiles() {
		var self = this;

		recursive(process.cwd(), function(err, files) {
			if(err) {
				return helpers.err(err);
			}

			self.currentSkeleton.files = self.ignore.filter(files);
			self.putIntoCloset();
		});
	}

	putIntoCloset() {
		if(this.currentSkeleton.root === process.cwd()) {
			this.makeSkeletonFile();
		}
		else {
			var self = this;
			var count = this.currentSkeleton.files.length - 1;

			this.currentSkeleton.files.forEach(function(file, i) {
				var from = self.currentSkeleton.originalRoot + '/' + file;
				var to = self.currentSkeleton.root + '/' + file;

				fs.copy(from, to, function(err) {
					if(err) {
						return helpers.err("File copy error. Make sure files are readable.");
					}

					if(i === count) self.makeSkeletonFile();
				});
			});
		}
	}

	makeSkeletonFile() {
		var self = this;
		console.log("Making Skeletonfile...");

		fs.writeJson(this.currentSkeleton.root + '/Skeletonfile', this.currentSkeleton, function(err) {
			self.callback();
		});
	}
}

module.exports = SkeletonFactory;