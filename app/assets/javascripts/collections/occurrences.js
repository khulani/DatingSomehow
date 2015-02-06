ActoExplaino.Collections.Occurrences = Backbone.Collection.extend({
  url: 'api/occurrences',

  model: ActoExplaino.Models.Occurrence

  // comparator: function (occurrence){
  //   return -occurrence.get('date');
  // }
});
