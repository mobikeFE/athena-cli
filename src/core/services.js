var assert = require('assert');
var path = require('path');
var fs = require('fs');

var utils = require('../util');

exports.create = function (payload) {
  
  // Get Template
  var template = utils.getTemplate('services.create');
  var source = template(payload);

  var serviceFilePath = path.join(payload.sourcePath, payload.serviceFilePath);
  
  assert(!fs.existsSync(serviceFilePath), 'api/services.create: file exists');
  
  utils.writeFile(serviceFilePath, source);

}