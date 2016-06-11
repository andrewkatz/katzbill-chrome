import Ember from 'ember';
import ENV from 'katzbill-chrome/config/environment';

export default Ember.Service.extend({
  openInternalTab(path) {
    this.openTab(this.resolveURL(path, 'internal'));
  },

  openExternalTab(path, callback) {
    this.openTab(this.resolveURL(path, 'external'), callback);
  },

  openExtensionTab(path) {
    this.openTab(this.resolveURL(path, 'extension'));
  },

  openTab(url, callback) {
    chrome.tabs.create({ url: url }, callback);
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
