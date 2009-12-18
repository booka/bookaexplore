(function($) {
    $.widget("ui.slot", {
        contentSelector : null,
        
        _init: function() {
            var self = this;
            self.contentSelector = $(self.options.contentSelector);
            self.element.addClass('slot');
            
            self.element.click(function() {
                self.selector(!$(this).hasClass('active'));
            });
        },

        selector : function(visible) {
            var element = this.element;
            if (visible) {
                element.addClass('active');
                this.contentSelector.hide().appendTo(element).slideDown();
            } else {
                this.contentSelector.slideUp(function() {
                    element.removeClass('active');
                });
            }
        },

        destroy: function() {
            $.widget.prototype.destroy.apply(this, arguments); // default destroy
        }


    });
    
    $.extend($.ui.slot, {
        defaults: {
            contentSelector : '<div class="contentSelector">Error</div>'
        }
    });
})(jQuery);
