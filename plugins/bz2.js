var exec = require("child_process").exec;

// I extract a Bz2 File!
var extractBz2 = function (file, type, callback) {
    var proc = exec("tar -xjf " + file + " -C " + type.dir, function (err, stdout, stderr) {
        if (err) {
            callback(new Error(stderr));
        };
    });

    proc.on("exit", function (code, sig) {
        if (code !== 0) {
            callback(new Error({code: code.toString, sig: sig}));
        };
        callback(null, true)
    });
}

module.exports = extractBz2;