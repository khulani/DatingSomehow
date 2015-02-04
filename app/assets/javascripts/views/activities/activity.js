ActoExplaino.Views.Activity = Backbone.View.extend({
  tagName: 'li',
  template: JST['activities/activity'],

  events: {
    'click .delete': 'destroy'
  },

  destroy: function () {
    this.model.destroy();
  },

  render: function () {
    var content = this.template({ activity: this.model });
    this.$el.html(content);
    return this;
  }
})
