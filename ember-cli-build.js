/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
  });

  app.import('bower_components/bootstrap-sass/assets/javascripts/bootstrap.js');
  app.import('bower_components/js-cookie/src/js.cookie.js');
  app.import('bower_components/lodash/dist/lodash.js');
  app.import('bower_components/moment/min/moment-with-locales.js');
  app.import('bower_components/moment-timezone/builds/moment-timezone-with-data.js');
  app.import('bower_components/bootbox.js/bootbox.js');

  return app.toTree();
};
