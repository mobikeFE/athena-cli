var assert = require('assert');
var path = require('path');
var fs = require('fs');

var utils = require('../util');

exports.create = function (payload) {
  assert(payload.routeComponentName, 'api/routeForm/create: payload should have routeComponentName');
  
  const template = utils.getTemplate('routeForm.create');
  const source = template(payload);
  
  const routeFormPath = path.join(payload.sourcePath, payload.routeFormPath);
  assert(!fs.existsSync(routeFormPath), 'api/routeForm/create: file exists');
  
  utils.writeFile(routeFormPath, source);
}