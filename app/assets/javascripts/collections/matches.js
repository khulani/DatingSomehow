ActoExplaino.Collections.Matches = Backbone.Collection.extend({
  model: ActoExplaino.Models.Match,

  url: function () {
    var url = '/matches'
    if (this.activity) {
      return 'api/activities/' + this.activity.id + url;
    } else {
      return 'api' + url;
    }
  },

  initialize: function(options) {
    this.activity = options.activity;
  }
});
