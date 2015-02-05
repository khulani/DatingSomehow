ActoExplaino.Views.MatchShow = Backbone.CompositeView.extend({
  template: JST['matches/show'],

  initialize: function (options) {;
    this.title = options.title;
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.occurrences(), 'add', this.addOccurrence);
    this.model.occurrences().each(this.addOccurrence.bind(this));
  },

  addOccurrence: function (occurrence) {
    var occurrenceView = new ActoExplaino.Views.OccurrenceView({ model: occurrence });
    this.addSubview('.occurrences', occurrenceView);
  },

  render: function () {
    var content = this.template({ title: this.title });;
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
