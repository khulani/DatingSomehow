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
    var occurrenceView = new ActoExplaino.Views.Occurrence({ model: occurrence });
    this.addSubview('.occurrences', occurrenceView);
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
    this._currentMatch && this._currentMatch.remove();
    event.preventDefault();
    var id = $(event.currentTarget).data('id');
    var title = $(event.currentTarget).data('title');
    var matchActivity = new ActoExplaino.Models.Activity({ id: id });
    matchActivity.fetch();
    var matchShowView = new ActoExplaino.Views.MatchShow({
      model: matchActivity,
      title: title
    });
    this.addSubview('#match-show', matchShowView);
    this._currentMatch = matchShowView;
  },

  render: function () {
    if (this.user.id) {
      var content = this.template({ activity: this.model });
      this.$el.html(content);
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
