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
          if (ActoExplaino.user.id === activity.get('user_id')) {
            activities.add(activity);
          }
        }
      });
    }
    return activity;
  }
});
