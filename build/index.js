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
var fs = require("fs-extra");
var helpers = require("./app/helpers");
var packageManager = require("./app/PackageManager");

/**
 *
 * Create the .closet folder and the ignore file if they don't exist
 *
 */

var closetPath = path.resolve(helpers.userHome(), ".closet");

if (!fs.existsSync(closetPath)) {
  var data = fs.readFileSync(path.resolve(__dirname, "../data/.skeleton-ignore"));
  fs.outputFileSync(closetPath + "/.skeleton-ignore", data);
}


/**
 *
 * Set up the CLI
 *
 */

program.version(pkg.version).usage("<commands> [options]").option("--dry", "Do a dry-run.");

program.command("create [name]").description("Create a new skeleton.").option("-e, --extend [skeleton]", "Base the new skeleton on an existing one.").action(packageManager.create.bind(packageManager));

program.command("add [file] [toSkeleton]").description("Add a file to a skeleton.").action(packageManager.addFile);

program.command("deploy [projectName] [skeleton...]").description("Deploy skeletons into the current working directory.").option("-t, --tinker [filename]", "Control freak mode. For each file, decide it's new path manually.").action(packageManager.deploy);

program.parse(process.argv);

/**
 *
 * Fallback to help display
 *
 */

if (!program.args.length) {
  program.help();
}