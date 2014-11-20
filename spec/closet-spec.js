var closet = require('../build/app/Closet');
var Skeleton = require('../build/app/Skeleton');
var helpers = require('../build/app/helpers');

var fs = require('fs-extra');


describe("Closet", function() {

	var closetPath = helpers.userHome() + '/.closet';
	fs.ensureFileSync(helpers.userHome() + '/.closet/.testing/from/test.txt');

	var removeTestingFile = function() {
		fs.removeSync(helpers.userHome() + '/.closet/.testing/to');
	}

	var someObject = {
		callback: function() {

		}
	};

	it("Should have the correct closet path", function() {
		expect(closet.path).toBe(closetPath);
	});

	it("Should put files into closet and callback when done", function(done) {
		removeTestingFile();

		spyOn(someObject, "callback");
		var skeleton = new Skeleton("test");
		skeleton.root = helpers.userHome() + '/.closet/.testing/to';
		skeleton.originalRoot = helpers.userHome() + '/.closet/.testing/from';
		skeleton.files = ["test.txt"];

		closet.put(skeleton, someObject.callback);

		expect(fs.existsSync(helpers.userHome() + '/.closet/.testing/to/test.txt')).toBe(true);
		expect(someObject.callback).toHaveBeenCalled();
		done();
		removeTestingFile();
	});
});