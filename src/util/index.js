var assert = require('assert');
var path = require('path');
var fs = require('fs');

var Handlebars = require('handlebars');
var fsextra = require('fs-extra');

exports.getTemplate = function (name) {
  // find template
  var filePath = path.join(__dirname, `../../template/${name}.handlebars`);
  assert(fs.existsSync(filePath), `getTemplate: file ${name} not fould`);
  
  var source = fs.readFileSync(filePath, 'utf-8');
  return Handlebars.compile(source);
}

exports.readFile = function (filePath) {
  return fs.readFileSync(filePath, 'utf-8');
}

exports.writeFile = function writeFile(filePath, source) {
  fsextra.outputFileSync(filePath, source, 'utf-8');
}

exports.removeFile = function removeFile(filePath) {
  fsextra.removeSync(filePath);
}

