import Ember from 'ember';
import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  keyForAttribute(attr) {
    return Ember.String.underscore(attr);
  },

  keyForRelationship(key, relationship) {
    key = this.keyForAttribute(key);

    if (relationship === 'hasMany') {
      return key.singularize() + '_ids';
    } else {
      return key + '_id';
    }
  }
});
