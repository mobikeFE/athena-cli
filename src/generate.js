var path = require('path');
var fs = require('fs');

var upperCamelCase = require('simple-uppercamelcase');

var ast = require('./core/ast');
var log = require('./util/log');

var exports = module.exports = function(program, { cwd }) {
  var defaultBase = 'src';
  var base = program.base || defaultBase;
  var defaultEntry = `${base}/index.js`;
  var defaultRouter = `${base}/router.js`;

  var [type, name] = program.args;

  try {
    switch (type) {
      case 'all':
        (() => {
          var fileName = path.basename(name);
          var fileDir = path.dirname(name);

          // service
          var serviceFilePath = `${base}/services/${name}.js`;
          var serviceUpperName = upperCamelCase(name);
          
          // model
          var modelFilePath = `${base}/models/${name}.js`;
          var modelUpperName = upperCamelCase(name);

          // routeComponent
          var routeComponentName = upperCamelCase(name);
          var routeComponentPath = `${base}/routes/${routeComponentName}/${routeComponentName}.jsx`;
          var routeComponentCSSPath = `${base}/routes/${routeComponentName}/${routeComponentName}.less`;

          // component
          var componentName = upperCamelCase(name);
          var componentFilePath = path.join(`${base}/components`, fileDir, componentName, `${componentName}.jsx`);
          var componentCSSPath = path.join(`${base}/components`, fileDir, `${componentName}.less`);

          ast('all', {
            namespace: name,
            sourcePath: cwd,
            serviceFilePath,
            serviceUpperName,
            modelFilePath,
            modelUpperName,
            originName: name,
            routeFilePath: routeComponentPath,
            routeComponentName,
            componentName,
            componentFilePath,
            componentCSSPath,
            css: true
          });

        })();
        break;
      case 'service':
        (() => {
         
          var serviceFilePath = `${base}/services/${name}.js`;
          console.log('serviceFilePath:', serviceFilePath);

          var serviceUpperName = upperCamelCase(name);
          console.log('serviceUpperName', serviceUpperName);

          log.info('create', `service ${name}`);

          ast('services.create', {
            sourcePath: cwd,
            serviceFilePath,
            serviceUpperName
          });

        })();
        break;
      case 'model':
        (() => {
         
          var modelFilePath = `${base}/models/${name}.js`;
          console.log('modelFilePath:', modelFilePath);

          var modelUpperName = upperCamelCase(name);
          console.log('modelUpperName', modelUpperName);

          log.info('create', `model ${name}`);

          ast('models.create', {
            namespace: name,
            sourcePath: cwd,
            modelFilePath,
            modelUpperName
          });

        })();
        break;
      case 'route':
        (() => {
          var routeComponentName = upperCamelCase(name);
          var routeComponentPath = `${base}/routes/${routeComponentName}/${routeComponentName}.jsx`;
          var routeComponentCSSPath = `${base}/routes/${routeComponentName}/${routeComponentName}.less`;
          var withCSS = program.css ? `, ${routeComponentCSSPath}` : '';
          log.info('create', `routeComponent ${routeComponentPath}${withCSS}`);
          
          ast('routeComponents.create', {
            originName: name,
            sourcePath: cwd,
            routeFilePath: routeComponentPath,
            routeComponentName,
            css: program.css,
          });

          log.info('create', `route ${name} with ${routeComponentPath}`);

        })();
        break;
      case 'component':
        (() => {
          var fileName = path.basename(name);
          var fileDir = path.dirname(name);

          var componentName = upperCamelCase(fileName);
          console.log('componentName', componentName)

          var componentFilePath = path.join(`${base}/components`, fileDir, componentName, `${componentName}.jsx`);
          console.log('componentFilePath', componentFilePath);

          var componentCSSPath = path.join(`${base}/components`, fileDir, `${componentName}.less`);
          var withCSS = program.css ? `, ${componentCSSPath}` : '';
          
          log.info('create', `component ${componentFilePath}${withCSS}`);
          
          ast('components.create', {
            sourcePath: cwd,
            componentFilePath: componentFilePath,
            componentName,
            fileName,
            css: program.css
          });

        })();
        break;
      default:
        log.error(`ERROR: 不支持 type ${type}，目前只支持all、component、route、model`);
        break;
    }
  } catch (e) {
    log.error(e.stack);
  }
}