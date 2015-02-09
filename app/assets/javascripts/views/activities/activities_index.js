ActoExplaino.Views.ActivityIndex = Backbone.CompositeView.extend({
  template: JST['activities/index'],
  errTemplate: JST['shared/errors'],

  initialize: function () {
    this.listenTo(this.model, 'sync change', this.render);
    // this.listenTo(this.model, 'destroy', this.remove)

    this.listenTo(this.model.activities(), 'set', this.addActivities);
    this.listenTo(this.model.activities(), 'add', this.addActivity);
    this.listenTo(this.model.activities(), 'remove', this.removeActivity);

    this.model.activities().each(this.addActivity.bind(this));
  },

  events: {
    'submit #new': 'createActivity',
    'click li': 'makeSelected'
  },

  createActivity: function (event) {
    var that = this;
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();
    var activity = new ActoExplaino.Models.Activity(formData);
    activity.save({},{
      success: function () {
        that.$el.find('form')[0].reset();
        that.$el.find('.errors').empty();
        that.model.activities().add(activity);
      },
      error: function (obj, errors) {
        that.renderErrors(errors.responseJSON['errors']);
      }
    });
  },

  makeSelected: function (event) {
    this.$('li').removeClass('active');
    $(event.currentTarget).addClass('active');
  },

  addActivity: function (activity) {
    var activityView = new ActoExplaino.Views.Activity({ model: activity });
    this.addSubview('.activities', activityView);
  },

  addActivities: function (){
    this.model.activities().each(this.addActivity.bind(this));
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
    var content = this.template({ user: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  renderErrors: function (errors) {
    var content = this.errTemplate({ errors: errors });
    this.$el.find('.errors').html(content);
  }
});
