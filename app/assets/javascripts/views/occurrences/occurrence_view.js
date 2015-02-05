ActoExplaino.Views.OccurrenceView = Backbone.View.extend({
  template: JST['occurrences/occurrence_match'],

  render: function () {
    var content = this.template({ occurrence: this.model });
    this.$el.html(content);
    return this;
  }
});
