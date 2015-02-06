ActoExplaino.Views.ActivityShow = Backbone.CompositeView.extend({
  template: JST['activities/show'],
  errTemplate: JST['shared/errors'],
  matchTemplate: JST['matches/matches'],

  initialize: function(options){
    this.user = options.user;
    if (this.user.id) {
      this.model.fetch();
    }
    this.listenTo(this.user, 'change', this.checkUser);

    this.listenTo(this.model, 'sync', this.render);

    this.listenTo(this.model.occurrences(), 'add', this.addOccurrence);
    this.listenTo(this.model.occurrences(), 'remove', this.removeOccurrence);
    this.model.occurrences().each(this.addOccurrence.bind(this));

    this.match = new ActoExplaino.Models.Activity();
    this.listenTo(this.match, 'sync', this.addMatch);
  },

  events: {
    'submit #add': 'createOccurrence',
    'click #match': 'matchShow'
  },

  checkUser: function () {
    if (this.user.id) {
      this.model.fetch();
      this.render();
    } else {
      this.$el.empty();
    }
  },

  createOccurrence: function (event) {
    var that = this;
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();
    var occurrence = new ActoExplaino.Models.Occurrence(formData);
    occurrence.save({},{
      success: function () {
        that.$el.find('form')[0].reset();
        that.$el.find('.errors').empty();
        that.model.occurrences().add(occurrence);
      },
      error: function (obj, errors) {
        that.renderErrors(errors.responseJSON['errors']);
      }
    });
  },

  addOccurrence: function (occurrence) {
    var reorder = []; // for displaying new created occurrences in the correct order
    if (_.last(this.subviews('.occurrences'))) {
      while (_.last(this.subviews('.occurrences')).model.get('date') > occurrence.get('date')) {
        reorder.push(this.subviews('.occurrences').pop().remove());
      }
    }

    var occurrenceView = new ActoExplaino.Views.OccurrenceAction({ model: occurrence });
    this.addSubview('.occurrences', occurrenceView);

    while (reorder.length > 0) {
      this.addSubview('.occurrences',reorder.pop());
    }
  },

  addMatchOccurrence: function (occurrence) {
    var reorder = []; // for displaying new created occurrences in the correct order
    if (_.last(this.subviews('.occurrences'))) {
      while (_.last(this.subviews('.occurrences')).model.get('date') > occurrence.get('date')) {
        reorder.push(this.subviews('.occurrences').pop().remove());
      }
    }

    var occurrenceMatchView = new ActoExplaino.Views.OccurrenceView({ model: occurrence });
    this.addSubview('.occurrences', occurrenceMatchView);

    while (reorder.length > 0) {
      this.addSubview('.occurrences',reorder.pop());
    }
  },

  removeOccurrence: function (occurrence) {
    var occurrenceView = _.find(
      this.subviews('.occurrences'),
      function (subview) {
        return subview.model === occurrence;
      }
    );
    this.removeSubview('.occurrences', occurrenceView);
  },

  matchList: function() {
    var matches = this.model.get('matches')
    if (matches) {
      var content = this.matchTemplate({ matches: matches });
      this.$('#match-list').append(content);
    }
  },

  matchShow: function (event) {
    if (this._currentMatch) {
      this._currentMatch && this._currentMatch.remove();
      this.removeSubview('#match-show', this._currentMatch);
    }
    event.preventDefault();
    var title = $(event.currentTarget).data('title');
    this.$('#match-title').html(title);
    var id = $(event.currentTarget).data('id');
    this.match.set({ id: id });
    this.match.fetch();
  },

  addMatch: function () {
    this.match.occurrences().each(this.addMatchOccurrence.bind(this));
  },

  render: function () {
    if (this.user.id) {
      var content = this.template({ activity: this.model });
      this.$el.html(content);
      this.$('#match-title').empty();
      this.matchList();
      this.attachSubviews();
    }
    return this;
  },

  renderErrors: function (errors) {
    var content = this.errTemplate({ errors: errors });
    this.$el.find('.errors').html(content);
  }
})
