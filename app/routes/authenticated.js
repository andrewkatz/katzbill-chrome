import Ember from 'ember';
import ENV from 'katzbill-chrome/config/environment';
import ajax from 'ic-ajax';

export default Ember.Route.extend({
  beforeModel() {
    return ajax(`${ENV.APP.apiURL}/me.json`)
    .then(() => {}, (error) => {
      if (error.jqXHR.status === 401) {
        this.transitionTo('unauthorized');
      }
    });
  }
});
