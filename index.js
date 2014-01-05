#!/usr/bin/env node

// Modules
var child   = require("child_process");
var _       = require("underscore");
var colors  = require("colors");

var createDirName = require("./lib/createDirName.js");
var parseFileExtension = require("./lib/parseFileExtension.js");

// Plugins
var tar     = require("./plugins/tar.js");
var bz2     = require("./plugins/bz2.js");
var zip     = require("./plugins/zip.js");
var z7      = require("./plugins/7z.js");

// Types
var types = [
/*  Name: Str         ext: Str          regexp: RegexpObject              fn: function */
    { name: "tar",    ext: ".tar",      regexp: /.*\.{1}(tar)$/gi,        fn: tar },
    { name: "tgz",    ext: ".tar.gz",   regexp: /.*\.{1}(tar\.gz)$/gi,    fn: tar },
    { name: "tgz2",   ext: ".tgz",      regexp: /.*\.{1}(tgz)$/gi,        fn: tar },
    { name: "bz2",    ext: ".tar.bz2",  regexp: /.*\.{1}(tar\.bz2)$/gi,   fn: tar },
    { name: "zip",    ext: ".zip",      regexp: /.*\.{1}(zip)$/gi,        fn: zip },
    { name: "7z",     ext: ".7z",       regexp: /.*\.{1}(7z)$/gi,         fn: z7 }
];

var filename = process.argv.slice(2)[0];
var type = parseFileExtension(filename, types);

// Show help & exit
var showHelp = function () {
    console.log('XTR'.bold + ' - ' + 'extract archives (tar, tgz, bz2, zip, 7z)'.rainbow);
        console.log('');
        console.log('  Usage'.bold + ': xtr [options] [filename]');
        console.log('  ');
        console.log('    Options:');
        console.log('  ');
        console.log('      -h, --help     output usage information');
        console.log('      -V, --version  output the version number');
        console.log('');
        console.log('  What it does:'.bold);
        console.log('');
        console.log('    Extracts the file extensions listed below');
        console.log('    to a directory with the following filename:');
        console.log('    <filename>_<DD-MM-JJJJ>_<timestamp>');
        console.log('');
        console.log('  Supported filetypes:'.bold);
        console.log('');
        console.log('    .tar');
        console.log('    .tar.gz');
        console.log('    .tar.bz2');
        console.log('    .zip');
        console.log('    .7z');
        console.log('');
}

if (!filename) {
    showHelp();
    process.exit(0);
}

type.fn(filename, type), function (err, res) {
    if (err) {
        console.log(err.red);
    };
    console.log("File ".green + filename.green.bold + " successfully extracted to ".green + type.dir.green.bold + ".".green);
}
