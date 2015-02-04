window.ActoExplaino = {
  Models: {},
  Collections: {},
  Routers: {},
  Views: {},

  initialize: function () {
    ActoExplaino.user = new ActoExplaino.Models.User();
    new ActoExplaino.Routers.Router({ $rootEl: $('#ActoExplaino') });
    Backbone.history.start();
  }
};

$(document).ready( function() {
  ActoExplaino.initialize();
});
