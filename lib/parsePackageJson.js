var fs = require('fs');

var parsePackageJson = function (callback) {
    var file = 'package.json';

    fs.readFile(file, 'utf8', function (err, data) {
        if (err) {
            callback(err);
        }
        callback(null, JSON.parse(data));
    });
}

module.exports = parsePackageJson;