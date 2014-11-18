var path = require('path');
var fs = require('fs-extra');
var helpers = require('./helpers');

class Closet {

	get(skeleton) {

	}

	put(skeletonObj) {

	}

	make() {

	}

	makeSkeletonDir(name) {
		var skeletonFolder = path.resolve(helpers.userHome(), '.closet/' + name);
		fs.ensureDirSync(skeletonFolder);
		return skeletonFolder;
	}

}

module.exports = new Closet();