ActoExplaino.Views.Activity = Backbone.View.extend({
  tagName: 'li',
  template: JST['activities/activity'],
  formTemplate: JST['activities/form'],
  errTemplate: JST['shared/errors'],

  events: {
    'click .delete': 'destroy',
    'dblclick': 'edit',
    'submit #update': 'updateActivity'
  },

  edit: function () {
    var content = this.formTemplate({ activity: this.model });
    this.$el.html(content);
  },

  updateActivity: function (event) {
    var that = this;
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();
    this.model.save(formData, {
      success: function () {
        that.$el.find('form')[0].reset();
        that.$el.find('.errors').empty();
        that.render();
      },
      error: function (obj, errors) {
        that.renderErrors(errors.responseJSON['errors']);
      }
    });
  },

  destroy: function () {
    this.model.destroy();
  },

  render: function () {
    var content = this.template({ activity: this.model });
    this.$el.html(content);
    return this;
  },

  renderErrors: function (errors) {
    var content = this.errTemplate({ errors: errors });
    this.$el.find('.errors').html(content);
  }
});
