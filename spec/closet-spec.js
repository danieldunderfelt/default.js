var closet = require('../build/app/Closet');
var Skeleton = require('../build/app/Skeleton');
var helpers = require('../build/app/helpers');


describe("Closet", function() {

	var closetPath = helpers.userHome() + '/.closet';

	it("Should have the correct closet path", function() {
		expect(closet.path).toBe(closetPath, "Closet path is correct.");
	});
});