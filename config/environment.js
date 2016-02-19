/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'katzbill-chrome',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    contentSecurityPolicy: {
      'connect-src': `'self' http://localhost:3000`,
      'style-src': `'self' http://fonts.googleapis.com`,
      'font-src': `'self' http://fonts.gstatic.com`
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.APP.apiURL = 'http://localhost:3000';
    ENV.APP.ssl = false;
    ENV.APP.cookieDomain = 'localhost';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.APP.apiURL = 'http://www.billsandstuff.com';
    ENV.APP.ssl = false;
    ENV.APP.cookieDomain = 'billsandstuff.com';
  }

  return ENV;
};
