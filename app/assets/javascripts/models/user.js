ActoExplaino.Models.User = Backbone.Model.extend({
  url: 'user',

  parse: function (payload) {
    if (payload.activites) {
      this._activities = [];
    }
  }
});
