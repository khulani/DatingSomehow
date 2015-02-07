ActoExplaino.Views.Occurrence = Backbone.View.extend({
  template: JST['occurrences/occurrence'],
  templateEdit: JST['occurrences/occurrence_edit'],
  formTemplate: JST['occurrences/form'],
  errTemplate: JST['shared/errors'],

  initialize: function (options) {
    this.height = 0;
    this.editable = options.editable;
    this.details = false;
  },

  events: {
    'click .delete': 'destroy',
    'click .open': 'toggleDetails',
    'dblclick .occurrence': 'edit',
    'submit #update': 'updateOccurrence',
    'mouseenter .open': 'openDetails',
    'mouseleave .open': 'closeDetails'
  },

  setHeight: function (height) {
    if (height < 5) {
      this.height = height;
    } else {
      this.height = 5;
    }
  },

  destroy: function () {
    if (this.editable) {
      this.model.destroy();
    }
  },

  toggleDetails: function () {
    // debugger;
    // $('#' + this.model.id).dialog('open');
    var $details = this.$('.occurrence');
    if (this.details) {
      var $details = this.$('.opened');
      $details.removeClass('opened');
      $details.addClass('closed');
      this.details = false;
    } else {
      var $details = this.$('.closed');
      $details.removeClass('closed');
      $details.addClass('opened');
      this.details = true;
    }
  },

  openDetails: function () {
    var $details = this.$('.occurrence');
    $details.removeClass('closed');
    $details.addClass('opened');
    $details.addClass('focus');
  },

  closeDetails: function () {
    var $details = this.$('.occurrence');
    if (!this.details) {
      $details.removeClass('opened');
      $details.addClass('closed');
    }
    $details.removeClass('focus');
  },

  edit: function () {
    if (this.editable) {
      var content = this.formTemplate({ occurrence: this.model });
      this.$el.html(content);
    }
  },

  updateOccurrence: function (event) {
    if (this.editable) {
      var that = this;
      event.preventDefault();
      var formData = $(event.currentTarget).serializeJSON();
      this.model.save(formData, {
        success: function () {
          that.$el.find('form')[0].reset();
          that.$el.find('.errors-' + that.model.id).empty();
          that.render();
        },
        error: function (obj, errors) {
          that.renderErrors(errors.responseJSON['errors']);
        }
      });
    }
  },

  remove: function () {
    Backbone.View.prototype.remove.call(this);
    if (this.editable){
      this.$('editable').empty();
    } else {
      this.$('uneditable').empty();
    }
  },

  render: function () {
    if (this.editable) {
      var content = this.templateEdit({ occurrence: this.model });
      this.$el.addClass('editable')
    } else {
      var content = this.template({ occurrence: this.model });
      this.$el.addClass('uneditable')
    }
    this.$el.html(content);
    //       this.$el.height(60 + this.height * 30);
    // this.$('div').attr('id', this.model.id);
    // this.$('.occurrence').dialog({
    //   autoOpen: false,
    // });

    return this;
  },

  renderErrors: function (errors) {
    var content = this.errTemplate({ errors: errors });
    this.$el.find('.errors-' + this.model.id).html(content);
  }
})
