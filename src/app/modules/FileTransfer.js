var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs-extra'));
var message = require('../messages');
var helpers = require('../helpers');

var files = [];

module.exports = function(files, from, to) {
	var count = files.length - 1;

	for(var i = 0, i < files.length; i++) {
		message.fileTransfer(files[i]);

		var file = '/' + files[i];
		var fromLoc = from + file;
		var toLoc = to + file;

		var promise = fs.copyAsync(fromLoc, toLoc).then( () => {
			done = i;
			if(i >= count) return promise;
		}).error(helpers.err);
	}
}