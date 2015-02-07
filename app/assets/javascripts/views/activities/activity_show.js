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
    var that = this;
    this.listenTo(this.model.occurrences(), 'add', function (occurrence) {
      that.addOccurrence(occurrence, true);
    });
    this.listenTo(this.model.occurrences(), 'remove', this.removeOccurrence);
    this.model.occurrences().each(function (occurrence) {
      that.addOccurrence(occurrence, true);
    });

    this.match = new ActoExplaino.Models.Activity();
    this._matchSubs = [];
    this.listenTo(this.match, 'sync', this.addMatch);

    this._ = [];
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

  addOccurrence: function (occurrence, editable) {
    this.listenTo(occurrence, 'change:date', this.reorderOccurrence);
    var occurrenceView = new ActoExplaino.Views.Occurrence({
      model: occurrence,
      editable: editable
    });
    this.addSubview('.occurrences', occurrenceView);
  },

  // addMatchOccurrence: function (occurrence) {
  //   var occurrenceMatchView = new ActoExplaino.Views.OccurrenceView({ model: occurrence });
  //   var reorder = []; // for displaying new created occurrences in the correct order
  //   if (_.last(this.subviews('.occurrences'))) {
  //     while (_.last(this.subviews('.occurrences')).model.get('date') > occurrence.get('date')) {
  //       reorder.push(this.subviews('.occurrences').pop().remove());
  //     }
  //     if (_.last(this.subviews('.occurrences')).model.get('date') != occurrence.get('date')) {
  //       var height = new Date(occurrence.get('date')) - new Date(_.last(this.subviews('.occurrences')).model.get('date'));
  //       if (height === 0){
  //         occurrenceMatchView.$el = $('#' + occurrence.get('date'));
  //       }
  //       occurrenceMatchView.setHeight(height / (3600 * 24 * 1000));
  //     }
  //   }
  //
  //   this._matchSubs.push(occurrenceMatchView);
  //   this.addSubview('.occurrences', occurrenceMatchView);
  //
  //   while (reorder.length > 0) {
  //     var last = reorder.pop();
  //     var height = new Date(last.model.get('date')) - new Date(_.last(this.subviews('.occurrences')).model.get('date'));
  //     last.setHeight(height / (3600 * 24 * 1000));
  //     this.addSubview('.occurrences', last);
  //   }
  // },

  removeOccurrence: function (occurrence) {
    var occurrenceView = _.find(
      this.subviews('.occurrences'),
      function (subview) {
        return subview.model === occurrence;
      }
    );
    this.removeSubview('.occurrences', occurrenceView);
  },

  reorderOccurrence: function (occurrence) {
    this.removeOccurrence(occurrence);
    this.addOccurrence(occurrence);
  },

  matchList: function() {
    var matches = this.model.get('matches')
    if (matches) {
      var content = this.matchTemplate({ matches: matches });
      this.$('#match-list').append(content);
    }
  },

  matchShow: function (event) {
    event.preventDefault();
    var that = this;
    this._matchSubs.forEach(function (matchSub) {
      that.removeSubview('.occurrences', matchSub);
    });
    this.$('.uneditable').remove();
    this._matchSubs = [];
    var title = $(event.currentTarget).data('title');
    this.$('#match-title').html(title);
    var id = $(event.currentTarget).data('id');
    this.match.set({ id: id });
    this.match.fetch();
  },

  addMatch: function () {
    var that = this;
    this.match.occurrences().each(function (occurrence) {
      that.addOccurrence(occurrence, false);
    });
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
  },

  renderTimeline: function () {

  }
})
