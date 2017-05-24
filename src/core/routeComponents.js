var assert = require('assert');
var path = require('path');
var fs = require('fs');

var utils = require('../util');

exports.create = function (payload) {
  assert(payload.routeComponentName, 'api/routeComponents/create: payload should have routeComponentName');
  
  const template = utils.getTemplate('routeComponents.create');
  const source = template(payload);
  
  const routeFilePath = path.join(payload.sourcePath, payload.routeFilePath);
  assert(!fs.existsSync(routeFilePath), 'api/routeComponents/create: file exists');
  
  utils.writeFile(routeFilePath, source);

  if (payload.css) {
    let cssFilePath = routeFilePath;
    const en = path.extname(routeFilePath);
    if (en) {
      cssFilePath = routeFilePath.slice(0, routeFilePath.lastIndexOf(en));
    }
    cssFilePath = cssFilePath + '.less';
    utils.writeFile(cssFilePath, `\r\n.${payload.routeComponentName} {\r\n}\r\n`);
  }
}