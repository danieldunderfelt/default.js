function Skeleton(name = "New skeleton") {
	this.name = name;
	this.files = [];
	this.usedIn = [];
	this.root = "";
	this.originalRoot = "";
}

module.exports = Skeleton;