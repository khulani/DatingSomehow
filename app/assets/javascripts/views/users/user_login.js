ActoExplaino.Views.UserLogin = Backbone.View.extend({
  template: JST['users/login'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
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
      url: 'session',
      type: 'POST',
      data: loginData,
      success: function (user) {
        that.model = new ActoExplaino.Models.User(user);
        that.render();
      },
      error: function (errors) {
        that.render(errors.responseJSON['errors']);
      }
    })
  },

  signOut: function (event) {
    var that = this;
    $.ajax({
      url: 'session',
      type: 'DELETE',
      success: function (user) {
        that.model = user;
        that.render();
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
