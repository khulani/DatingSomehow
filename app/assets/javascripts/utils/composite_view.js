Backbone.CompositeView = Backbone.View.extend({
  addSubview: function (selector, subview) {
    this.subviews(selector).push(subview);
    // Try to attach the subview. Render it as a convenience.
    this.attachSubview(selector, subview.render());

  },

  attachSubview: function (selector, subview, callback) {
    // for sorting occurrences
    if (selector === '.occurrences') {
      var date = subview.model.get('date');
      var $element = $('<div class="timeline" id="' + date + '">');

      var added = false;
      if (this.$('#' + date).length) {
        $element = this.$('#' + date);
        this.$('#' + date).prepend(subview.$el);
        added = true;
      } else {
        $element.prepend(subview.$el);
      }

      var occurrences = this.$('.timeline');
      for (var i = 0; i < occurrences.length; i++) {
        var beforeDate = $(occurrences[i]).attr('id');
        if (date > beforeDate) {
          if (!added) {
            $(occurrences[i]).before($element);
            added = true;
          }
          var height = 20 + (Math.log(new Date(date) - new Date(beforeDate)) - 18)*35;
          $element.css('height', height);
          if (i>0) {
            var afterDate = $(occurrences[i-1]).attr('id');
            var height = 20 + (Math.log(new Date(afterDate) - new Date(date)) - 18)*35;
            $(occurrences[i-1]).css('height', height);
          }
          break;
        }
      }
      if (!added) {
        $element.css('height', 30);
        this.$(selector).append($element);
      }
    } else {
      this.$(selector).prepend(subview.$el);
    }
    // Bind events in case `subview` has previously been removed from
    // DOM.
    subview.delegateEvents();

    if (subview.attachSubviews) {
      subview.attachSubviews();
    }
  },

  attachSubviews: function () {
    // I decided I didn't want a function that renders ALL the
    // subviews together. Instead, I think:
    //
    // * The user of CompositeView should explicitly render the
    //   subview themself when they build the subview object.
    // * The subview should listenTo relevant events and re-render
    //   itself.
    //
    // All that is necessary is "attaching" the subview `$el`s to the
    // relevant points in the parent CompositeView.

    var view = this;
    _(this.subviews()).each(function (subviews, selector) {
      view.$(selector).empty();
      _(subviews).each(function (subview) {
        view.attachSubview(selector, subview);
      });
    });
  },

  remove: function () {
    Backbone.View.prototype.remove.call(this);
    _(this.subviews()).each(function (subviews) {
      _(subviews).each(function (subview) {
        subview.remove();
      });
    });
    return this;
  },

  removeSubview: function (selector, subview) {
    subview.remove();

    var subviews = this.subviews(selector);
    subviews.splice(subviews.indexOf(subview), 1);
  },

  subviews: function (selector) {
    // Map of selectors to subviews that live inside that selector.
    // Optionally pass a selector and I'll initialize/return an array
    // of subviews for the sel.
    this._subviews = this._subviews || {};

    if (!selector) {
      return this._subviews;
    } else {
      this._subviews[selector] = this._subviews[selector] || [];
      return this._subviews[selector];
    }
  }
});
