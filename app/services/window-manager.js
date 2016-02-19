import Ember from 'ember';
import ENV from 'katzbill-chrome/config/environment';

export default Ember.Service.extend({
  isChrome: Ember.computed(function() {
    return Ember.isPresent(chrome.create);
  }),

  openInternalTab(path) {
    this.openTab(this.resolveURL(path, 'internal'));
  },

  openExternalTab(path) {
    this.openTab(this.resolveURL(path, 'external'));
  },

  openExtensionTab(path) {
    this.openTab(this.resolveURL(path, 'extension'));
  },

  openTab(url) {
    if (this.get('isChrome')) {
      chrome.tabs.create({ url: url });
    } else {
      window.open(url);
    }
  },

  resolveURL(path, urlType) {
    switch (urlType) {
      case 'external':
        return path;
      case 'internal':
        return `${ENV.APP.apiURL}/${path}`;
      case 'extension':
        const extensionURL = chrome.extension.getURL('index.html');
        return `${extensionURL}?#/${path}`;
    }
  }
});
