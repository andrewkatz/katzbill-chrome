import Ember from 'ember';
import ENV from 'katzbill-chrome/config/environment';

export default Ember.Service.extend({
  getCookie(name, callback) {
    chrome.cookies.get({
      name: name,
      url: this.get('url')
    }, callback);
  },

  setCookie(name, value) {
    chrome.cookies.set({
      name: name,
      value: value,
      domain: ENV.APP.cookieDomain,
      url: this.get('url'),
      secure: ENV.APP.ssl
    });
  },

  removeCookie(name) {
    chrome.cookies.remove({
      name: name,
      url: this.get('url')
    });
  },

  url: Ember.computed('cookieOptions', function() {
    const cookieOptions = this.get('cookieOptions');
    return `http${(cookieOptions.secure ? 's' : '')}://${cookieOptions.domain}/`;
  }),

  cookieOptions: Ember.computed(function() {
    return {
      secure: ENV.APP.ssl,
      domain: ENV.APP.cookieDomain
    };
  })
});
