var Promise = require('bluebird');
var path = require('path');
var fs = Promise.promisifyAll(require('fs-extra'));
var helpers = require('./helpers');
var message = require('./messages');
var copy = require('./modules/FileTransfer');

module.exports = {

	path: path.resolve(helpers.userHome(), '.closet'),

	get: function(skeleton) {

	},

	put: function(skeleton) {
		return copy(skeleton.files, skeleton.originalRoot, skeleton.root);
	},

	make: function() {
		var self = this;
		return fs.ensureDirAsync(this.path)
		.then(self.getIgnoreData())
		.then(function(data) {
			return fs.outputFileAsync(self.path + '/.skeleton-ignore', data);
		})
		.catch(helpers.err);
	},

	makeSkeletonDir: function(name) {
		var skeletonDir = path.resolve(helpers.userHome(), '.closet/' + name);
		fs.ensureDirSync(skeletonDir);
		return skeletonDir;
	},

	getIgnoreData: function(proceed) {
		if(!proceed) {
			return fs.readFileAsync(path.resolve(__dirname, '../../data/.skeleton-ignore'));
		}

		else return false;
	}

};