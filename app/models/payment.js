import Ember from 'ember';
import DS from 'ember-data';
import { memberAction } from 'ember-api-actions';

export default DS.Model.extend({
  name: DS.attr('string'),
  lastPaidDate: DS.attr('date'),
  nextPayDate: DS.attr('date'),
  url: DS.attr('string'),
  dueOn: DS.attr('number'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
  paymentType: DS.attr('string'),
  autopay: DS.attr('boolean'),

  daysLeft: Ember.computed('nextPayDate', function() {
    const now = moment().startOf('day');
    const nextPayDate = moment(this.get('nextPayDate')).startOf('day');

    if (now.isSame(nextPayDate, 'day')) {
      return 0;
    }

    if (nextPayDate.isAfter(now)) {
      return nextPayDate.diff(now, 'days');
    }

    return now.diff(nextPayDate, 'days');
  }),

  pay: memberAction({ path: 'pay', type: 'POST' })
});
