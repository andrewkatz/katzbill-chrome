import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  payments: [],
  isLoading: false,
  classNames: ['row', 'payment-list'],

  groupedPayments: Ember.computed('payments.@each.nextPayDate', function() {
    const grouped = _.groupBy(this.get('payments').toArray(), function(payment) {
      return moment(payment.get('nextPayDate')).month();
    });

    const months = Object.keys(grouped);
    return _.map(months, function(month) {
      const payments = grouped[month];
      const firstPayment = payments[0];
      const nextPayDate = moment(firstPayment.get('nextPayDate'));

      let title;
      if (nextPayDate.month() === moment().month()) {
        title = 'This Month';
      } else {
        title = nextPayDate.format('MMMM');
      }

      return {
        title: title,
        payments: _.sortBy(payments, function(payment) {
          return moment(payment.get('nextPayDate'));
        })
      };
    });
  }),

  didInsertElement() {
    this._super();

    this.set('isLoading', true);
    Ember.run.later(() => { this.loadPayments(); }, 150);
  },

  loadPayments() {
    this.get('store').findAll('payment').then((payments) => {
      this.set('payments', payments);
    }).catch((e) => {
      console.log('error', e);
    }).finally(() => {
      this.set('isLoading', false);
    });
  },

  actions: {
    reloadPayments() {
      this.loadPayments();
    }
  }
});
