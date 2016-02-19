import Ember from 'ember';

export default Ember.Component.extend({
  payment: null,

  cookieMonster: Ember.inject.service(),
  isPaying: false,

  actions: {
    no() {
      window.close();
    },

    yes() {
      this.set('isPaying', true);
      this.get('payment').pay().then(() => {
        this.get('cookieMonster').removeCookie('katzbill_pay');
        window.close();
      }).catch(() => {
        window.bootbox.alert('There was a problem updating this payment.');
      }).finally(() => {
        this.set('isPaying', false);
      });
    }
  }
});
