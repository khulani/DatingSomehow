ActoExplaino.Collections.Activities = Backbone.Collection.extend({
  url: 'api/activites',

  model: ActoExplaino.Models.Activity,

  getOrFetch: function (id) {
    var activities = this;
    var activity = this.get(id);
    if (activity) {
      activity.fetch();
    } else {
      activity = new ActoExplaino.Models.Activity({ id: id });
      activity.fetch({
        success: function () {
          activities.add(activity);
        }
      });
    }
    return activity;
  }
});
