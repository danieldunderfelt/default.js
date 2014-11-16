class Skeleton {

	constructor() {
		this.name = "";
		this.files = [];
		this.usedIn = [];
		this.root = "";
		this.originalRoot = "";
	}

	add(file) {
		this.files.push(file.replace(process.cwd() + '/', ''));
	}
}

module.exports = Skeleton;