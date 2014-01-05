#!/usr/bin/env node

// Modules
var child   = require("child_process");
var _       = require("underscore");
var colors  = require("colors");
var fs      = require('fs');

// Plugins
var tar     = require("./plugins/tar.js");
var bz2     = require("./plugins/bz2.js");
var zip     = require("./plugins/zip.js");
var z7      = require("./plugins/7z.js");

// Lib
var createDirName       = require("./lib/createDirName.js");
var parseFileExtension  = require("./lib/parseFileExtension.js");

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

var parsePackageJson = function (callback) {
    var file = __dirname + '/package.json';

    fs.readFile(file, 'utf8', function (err, data) {
        if (err) {
            callback(err);
        }
     
        data = JSON.parse(data);
        //console.log(data);
        callback(null, data);
    });
}

// Show help & exit
if ( !filename || filename === "-h" || filename === "--help" ) {
    parsePackageJson(function (err, data) {
        if (err) {
            console.log('Cannot read package.json:'.red.bold);
            console.log('     Error Number: '.red.bold + err.errno.toString().red);
            console.log('     Exitcode: '.red.bold + err.code.red);
            console.log('     Path: '.red.bold + err.path.red);
            process.exit(1);
        };
        console.log('XTR'.green.bold + ' - '.green + 'extract archives (tar, tgz, bz2, zip, 7z)'.green);
        console.log('');
        console.log('   Version: '.green.bold);
        console.log('       ' + data.version.green);
        console.log('');
        console.log('   Usage:'.green.bold);
        console.log('       xtr [options] [filename]'.green);
        console.log('  ');
        console.log('   Options:'.green.bold);
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
        process.exit(0);
    });
// Show version & exit
} else if( filename === "-v" || filename === "--version" ) {
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
    // params: filename, type
    type.fn(filename, type, function (err, res) {
        if (err)
            console.log(err.red);
        var msg = "Directory created: " + type.dir.bold + "(" + type.ext + ")";
        console.log(msg.green);
    });
}
