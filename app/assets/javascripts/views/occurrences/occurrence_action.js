ActoExplaino.Views.Occurrence = Backbone.View.extend({
  template: JST['occurrences/occurrence'],
  formTemplate: JST['occurrences/form'],
  errTemplate: JST['shared/errors'],

  events: {
    'click .delete': 'destroy',
    'dblclick': 'edit',
    'submit #update': 'updateOccurrence'
  },

  destroy: function () {
    this.model.destroy();
  },

  edit: function () {
    var content = this.formTemplate({ occurrence: this.model });
    this.$el.html(content);
  },

  updateOccurrence: function (event) {
    var that = this;
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();
    this.model.save(formData, {
      success: function () {
        that.$el.find('form')[0].reset();
        that.$el.find('.errors-' + that.model.id).empty();
        that.render();
      },
      error: function (obj, errors) {
        that.renderErrors(errors.responseJSON['errors']);
      }
    });
  },

  render: function () {
    var content = this.template({ occurrence: this.model });
    this.$el.html(content);
    return this;
  },

  renderErrors: function (errors) {
    var content = this.errTemplate({ errors: errors });
    this.$el.find('.errors-' + this.model.id).html(content);
  }
})
