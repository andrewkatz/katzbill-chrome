import Ember from 'ember';

const formatDate = function(dateString, options = {}) {
  const value = dateString;
  if (!value) {
    return '';
  }
  let dateFormat;

  if (options.date) {
    dateFormat = 'll';
  } else if (options.shortDatetime) {
    dateFormat = 'M/D/YY h:mma';
  } else if (options.monthDay) {
    dateFormat = 'MMMM D';
  } else {
    dateFormat = 'lll';
  }

  return moment(value).format(dateFormat);
};

export { formatDate };

export default Ember.Helper.helper(function(params, options) {
  return formatDate(params[0], options);
});
