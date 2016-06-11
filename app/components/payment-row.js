import Ember from 'ember';

export default Ember.Component.extend({
  payment: null,
  reloadAction: null,

  classNames: ['row', 'payment-row'],
  classNameBindings: ['isBill:bill:paycheck'],
  windowManager: Ember.inject.service(),
  cookieMonster: Ember.inject.service(),
  isPaying: false,

  isBill: Ember.computed.equal('payment.paymentType', 'bill'),
  isPaycheck: Ember.computed.equal('payment.paymentType', 'paycheck'),

  friendlyDaysLeft: Ember.computed('payment.daysLeft', function() {
    const daysLeft = this.get('payment.daysLeft');

    if (daysLeft === 0) {
      return 'Today';
    }

    let daysString = `${daysLeft} day${daysLeft > 1 ? 's' : ''}`;

    if (moment().isAfter(moment(this.get('payment.nextPayDate')))) {
      daysString += ' ago';
    }

    return daysString;
  }),

  actions: {
    openURL() {
      const paymentId = this.get('payment.id');
      const paymentURL = this.get('payment.url');

      this.get('windowManager').openExternalTab(paymentURL, (tab) => {
        const cookieValue = `${paymentId}::::${tab.id}`;
        this.get('cookieMonster').setCookie('katzbill_pay', cookieValue);
      });
    },

    edit() {
      const paymentId = this.get('payment.id');
      this.get('windowManager').openInternalTab(`payments/${paymentId}/edit`);
    },

    pay() {
      this.set('isPaying', true);
      this.get('payment').pay().then(() => {
        this.sendAction('reloadAction');
      }).catch(() => {
        window.bootbox.alert('There was a problem updating this payment.');
      }).finally(() => {
        this.set('isPaying', false);
      });
    }
  }
});
