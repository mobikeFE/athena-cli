var assert = require('assert');
var path = require('path');
var fs = require('fs');

var utils = require('../util');

exports.create = function (payload) {
  assert(payload.componentName, 'api/components/create: payload should have componentName');
  
  const template = utils.getTemplate('components.create');
  const source = template(payload);
  
  const componentFilePath = path.join(payload.sourcePath, payload.componentFilePath);
  assert(!fs.existsSync(componentFilePath), 'api/components/create: file exists');
  
  utils.writeFile(componentFilePath, source);

  // auto creat css
  if (payload.css) {
    let cssFilePath = componentFilePath;
    const en = path.extname(componentFilePath);
    if (en) {
      cssFilePath = componentFilePath.slice(0, componentFilePath.lastIndexOf(en));
    }
    cssFilePath = cssFilePath + '.less';
    utils.writeFile(cssFilePath, `\r\n.${payload.componentName} {\r\n}\r\n`);
  }
}
