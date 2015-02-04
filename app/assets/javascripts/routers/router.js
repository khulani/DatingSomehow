ActoExplaino.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$login = options.$rootEl.find('#login');
    this.$side = options.$rootEl.find('#side');
    this.$main = options.$rootEl.find('#main');
  },

  routes: {
    '': 'index'
  },

  index: function () {
    ActoExplaino.user.fetch();
    this._topView && this._topView.remove();
    this._topView = new ActoExplaino.Views.UserLogin({
      model: ActoExplaino.user
    });
    this.$login.html(this._topView.render().$el);

    this._sideView && this._sideView.remove();
    this._sideView = new ActoExplaino.Views.ActivityIndex({
      model: ActoExplaino.user
    });
    this.$side.html(this._sideView.render().$el);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this.$rootEl.html(view.render().$el);
    this._currentView = view;
  }
});
