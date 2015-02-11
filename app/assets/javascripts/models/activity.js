ActoExplaino.Models.Activity = Backbone.Model.extend({
  urlRoot: 'api/activities',

  parse: function (payload) {

    if (payload.occurrences) {
      this.occurrences().set(payload.occurrences);
      delete payload.occurrences
    }
    if (payload.matches) {
      this.matches().set(payload.matches);
      delete payload.matches
    }
    return payload;
  },

  occurrences: function () {
    if (!this._occurrences) {
      this._occurrences = new ActoExplaino.Collections.Occurrences;
    }
    return this._occurrences;
  },

  matches: function () {
    if (!this._matches) {
      this._matches = new ActoExplaino.Collections.Matches([],{ activityId: this.id });
    }
    return this._matches;
  }
});
