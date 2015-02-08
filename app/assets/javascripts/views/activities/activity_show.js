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

    this.listenTo($(document), 'resize', this.resize);
    // sets occurrence details to open on default
    this.open = false;
    // tracks if form is open or not
    this._form = false;
    this._timeline = 0;
    this._scroll = 0;
    this.scrolling;
  },

  events: {
    'click #add-submit': 'createOccurrence',
    'click #add-cancel': 'cancelForm',
    'click #match': 'matchShow',
    'mousemove .occurrences': 'updatePos',
    'dblclick .timeline': 'toggleAddForm',
    'click #activity-show': 'preventSelect',
    'mouseenter .scroll-down': 'scrollDown',
    'mouseleave .scroll-down': 'scrollStop',
    'mouseenter .scroll-up': 'scrollUp',
    'mouseleave .scroll-up': 'scrollStop',
  },

  remove: function () {
    Backbone.CompositeView.prototype.remove.call(this);
    clearInterval(this.scrolling);
  },

  scrollStop: function () {
    this._scroll = 0;
  },

  scrollUp: function () {
    this._scroll = -5;
  },

  scrollDown: function () {
    this._scroll = 5;
  },

  scroll: function () {
    this._timeline += this._scroll
    this.$('.occurrences').css('bottom', this._timeline);
  },

  resize: function () {
    debugger;
    this.$('.occurrences').css('height', $(window).height() * .6);
  },

  preventSelect: function (event) {
    event.preventDefault();
  },

  toggleAddForm: function () {
    var $form = this.$('.occurrence-new');
    // var $button = this.$('.open')
    if (this._form) {
      // $button.removeClass('pressed');
      $form.addClass('closed');
      this._form = false;
    } else {
      // $form.css('top', event.pageY - 55);
      $form.removeClass('closed');
      // $button.addClass('pressed');
      this._form = true;
    }
  },

  padStr: function (i) {
    return (i < 10) ? "0" + i : "" + i;
  },

  updatePos: function (event) {
    var $timeline;
    if ($(event.target).attr('id')) {
      $timeline = $(event.target)

    } else if ($(event.target.parentElement).attr('id')) {
      $timeline = $(event.target.parentElement);
    } else {
      $timeline = $(event.target.parentElement.parentElement);
    }
    var dateHigh = new Date($timeline.attr('id'));
    // console.log('dateHigh: ' + $timeline.attr('id'));
    // console.log('dateHigh: ' + dateHigh);
    var dateHigh;
    if ($timeline.next().attr('id')) {
      dateLow = new Date($timeline.next().attr('id'))
    //   console.log('dateLow: ' + $timeline.next().attr('id'));
    //   console.log('dateLow: ' + dateLow);
    } else {
      dateLow = dateHigh;
    }
    var height = parseFloat($timeline.css('height'));

    var pct = event.offsetY / height;
    // console.log(pct);

    var days = Math.round(pct * (dateHigh - dateLow) / (3600 * 24 * 1000));
    // console.log(days);
    dateHigh.setDate(dateHigh.getDate() - days + 1);
    var dateStr = dateHigh.getFullYear() + '-' + this.padStr(dateHigh.getMonth() + 1)
      + '-' + this.padStr(dateHigh.getDate());
    // console.log(dateStr);
    this.$('#new-date').val(dateStr);
    this.$('.occurrence-new').css('top', event.pageY - 55);
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
    var formData = $(event.target.parentElement).serializeJSON();
    var occurrence = new ActoExplaino.Models.Occurrence(formData);
    occurrence.save({},{
      success: function () {
        that.$el.find('form')[0].reset();
        that.$el.find('.errors').empty();
        that.open = true;
        that.model.occurrences().add(occurrence);
        that.toggleAddForm();
      },
      error: function (obj, errors) {
        that.renderErrors(errors.responseJSON['errors']);
      }
    });
  },

  cancelForm: function (event) {
    event.preventDefault();
    this.toggleAddForm();
  },

  addOccurrence: function (occurrence, editable) {
    this.listenTo(occurrence, 'change:date', this.reorderOccurrence);
    var occurrenceView = new ActoExplaino.Views.Occurrence({
      model: occurrence,
      editable: editable,
      open: this.open
    });
    this.addSubview('.occurrences', occurrenceView);
    this.open = false;
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

  reorderOccurrence: function (occurrence) {
    this.removeOccurrence(occurrence);
    this.open = true;
    this.addOccurrence(occurrence, true);
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
      this.$('.timeline-window').css('height', $(window).height() * .6);
      this.matchList();
      this.attachSubviews();
    }
    clearInterval(this.scrolling);
    var that = this;
    this.scrolling = setInterval(function() {
      that.scroll();
    }, 30);
    return this;
  },

  renderErrors: function (errors) {
    var content = this.errTemplate({ errors: errors });
    this.$el.find('.errors').html(content);
  }
})
