module.exports = function(remove, paths) {
	return paths.map(function(path) {
		return path.replace(remove + '/', '');
	});
};