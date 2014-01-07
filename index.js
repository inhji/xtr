#!/usr/bin/env node

// Modules
var child   = require("child_process");
var _       = require("underscore");
var colors  = require("colors");

// Lib
var parseFileExtension  = require(__dirname + "/lib/parseFileExtension.js");
var parsePackageJson    = require(__dirname + "/lib/parsePackageJson.js");

var filename = process.argv.slice(2)[0];
var type = parseFileExtension(filename);

var showHelp = function (version) {
    console.log('XTR'.green.bold + ' - '.green + 'extract archives (tar, tgz, bz2, zip, 7z)'.green);
    console.log('');
    console.log('   Version: '.green.bold);
    console.log('       ' + version.green);
    console.log('');
    console.log('   Usage:'.green.bold);
    console.log('       xtr [options] [filename]'.green);
    console.log('');
    console.log('   Options:'.green.bold);
    console.log('       no arguments,'.green);
    console.log('       -h, --help     output usage information'.green);
    console.log('       -v, --version  output the version number'.green);
    console.log('');
    console.log('   What it does:'.green.bold);
    console.log('       Extracts the file extensions listed below'.green);
    console.log('       to a directory with the following filename:'.green);
    console.log('       <filename>_<DD-MM-JJJJ>_<timestamp>'.green);
    console.log('');
    console.log('   Supported filetypes:'.green.bold);
    console.log('       .tar'.green);
    console.log('       .tar.gz'.green);
    console.log('       .tar.bz2'.green);
    console.log('       .zip'.green);
    console.log('       .7z'.green);
}

// Show help & exit
if ( !filename || filename === "-h" || filename === "--help" ) {
    parsePackageJson(function (err, data) {
        var ver = data.version;

        if (err) {
            console.log('Cannot read package.json:'.red.bold);
            console.log('  Error Number: '.red.bold + err.errno.toString().red);
            console.log('  Exitcode: '.red.bold + err.code.red);
            console.log('  Path: '.red.bold + err.path.red);
            process.exit(1);
        };
        showHelp(ver);
        process.exit(0);
    });
// Show version & exit
} else if ( filename === "-v" || filename === "--version" ) {
    parsePackageJson(function (err, data) {
        if (err) {
            process.exit(1);
        };
        console.log(data.version);
        process.exit(0);
    });
// Extract & show success message
} else {
    // Call extract function
    // params: filename, type, callback
    type.fn(filename, type, function (err, res) {
        if (err)
            console.log(err.red);
        var msg = "Directory created: " + type.dir.bold;
        console.log(msg.green);
    });
}
