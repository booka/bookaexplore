(function($) {
    $.widget("ui.browser", {
        _init: function() {
            this.element.load(this.options.documents_path, function() {
                $(this).find("h1>a").each(function() {
                    $(this).attr('href', '#' + $(this).attr('href'));
                })
            });
        },
        destroy: function() {
            $.widget.prototype.destroy.apply(this, arguments); // default destroy
        }
    });
    $.extend($.ui.browser, {
        getter: "length ", //for methods that are getters, not chainables
        defaults: {
            documents_path : null
        }
    });
})(jQuery);
