import Ember from 'ember';

export default Ember.Route.extend({
  windowManager: Ember.inject.service(),

  actions: {
    signIn() {
      this.get('windowManager').openInternalTab('users/sign_in');
    }
  }
});
