var tarball = require("tarball-extract");

// I extract a Tar File! 
var extractTar = function (file, type, callback) {
    tarball.extractTarball(file, type.dir, function(err){
        if(err) callback(err);
        callback(null, true);
    });
}

module.exports = extractTar;