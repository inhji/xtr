var assert = require("assert");
var should = require("should");

var createDirName       = require("../lib/createDirName.js");
var parseFileExtension  = require("../lib/parseFileExtension.js");

var types               = require("../lib/plugins.js");

describe("xtr", function () {
    describe("createDirName", function() {
        it("should return a string that matches the format <filename>_####-##-##_####", function () {
            createDirName("test").should.match(/\w{4}_\d{4}-\d{2}-\d{2}_\d{4}/gi);
        });
        it("should return false", function () {
            createDirName().should.equal(false); 
        });
    });

    describe("parseFileExtension", function() {
        it("should return an object with the properties name, ext, regexp and fn", function() {
            var object = parseFileExtension("file.zip");
            object.should.have.property("name");
            object.should.have.property("ext");
            object.should.have.property("regexp");
            object.should.have.property("fn");
        });
        it("should return false", function () {
            parseFileExtension("file.txt", types).should.equal(false);
        });
        it("should return false", function () {
            parseFileExtension("file.html", types).should.equal(false);
        });
        it("should return false", function () {
            parseFileExtension("file.exe", types).should.equal(false);
        });
        it("should return false", function () {
            parseFileExtension("file.tar.foo", types).should.equal(false);
        });
    });

});