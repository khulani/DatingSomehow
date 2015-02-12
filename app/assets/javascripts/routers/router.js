ActoExplaino.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$login = options.$rootEl.find('#login');
    this.$side = options.$rootEl.find('#side');
    this.$main = options.$rootEl.find('#main');
  },

  routes: {
    '': 'index',
    'activities': 'activities',
    'activities/:id': 'show',
    'activities/:matching/matches/:matched': 'showMatch',
    'matches': 'matches'
  },

  index: function () {
    this._topRender();
    this._sideRender(true);
  },

  show: function (id) {
    if (!ActoExplaino.user.id) {
      this._checkIndex(true, this.show.bind(this, id));
    } else {
      var activity = ActoExplaino.user.activities().getOrFetch(id);
      var activityView = new ActoExplaino.Views.ActivityShow({
        model: activity,
        user: ActoExplaino.user
      });
      this._swapView(activityView);
    }
  },

  showMatch: function (matching, matched) {
    this._checkIndex();
    var matchingAct = new ActoExplaino.Models.Activity({ id: matching });
    matchingAct.fetch();
    var matchedAct = new ActoExplaino.Models.Activity({ id: matched });
    matchedAct.fetch();
    var matchView = new ActoExplaino.Views.ActivityShow({
      model: matchingAct,
      match: matchedAct,
      user: ActoExplaino.user
    });
    this._swapView(matchView);
  },

  activities: function () {
    this._checkIndex(true);
  },

  matches: function () {
    this._checkIndex();
  },

  _checkIndex: function (personal, callback) {
    if (!this._topView) {
      this._topRender(callback);
    }
    if (!this._sideView) {
      this._sideRender(personal);
    }
  },

  _topRender: function (view) {
    var that = this;
    ActoExplaino.user.fetch({
      success: function () {
        if (view) {
          view();
        }
        // that._sideRender();
      }
    });
    this._topView && this._topView.remove();
    this._topView = new ActoExplaino.Views.UserLogin({
      model: ActoExplaino.user
    });
    this.$login.html(this._topView.render().$el);
  },

  _sideRender: function (personal) {
    this._sideView && this._sideView.remove();
    if (personal && ActoExplaino.user.id) {
      personal = true;
    }
    this._sideView = new ActoExplaino.Views.Sidebar({
      model: ActoExplaino.user,
      personal: personal
    });
    this.$side.append(this._sideView.render().$el);
  },

  // _sideRender: function () {
  //   if (!this._topView) {
  //     this._topRender(this._sideRender.bind(this));
  //   }
  //   // ActoExplaino.user.fetch();
  //   this._sideView && this._sideView.remove();
  //
  //   if (ActoExplaino.user.id) {
  //     this._sideView = new ActoExplaino.Views.ActivityIndex({
  //       model: ActoExplaino.user
  //     });
  //   } else {
  //     var matches = new ActoExplaino.Collections.Matches()
  //     matches.fetch();
  //     this._sideView = new ActoExplaino.Views.MatchIndex({
  //       collection: matches
  //     });
  //   }
  //   this.$side.html(this._sideView.render().$el);
  // },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this.$main.html(view.render().$el);
    this._currentView = view;
  }
});
