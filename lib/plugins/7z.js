var exec         = require("child_process").exec;

// I extract a 7z File!
var extract7z = function (file, type, callback) {
    var proc = exec("7z e " + file + " -o" + type.dir, function (err, stdout, stderr) {
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

module.exports = extract7z;