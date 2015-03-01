ActoExplaino.Views.MatchItem = Backbone.View.extend({
  template: JST['matches/match'],

  events: {
    'click #cancel': 'cancel',
    'click .vote': 'vote'
  },

  initialize: function (options) {
    this.top = options.top;
    this.user = options.user;
  },

  vote: function (event) {
    var $voteButton = $(event.currentTarget)
    var matching_id = $voteButton.data('matching-id');
    var matched_id = $voteButton.data('matched-id');
    var value = $voteButton.data('value');

    var newVote = new ActoExplaino.Models.Vote({
      matching_id: matching_id,
      matched_id: matched_id,
      value: value
    });

    var that = this;
    newVote.save({}, {
      success: function (voted) {
        if (voted.get('value') > 0 ) {
          that.$('.vote-buttons button').removeClass('voted');
          $voteButton.addClass('voted');

          var $ups = that.$('.up-count');
          var upCount = parseInt($ups.html());
          $ups.html(upCount + 1);

          if (that.model.get('vote_value') < 0) {
            var $downs = that.$('.down-count');
            var downCount = parseInt($downs.html());
            $downs.html(downCount - 1);
          }

        } else if (voted.get('value') < 0) {
          that.$('.vote-buttons button').removeClass('voted');
          $voteButton.addClass('voted');

          var $downs = that.$('.down-count');
          var downCount = parseInt($downs.html());
          $downs.html(downCount + 1);

          if (that.model.get('vote_value') > 0) {
            var $ups = that.$('.up-count');
            var upCount = parseInt($ups.html());
            $ups.html(upCount - 1);
          }

        } else {
          that.$('.vote-buttons button').removeClass('voted');
          if (that.model.get('vote_value') < 0) {
            var $downs = that.$('.down-count');
            var downCount = parseInt($downs.html());
            $downs.html(downCount - 1);
          } else if (that.model.get('vote_value') > 0) {
            var $ups = that.$('.up-count');
            var upCount = parseInt($ups.html());
            $ups.html(upCount - 1);
          }
        }
        that.model.set('vote_value', voted.get('value'));
      }
    });
  },

  remove: function () {
    Backbone.View.prototype.remove.call(this);
    this.model.destroy();
  },

  render: function () {
    var content = this.template({ match: this.model, top: this.top, user: this.user });
    this.$el.html(content);
    if (this.model.get('vote_value') > 0 ) {
      this.$('.vote-up').addClass('voted');
    } else if (this.model.get('vote_value') < 0){
      this.$('.vote-down').addClass('voted');
    }
    return this;
  }
});
