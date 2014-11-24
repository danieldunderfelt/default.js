var Promise = require('bluebird');
var message = require('../messages');
var fs = Promise.promisifyAll(require('fs-extra'));

module.exports = function(skeleton) {
	var skeletonfilePath = skeleton.root + '/Skeletonfile';
	message.makeSkelFile();
	return fs.writeJsonAsync(skeletonfilePath, skeleton);
};