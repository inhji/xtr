var createDirName = function (filename) {
   var date = new Date();
   var len = date.getTime().toString().length;
   return filename + "_" + date.toISOString().substr(0, 10) + "_" + date.getTime().toString().substr(len - 4, len);
}

module.exports = createDirName;