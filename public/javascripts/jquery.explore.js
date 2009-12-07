(function($) {
    $.ajaxize = {
        VERSION: "0.0.1",
        defaults: {}
    };

    $.fn.extend({
        ajaxize: function(settings) {
            settings = $.extend({}, $.ajaxize.defaults, settings);
            return this.each(function(){
                $(this).click(function () {
                    var href = $(this).attr('href') + '.js';
                    $.get(href , null, null, "script");
                    return false;
                });
            });
        }
    });
})(jQuery);
