import Ember from 'ember';
import ENV from 'katzbill-chrome/config/environment';
import ajax from 'ic-ajax';

export default Ember.Route.extend({
  beforeModel() {
    console.log('authenticated befor emodel');

    ajax(`${ENV.APP.apiURL}/me`, {
      accepts: 'json',
    })
    .catch((e) => {
      if (e.jqXHR.status === 401) {
        this.transitionTo('unauthorized');
      }
    });
  }
});
