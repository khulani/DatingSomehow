ActoExplaino.Views.OccurrenceView = Backbone.View.extend({
  template: JST['occurrences/occurrence_match'],

  initialize: function () {
    this.height = 0;
  },

  setHeight: function (height) {
    if (height < 5) {
      this.height = height;
    } else {
      this.height = 5;
    }
  },

  render: function () {
    var content = this.template({ occurrence: this.model });
    this.$el.html(content);
    this.$el.addClass('o-right');
    this.$el.height(this.height * 30);
    return this;
  }
});
