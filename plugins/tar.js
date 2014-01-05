var tarball = require("tarball-extract");
var createDirName = require("../lib/createDirName.js");

// I extract a Tar File! 
var extractTar = function (file, type, callback) {
    tarball.extractTarball(file, createDirName(type.dir), function(err){
        if(err) callback(err);
        callback(null, true);
    });
}

module.exports = extractTar;