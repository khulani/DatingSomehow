ActoExplaino.Views.OccurrenceForm = Backbone.View.extend({
  tagName: 'form',
  template: JST['occurrences/form'],

  render: function () {
    var content = this.template({ occurrence: this.model });
    this.$el.html(content)
    return this;
  }
})
