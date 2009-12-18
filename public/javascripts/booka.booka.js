(function($) {



    $.widget("ui.booka", {
        currentManager : null,
        // options: provided by framework
        // element: provided by framework
        _init: function() {
            $.bka.token = this.options.token;
            $("#playground").archives();
            $(window).trigger( 'hashchange' );
        },

        destroy: function() {
            $.widget.prototype.destroy.apply(this, arguments); 
        }
    });
    $.extend($.ui.booka, {
        getter: "length ", //for methods that are getters, not chainables
        defaults: {
            token : null // required: authorization token
        }
    });
})(jQuery);

