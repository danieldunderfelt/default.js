var util = require('util');
var chalk = require('chalk');

module.exports = {

	skeletonExists: function() {
		print(chalk.bold.red("A skeleton with that name already exists!"), "✘");
		process.exit(1);
	},

	creating: function(name) {
		print(chalk.cyan("Creating skeleton with name " + name +"..."), "☠");
	},

	extending: function(extName) {
		print(chalk.cyan("Extending from skeleton " + extName + "..."), "✚");
	},

	done: function() {
		print(chalk.green("All done!"), "✔");
		process.exit();
	},

	error: function(err) {
		print(chalk.bold.red("Error!"), "✘");
		print(chalk.red("Here's the output if you're interested: "), "✘");
		util.debug(err.stack);
		process.exit(1);
	},

	fileTransfer: function(file) {
		print(chalk.dim("Added to skeleton: " + chalk.magenta(file)), "✚");
	},

	makeSkelFile: function() {
		print(chalk.cyan("Creating Skeletonfile..."), "✚");
	},

	closetCreated: function() {
		print(chalk.cyan("Closet and ignore file created!"), "✚");
	},
}

var print = function(message, symbol) {
	console.log(symbol + "    " + message);
}