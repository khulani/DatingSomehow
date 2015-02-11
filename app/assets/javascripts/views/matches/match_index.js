ActoExplaino.Views.MatchShow = Backbone.CompositeView.extend({
  template: JST['matches/index'],

  initialize: function (options) {;
    this.title = options.title;
    this.listenTo(this.collection, 'sync', this.render);
    this.collections.each(this.addMatchItem.bind(this));
  },

  addMatchItem: function (occurrence) {
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
