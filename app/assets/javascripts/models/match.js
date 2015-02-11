ActoExplaino.Models.Match = Backbone.Model.extend({
  urlRoot: 'api/matches/',

  // parse: function (payload) {
  //
  //   if (payload.vote) {
  //     this.vote.set(payload.vote);
  //     delete payload.vote
  //   }
  //   return payload;
  // },
  //
  // vote: function () {
  //   if (!this._vote) {
  //     this._vote = new ActoExplaino.Models.Vote();
  //   }
  //   return this._vote;
  // }

});
