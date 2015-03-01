ActoExplaino.Views.MatchIndex = Backbone.CompositeView.extend({
  template: JST['matches/index'],

  initialize: function (options) {
    this.listenTo(this.collection, 'sync', this.updateSubs);
    this.collection.each(this.addMatchItem.bind(this));
    this.user = options.user;
  },

  updateSubs: function () {
    this.collection.each(this.addMatchItem.bind(this));
  },

  addMatchItem: function (match) {
    var matchItem = new ActoExplaino.Views.MatchItem({ model: match, top: true, user: this.user });
    this.addSubview('.matches', matchItem);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();

    return this;
  }
});
