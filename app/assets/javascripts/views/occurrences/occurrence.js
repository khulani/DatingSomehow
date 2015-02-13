ActoExplaino.Views.Occurrence = Backbone.View.extend({
  template: JST['occurrences/occurrence'],
  templateEdit: JST['occurrences/occurrence_edit'],
  formTemplate: JST['occurrences/form'],
  errTemplate: JST['shared/errors'],

  initialize: function (options) {
    this.height = 0;
    this.editable = options.editable;
    this.comparing = options.comparing;
    if (options.open) {
      this.open = options.open;
    } else {
      this.open = false;
    }
    this.editing = false;
  },

  events: {
    'click button.delete': 'destroy',
    'click .open': 'toggleDetails',
    'dblclick .occurrence': 'edit',
    'click button#update': 'updateOccurrence',
    'mouseenter .open': 'openDetails',
    'mouseleave .open': 'closeDetails',
    'click #cancel': 'cancel'
  },

  setEditable: function (editable) {
    this.editable = editable;
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

  isOpen: function () {
    return this.open;
  },

  toggleDetails: function () {
    // debugger;
    // $('#' + this.model.id).dialog('open');
    var $details = this.$('.occurrence');
    var $button = this.$('.open')
    if (this.open) {
      $button.removeClass('pressed');
      $details.addClass('closed');
      this.open = false;
    } else {
      $details.removeClass('closed');
      $button.addClass('pressed');
      this.open = true;
    }
  },

  openDetails: function () {
    var $details = this.$('.occurrence');
    $details.removeClass('closed');
    $details.addClass('focus');
  },

  closeDetails: function () {
    var $details = this.$('.occurrence');
    if (!this.open) {
      $details.addClass('closed');
    }
    $details.removeClass('focus');
  },

  edit: function (event) {
    event.stopPropagation();
    if (this.editable) {
      if (!this.editing) {
        var content = this.formTemplate({ occurrence: this.model });
        this.$('.edit-form').html(content);
        this.editing = true;
      }
    }
  },

  cancel: function (event) {
    event.preventDefault();
    this.render();
    this.editing = false;
  },

  updateOccurrence: function (event) {
    if (this.editable) {
      var that = this;
      event.preventDefault();
      var formData = $(event.currentTarget.parentElement).serializeJSON();
      this.model.save(formData, {
        success: function () {
          // that.$el.find('.errors-' + that.model.id).empty();
          that.editing = false;
          that.render();
        },
        error: function (obj, errors) {
          that.renderErrors(errors.responseJSON['errors']);
        }
      });
    }
  },

  remove: function () {
    // if (this.comparing){
    //   this.$('.right-side').empty();
    // } else {
    //   this.$('.left-side').empty();
    // }
    Backbone.View.prototype.remove.call(this);
  },

  render: function () {
    var content;
    if (this.comparing) {
      content = this.template({ occurrence: this.model });
      this.$el.addClass('right-side')
    } else {
      content = this.templateEdit({ occurrence: this.model, editable: this.editable });
      this.$el.addClass('left-side')
    }

    this.$el.html(content);

    if (this.open) {
      this.$('.occurrence').removeClass('closed');
      this.$('.open').addClass('pressed');
    }

    this.editing = false;

    return this;
  },

  renderErrors: function (errors) {
    var content = this.errTemplate({ errors: errors });
    this.$el.find('#errors-' + this.model.id).html(content);
  }
})
