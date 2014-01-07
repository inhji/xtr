var tar     = require("./plugins/tar.js");
var bz2     = require("./plugins/bz2.js");
var zip     = require("./plugins/zip.js");
var z7      = require("./plugins/7z.js");

var types = [
/*    name: Str       ext: Str          regexp: RegexpObject              fn: function */
    { name: "tar",    ext: ".tar",      regexp: /.*\.{1}(tar)$/gi,        fn: tar },
    { name: "tgz",    ext: ".tar.gz",   regexp: /.*\.{1}(tar\.gz)$/gi,    fn: tar },
    { name: "tgz2",   ext: ".tgz",      regexp: /.*\.{1}(tgz)$/gi,        fn: tar },
    { name: "bz2",    ext: ".tar.bz2",  regexp: /.*\.{1}(tar\.bz2)$/gi,   fn: tar },
    { name: "zip",    ext: ".zip",      regexp: /.*\.{1}(zip)$/gi,        fn: zip },
    { name: "7z",     ext: ".7z",       regexp: /.*\.{1}(7z)$/gi,         fn: z7  }
];

module.exports = types;