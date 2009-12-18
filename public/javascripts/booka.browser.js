(function($) {
    $.widget("ui.browser", {
        currentPath : null,

        
        _init: function() {
            var self = this;
            $(window).bind( 'hashchange', function(e) {
                var fragment = $.param.fragment();
                if (/^\/archives$/.test(fragment)) {
                    $.bbq.pushState("#/archives/all");
                }
                if (/^\/archives\/all/.test(fragment)) {
                    // FIXME: extract all ... etcétera
                    var path = 'all';
                    if (path != self.currentPath) {
                        self.currentPath = path;
                        self._loadDocuments();
                    }
                }
            });
        },

        _loadDocuments : function() {
            var self = this;
            this.element.load(this.options.documents_path, function() {
                $("h1>a", this.element).each(function() {
                    $(this).attr('href', '#/archives/' + self.currentPath + $(this).attr('href'));
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
