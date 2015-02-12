ActoExplaino.Collections.Matches = Backbone.Collection.extend({
  model: ActoExplaino.Models.Match,

  url: function () {
    var url = '/matches';
    if (this.activityId) {
      return 'api/activities/' + this.activityId + url;
    } else {
      return 'api' + url;
    }
  },

  initialize: function(stuff, options) {
    if (options) {
      this.activityId = options.activityId;
    }
  }

});
