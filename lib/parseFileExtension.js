var createDirName = require("./createDirName.js")

var parseFileExtension = function (file, types) {
    for (var i = 0; i < types.length; i++) {
        var type = types[i];

        if (type.regexp.test(file)) {
            // Add new property dir: extraction Output Directory
            var tempDirName = file.replace(type.ext, "", "gi")
            type.dir = createDirName(tempDirName);
            return type;
        };
    };
    return false;
}

module.exports = parseFileExtension;