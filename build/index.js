#! /usr/bin/env node
"use strict";

/**
 *
 * Get our dependencies
 *
 */

var pkg = require("../package.json");
var program = require("commander");
var chalk = require("chalk");
var path = require("path");
var fs = require("fs");
var helpers = require("./app/helpers");
var packageManager = require("./app/PackageManager");

/**
 *
 * Create the .closet folder if it doesn't exist
 *
 */

var closetPath = path.resolve(helpers.userHome(), ".closet");

if (!fs.existsSync(closetPath)) {
  fs.mkdirSync(closetPath);
}

/**
 *
 * Set up the CLI
 *
 */

program.version(pkg.version).usage("<commands> [options]").option("--dry", "Do a dry-run.");

program.command("create [name]").description("Create a new skeleton.").option("-e, --extend [skeleton]", "Base the new skeleton on an existing one.").action(packageManager.create.bind(packageManager));

program.command("add [file] [to skeleton]").description("Add a file to a skeleton.").action(packageManager.addFile.bind(packageManager));

program.command("duplicate [skeleton] [new-skeleton]").description("Duplicate an existing skeleton. It will be placed in your closet as a new skeleton.").action(packageManager.dupe.bind(packageManager));

program.command("deploy [skeleton...]").description("Deploy skeletons into the current working directory.").option("-t, --tinker [filename]", "Control freak mode. For each file, decide it's path manually.").action(packageManager.deploy.bind(packageManager));

program.parse(process.argv);

/**
 *
 * Fallbacks
 *
 */

if (!program.args.length) {
  program.help();
}