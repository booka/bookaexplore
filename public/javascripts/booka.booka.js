(function($) {
    $.widget("ui.booka", {
        // options: provided by framework
        // element: provided by framework
        _init: function() {
            $.bka.token = this.options.token;
            $("#content").document();
            $("#browser").browser({
                documents_path :this.options.documents_path
                });
            $(window).trigger( 'hashchange' );
        },
        destroy: function() {
            $.widget.prototype.destroy.apply(this, arguments); 
        }
    });
    $.extend($.ui.booka, {
        getter: "length ", //for methods that are getters, not chainables
        defaults: {
            editable: true,
            token : null, // required: authorization token
            documents_path : '/docs.js'
        }
    });
})(jQuery);

