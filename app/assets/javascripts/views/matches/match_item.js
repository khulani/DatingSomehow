ActoExplaino.Views.MatchItem = Backbone.View.extend({
  template: JST['matches/match'],

  events: {
    'click #cancel': 'cancel',
    'click .vote': 'vote'
  },

  initialize: function (options) {
    this.top = options.top
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
        } else if (voted.get('value') < 0) {
          that.$('.vote-buttons button').removeClass('voted');
          $voteButton.addClass('voted');
        } else {
          that.$('.vote-buttons button').removeClass('voted');
        }
      }
    });
  },

  remove: function () {
    Backbone.View.prototype.remove.call(this);
    this.model.destroy();
  },

  render: function () {
    var content = this.template({ match: this.model, top: this.top });
    this.$el.html(content);
    if (this.model.get('vote_value') > 0 ) {
      this.$('.vote-up').addClass('voted');
    } else if (this.model.get('vote_value') < 0){
      this.$('.vote-down').addClass('voted');
    }
    return this;
  }
});
