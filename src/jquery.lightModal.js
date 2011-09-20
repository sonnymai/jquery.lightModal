(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  (function($) {
    var methods;
    methods = {
      init: function(options) {
        return this.each(function() {
          var $this, data, modalContainer, self;
          self = this;
          $this = $(this);
          data = $this.data('lightModal');
          if ($this.attr('href')) {
            modalContainer = $this.attr('href');
          } else {
            modalContainer = '#some_container';
          }
          this.options = $.extend({
            modalContainer: modalContainer,
            width: 'auto',
            padding: 36,
            overlayDisable: true,
            overlayHtml: '<div class="light-modal-overlay"></div>'
          }, $this.data('lightModal') || {}, options || {});
          if (!data) {
            this.$modalContainer = $(this.options.modalContainer);
            this.$modalContainer.hide();
            this.$modalContainer.addClass('modal');
            if (this.options.width !== 'auto') {
              this.$modalContainer.width(this.options.width);
            }
            this.modalWidth = this.$modalContainer.width();
            this.$overlay = $(this.options.overlayHtml);
            return $this.click(function(e) {
              e.preventDefault();
              return $(this).lightModal('show');
            });
          }
        });
      },
      destroy: function() {
        return this.each(function() {
          var $this, data;
          $this = $(this);
          data = $this.data('lightModal');
          $(window).unbind('.lightModal');
          data.lightModal.remove();
          return $this.removeData('lightModal');
        });
      },
      show: function() {
        return this.each(function() {
          var $this;
          $this = $(this);
          this.$modalContainer.width(this.modalWidth - (this.options.padding * 2));
          this.$modalContainer.css('left', ($(window).width() - this.modalWidth) / 2 + 'px');
          this.$modalContainer.css('top', $(window).scrollTop() + 'px');
          this.$modalContainer.css('padding', this.options.padding + 'px');
          this.$overlay.appendTo('body').click(__bind(function(e) {
            e.preventDefault();
            if (this.options.overlayDisable) {
              return $this.lightModal('hide');
            }
          }, this));
          return this.$modalContainer.slideDown(200);
        });
      },
      hide: function() {
        return this.each(function() {
          var $this;
          $this = $(this);
          this.$modalContainer.slideUp(200);
          return this.$overlay.remove();
        });
      }
    };
    return $.fn.lightModal = function(method) {
      if (methods[method]) {
        return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
      } else if (typeof method === 'object' || !method) {
        return methods.init.apply(this, arguments);
      } else {
        return $.error('Method ' + method + ' does not exist on jQuery.lightModal');
      }
    };
  })(jQuery);
}).call(this);
