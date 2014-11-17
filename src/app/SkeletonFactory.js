var Skeleton = require('./Skeleton');
var ignore = require('ignore');
var recursive = require('recursive-readdir');
var path = require('path');
var fs = require('fs-extra');
var helpers = require('./helpers');

class SkeletonFactory {

	constructor(name, callback) {
		this.currentSkeleton = new Skeleton(name);
		this.ignorePath = path.resolve(helpers.userHome(), '.closet');
		this.ignore = ignore().addIgnoreFile(this.ignorePath);
		this.callback = callback;
	}

	create() {
		var self = this;
		var root = this.createSkeletonDir();
		this.setSkeletonData(root);
		this.getSkeletonFiles();
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

	getSkeletonFiles() {


		recursive(process.cwd(), this.setSkeletonFiles.bind(this));
	}

	setSkeletonFiles(err, files) {
		if(err) {
			helpers.err(err);
		}

		var origRoot = this.currentSkeleton.originalRoot + '/';

		var ignoreProcessed = this.ignore.filter(files);
		var pathProcessed = ignoreProcessed.map(function(path, i, arr) {
			return path.replace(origRoot, '');
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
				console.log(file);
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
		console.log("Making Skeletonfile...");

		fs.writeJson(this.currentSkeleton.root + '/Skeletonfile', this.currentSkeleton, function(err) {
			self.callback();
		});
	}
}

module.exports = SkeletonFactory;