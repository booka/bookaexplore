(function($) {
    $.widget("ui.clip", {
        _init: function() {
            var clipId = this.element.attr('id').substring(5);
            var slot = $('<div class="slot ready">').slot({location : 'after' + clipId});
            this.element.append(slot);
        },

        destroy: function() {
            $.widget.prototype.apply(this, arguments); // default destroy
        }
    });
    $.extend($.ui.clip, {
        defaults: {
        }
    });
})(jQuery);
