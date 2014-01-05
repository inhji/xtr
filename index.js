#!/usr/bin/env node
console.log("xtr here!");

var child   = require("child_process");
var _       = require("underscore");

// Plugins
var tar     = require("./plugins/tar.js");

var extractBz2 = function () {
    console.log("I extract a Bz2 File!");
}

var extractZip = function () {
    console.log("I extract a Zip File!");
}

var extract7z = function () {
    console.log("I extract a 7z File!");
}

var types = [
/*  Name: Str         ext: Str          regexp: RegexpObject              fn: function      */
    { name: "tar",    ext: ".tar",      regexp: /.*\.{1}(tar)$/gi,        fn: tar },
    { name: "tgz",    ext: ".tar.gz",   regexp: /.*\.{1}(tar\.gz)$/gi,    fn: tar },
    { name: "tgz2",   ext: ".tgz",      regexp: /.*\.{1}(tgz)$/gi,        fn: tar },
    { name: "bz2",    ext: ".tar.bz",   regexp: /.*\.{1}(tar\.bz2)$/gi,   fn: extractBz2 },
    { name: "zip",    ext: ".zip",      regexp: /.*\.{1}(zip)$/gi,        fn: extractZip },
    { name: "7z",     ext: ".7z",       regexp: /.*\.{1}(7z)$/gi,         fn: extract7z }
]; 

var args = process.argv.slice(2);
console.log(args);

var filename = args[0];
var dirname  = "";

var parseFileExtension = function (file) {
    for (var i = 0; i < types.length; i++) {
        var type = types[i];

        // Add new property dir: extract Output Directory
        type.dir = file.replace(type.ext, "", "gi");

        if (type.regexp.test(file)) {
            return type;
        };
    };
    return false;
}

var callExtractFn = function (file, type, callback) {
    console.log(file, type);
    type.fn(file, type, function (err, res) {
        callback(err, res);
    });
}

var type = parseFileExtension(filename);
callExtractFn(filename, type, function (err, res) {
    console.log(err, res);
});



/*
var extractZip = function (filename, callback) {
    // body...
}

var extractTgz = function (filename, callback) {
    // body...
}

var extractTar = function (filename, callback) {
    if (!filename)
        callback(new Error("No filename given"));

    tarball.extractTarball(filename, dirname, function(err){
        if(err) 
            callback(err);
        callback(null, true);
    });
}

var extractBz2 = function (filename, callback) {
    // body...
}
*/
