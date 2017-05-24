var assert = require('assert');
var path = require('path');
var fs = require('fs');

var utils = require('../util');

exports.create = function (payload) {
  assert(payload.namespace, 'api/models/create: payload should have namespace');
  
  // Get Template
  var template = utils.getTemplate('models.create');
  var source = template(payload);

  var modelFilePath = path.join(payload.sourcePath, payload.modelFilePath);
  
  assert(!fs.existsSync(modelFilePath), 'api/models/create: file exists');
  
  utils.writeFile(modelFilePath, source);

  //[TODO] update entry

}