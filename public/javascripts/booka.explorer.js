(function($) {


    $.widget("ui.explorer", {
        // options: provided by framework
        // element: provided by framework
        _init: function() {
            $.bka.token = this.options.token;
            $("#content").document({token : this.options.token});
            $("#browser").browser({documents_path :this.options.documents_path});
        },
        destroy: function() {
            $.widget.prototype.destroy.apply(this, arguments); // default destroy
        }
    });
    $.extend($.ui.explorer, {
        getter: "length ", //for methods that are getters, not chainables
        defaults: {
            editable: true,
            token : null, // required: authorization token
            documents_path : '/docs.js'
        }
    });
})(jQuery);

