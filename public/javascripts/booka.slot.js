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

        setEditor : function(html) {
            var target = this.element;
            target.slideUp().removeClass('ready').addClass('editor').html(html);
            $("form .actions a", target).click(function(event) {
                event.preventDefault();
                target.slideUp(function() {
                    target.removeClass('editor').addClass('ready').empty().slideDown()
                });
                return false;
            });
            $("form", target).submit(function() {
                $.post(this.action, $(this).serialize(), null, "script");
                return false;
            });
            target.slideDown('slow');
        },

        destroy: function() {
            $.widget.prototype.apply(this, arguments); // default destroy
        }
    });
    
    $.extend($.ui.slot, {
        defaults: {
            drop : function(element, contentType, location) {
            }
        }
    });
})(jQuery);
