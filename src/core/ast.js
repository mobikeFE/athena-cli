var assert = require('assert');
var path = require('path');
var fs = require('fs');

var async = require('async');

var models = require('./models');
var services = require('./services');
var components = require('./components');
var routeComponents = require('./routeComponents');
var routeForm = require('./routeForm');

var apiMap = {
  models,
  services,
  components,
  routeForm
};

var exports = module.exports = function(type, payload) {
    console.log('ast inner');
    console.log(arguments);

    assert(type, `api: type should be defined`);
    assert(payload.sourcePath, `api: payload should have sourcePath`);

    var cat = type.split('.')[0],
        method = type.split('.')[1];

    console.log('cat', cat);
    console.log('method', method);

    if (type == 'all') {
        async.parallel([
            function(callback) {
                services.create(payload)
                setTimeout(function() {
                    callback(null, 'services');
                }, 200);
            },
            function(callback) {
                models.create(payload)
                setTimeout(function() {
                    callback(null, 'models');
                }, 200);
            },
            function(callback) {
                components.create(payload)
                setTimeout(function() {
                    callback(null, 'components');
                }, 100);
            },
            function(callback) {
                routeComponents.create(payload)
                setTimeout(function() {
                    callback(null, 'routeComponents');
                }, 100);
            },
            function(callback) {
                routeForm.create(payload)
                setTimeout(function() {
                    callback(null, 'routeForm');
                }, 100);
            }
          ],
          function(err, results) {
              console.log('async.parallel');
              console.log(arguments);
          });
    } else {
      var fn = apiMap[cat][method];
      fn(payload);
    }
}