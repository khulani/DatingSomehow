ActoExplaino.Views.UserLogin = Backbone.View.extend({
  template: JST['users/login'],

  initialize: function () {
    this.listenTo(this.model, 'sync change', this.render);
  },

  events: {
    'submit form': 'signIn',
    'click #signout': 'signOut'
  },

  signIn: function (event) {
    var that = this;
    event.preventDefault();
    var loginData = $(event.currentTarget).serializeJSON();
    $.ajax({
      url: 'api/session',
      type: 'POST',
      data: loginData,
      success: function (user) {
        that.model.fetch();
      },
      error: function (errors) {
        that.render(errors.responseJSON['errors']);
      }
    });
  },

  signOut: function (event) {
    var that = this;
    $.ajax({
      url: 'api/session',
      type: 'DELETE',
      success: function () {
        debugger;
        that.model.fetch();
      }
    });
  },

  render: function (errors) {
    if (!Array.isArray(errors)) {
      (errors = []);
    }
    var content = this.template({ user: this.model, errors: errors });
    this.$el.html(content);
    return this;
  }
});
