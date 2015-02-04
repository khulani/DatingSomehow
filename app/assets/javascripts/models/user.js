ActoExplaino.Models.User = Backbone.Model.extend({
  url: 'api/user',

  parse: function (payload) {

    if (payload.activities) {
      this.activities().set(payload.activities);
      delete payload.activities
    }
    return payload;
  },

  activities: function () {
    if (!this._activities) {
      this._activities = new ActoExplaino.Collections.Activities;
    }
    return this._activities;
  }
});
