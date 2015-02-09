ActoExplaino.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$login = options.$rootEl.find('#login');
    this.$side = options.$rootEl.find('#side');
    this.$main = options.$rootEl.find('#main');
  },

  routes: {
    '': 'index',
    'activities/:id': 'show'
  },

  index: function () {
    this._topRender();
    this._sideRender();
  },

  show: function (id) {
    if (ActoExplaino.user.id) {
      var activity = ActoExplaino.user.activities().getOrFetch(id);
      var activityView = new ActoExplaino.Views.ActivityShow({
        model: activity,
        user: ActoExplaino.user
      });
      this._swapView(activityView);
    } else {
      this._checkIndex(this.show.bind(this, id));
    }
  },

  _checkIndex: function (callback) {
    if (!this._topView) {
      this._topRender(callback);
    }
    if (!this._sideView) {
      this._sideRender();
    }
  },

  _topRender: function (view) {
    ActoExplaino.user.fetch({
      success: function () {
        if (view) {
          view();
        }
      }
    });
    this._topView && this._topView.remove();
    this._topView = new ActoExplaino.Views.UserLogin({
      model: ActoExplaino.user
    });
    this.$login.html(this._topView.render().$el);
  },

  _sideRender: function () {
    // ActoExplaino.user.fetch();
    this._sideView && this._sideView.remove();
    this._sideView = new ActoExplaino.Views.ActivityIndex({
      model: ActoExplaino.user
    });
    this.$side.html(this._sideView.render().$el);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this.$main.html(view.render().$el);
    this._currentView = view;
  }
});
