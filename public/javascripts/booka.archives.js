(function($) {
    $.widget("ui.archives", {
        document : null,
        browser: null,
        tools : null,
        active : false,
        
        // options: provided by framework
        // element: provided by framework
        _init: function() {
            var self = this;
            $(window).bind( 'hashchange', function(e) {
                var fragment = $.param.fragment();
                if(/^\/archives/.test(fragment)) {
                    if (!self.active) {
                        self.element.empty();
                        self.element.append(self.document).append(self.browser).append(self.tools);
                        self.active = true;
                    }
                } else {
                    if (self.active) {
                        self.element.empty();
                        this.active = false;
                    }
                }
            });

            self.document = $('<div class="content document" />').document();
            self.browser = $('<div class="explorer browser" />').browser({
                documents_path :this.options.documents_path
            });
            self.tools = $('<div class="tools" />');
        },


        destroy: function() {
            $.widget.prototype.destroy.apply(this, arguments);
        }
    });
    $.extend($.ui.archives, {
        getter: "length ", //for methods that are getters, not chainables
        defaults: {
            editable: true,
            documents_path : '/docs.js'
        }
    });
})(jQuery);

