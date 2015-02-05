ActoExplaino.Models.Activity = Backbone.Model.extend({
  urlRoot: 'api/activities',

  parse: function (payload) {

    if (payload.occurrences) {
      this.occurrences().set(payload.occurrences);
      delete payload.activities
    }
    return payload;
  },

  occurrences: function () {
    if (!this._occurrences) {
      this._occurrences = new ActoExplaino.Collections.Occurrences;
    }
    return this._occurrences;
  }
});
