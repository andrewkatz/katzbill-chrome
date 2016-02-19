import DS from 'ember-data';
import ENV from 'katzbill-chrome/config/environment';

export default DS.RESTAdapter.extend({
  host: ENV.APP.apiURL,
  headers: {
    'Accept': 'application/json'
  },

  shouldReloadAll() {
    return false;
  }
});
