(function($) {
    $.widget("ui.slot", {
        _init: function() {
            var self = this;
            this.element.addClass('slot').addClass('ready').droppable({
                accept: '.newcontent',
                activeClass: 'armed',
                tolerance: 'touch',
                hoverClass: 'active',
                drop: function(event, ui) {
                    var contentType = ui.draggable.attr('id').substring(4);
                    var location = self.options.location;
                    self.options.drop(self.element, contentType, location);
                }
            });
        },

        destroy: function() {
            $.widget.prototype.destroy.apply(this, arguments); // default destroy
        }


    });
    
    $.extend($.ui.slot, {
        getter: "getID ",
        defaults: {
            drop : function(element, contentType, location) {
            }
        }
    });
})(jQuery);
