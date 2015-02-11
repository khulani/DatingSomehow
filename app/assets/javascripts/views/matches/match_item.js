ActoExplaino.Views.MatchItem = Backbone.View.extend({
  template: JST['matches/match'],

  events: {
    'click #cancel': 'cancel',
    'click .vote': 'vote'
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

    newVote.save({}, {
      success: function () {
        if (value > 0 ) {
          $voteButton.addClass('voted');
          $voteButton.next().removeClass('voted');
        } else {
          $voteButton.addClass('voted');
          $voteButton.prev().removeClass('voted');
        }
      }
    });
  },

  remove: function () {
    Backbone.View.prototype.remove.call(this);
    this.model.destroy();
  },

  render: function () {
    var content = this.template({ match: this.model });
    if (this.model.get('value') > 0 ) {
      this.$('vote-up').addClass('voted');
    } else if (this.model.get('vote_value') < 0){
      this.$('vote-down').addClass('voted');
    }
    this.$el.html(content);
    return this;
  }
});
