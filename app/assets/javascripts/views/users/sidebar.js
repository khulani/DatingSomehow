ActoExplaino.Views.Sidebar = Backbone.View.extend({
  template: JST['users/sidebar'],

  initialize: function (options) {;
    this.listenTo(this.model, 'sync change', this.checkUser.bind(this));
    this.personal = options.personal;
    this.$side = options.$side
  },

  events: {
    'click a.sidebar': 'updateSidebar'
  },

  checkUser: function () {
    if (this.personal && !this.model.id) {
      this.personal = false;
    }
    this.render();
  },

  updateSidebar: function () {
    if (this.personal) {
      this.personal = false;
      Backbone.history.navigate('/#/matches')
    } else {
      this.personal = true;
      Backbone.history.navigate('/#/activities')
    }
    this.render();
  },

  render: function () {
    this._sideView && this._sideView.remove();

    var content = this.template({ personal: this.personal, user: this.model });
    this.$el.html(content);

    if (this.personal) {
      this._sideView = new ActoExplaino.Views.ActivityIndex({
        model: ActoExplaino.user
      });
    } else {
      var matches = new ActoExplaino.Collections.Matches()
      matches.fetch();
      this._sideView = new ActoExplaino.Views.MatchIndex({
        collection: matches
      });
    }
    this.$el.append(this._sideView.render().$el);
    // this.$el.addClass('col-xs-2');

    return this;
  }
});
