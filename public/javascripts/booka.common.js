(function($) {

    $.bka = $.bka || {}
    $.extend($.bka, {
        token : null,
        url_for : function(resource, id, format, params) {
            var url = resource;
            if (id != null)
                url += '/' + id;
            if (format != null)
                url += '.' + format;
            if (params != null)
                url += '?' + params;
            console.log("URL_FOR: " , url);
            return url;
        }
    });


    $.fn.extend({
        debug: function() {
            return this.each(function(){
                $(this).css('border', '1px solid red').css('background-color', '#c00');
            });
        }
    });
})(jQuery);

if (typeof console == "undefined" || typeof console.log == "undefined") {
    console = {
        log : function() { },
        debug : function() { }
    };
}
