ActoExplaino.Views.UserLogin = Backbone.View.extend({
  template: JST['users/login'],
  formTemplate: JST['users/form'],

  initialize: function () {
    this.listenTo(this.model, 'sync change', this.render);
  },

  events: {
    'submit form': 'signIn',
    'click #signout': 'signOut',
    'click #signup': 'signUp'
  },

  createUser: function () {

  },

  signUp: function (user) {
    if (!user.get('email')) {
      user = { email: '' };
    }
    var content = this.formTemplate({user: user});
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
        that.model.set(user);
        that.model.activities().set(user.activities);
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
        that.model.clear();
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
