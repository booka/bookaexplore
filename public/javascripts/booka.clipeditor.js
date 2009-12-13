(function($) {
    $.widget("ui.clipeditor", {
        _init: function() {
            var self = this;
            var editor = this.element;
            editor.addClass('clip-editor').html(self.options.editor);
            $("form .actions a.cancel", editor).click(function(event) {
                self._remove();
                self.options.cancel();
                return false;
            });

            $("form", editor).submit(function() {
                $.post(this.action + '.js', $(this).serialize(), function(html) {
                    self._remove();
                    self.options.edit(html);
                }, "html");
                return false;
            });
            editor.slideDown('slow');
        },

        _remove : function() {
            var editor = this.element;
            editor.slideUp(function() {
                editor.remove();
            });
        },

        destroy: function() {
            $.widget.prototype.destroy.apply(this, arguments); // default destroy
        }
    });
    $.extend($.ui.clipeditor, {
        defaults: {        }
    });
})(jQuery);
