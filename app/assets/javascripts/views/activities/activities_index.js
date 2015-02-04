ActoExplaino.Views.ActivityIndex = Backbone.CompositeView.extend({
  template: JST['activities/index'],

  initialize: function () {
    this.listenTo(this.model, 'sync change', this.render);
    this.listenTo(this.model, 'destroy', this.remove)

    this.listenTo(this.model.activities(), 'add', this.addActivity);
    this.listenTo(this.model.activities(), 'remove', this.removeActivity);

    this.model.activities().each(this.addActivity.bind(this));
  },

  events: {
    'submit form': 'createActivity'
  },

  createActivity: function (event) {
    var that = this;
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();
    var activity = new ActoExplaino.Models.Activity(formData);
    activity.save({},{
      success: function () {
        that.$el.find('form')[0].reset();
        that.model.activities().add(activity);
      },
      error: function (obj, errors) {
        that.render(errors.responseJSON['errors']);
      }
    });
  },

  addActivity: function (activity) {
    var activityView = new ActoExplaino.Views.Activity({ model: activity });
    this.addSubview('.activities', activityView);
  },

  removeActivity: function (activity) {
    var activityView = _.find(
      this.subviews('.activities'),
      function (subview) {
        return subview.model === activity;
      }
    );
    this.removeSubview('.activities', activityView);
  },

  render: function (errors) {
    if (!Array.isArray(errors)) {
      (errors = []);
    }
    var content = this.template({ user: this.model, errors: errors});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
