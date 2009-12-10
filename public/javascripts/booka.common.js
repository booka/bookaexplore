(function($) {
    $.fn.extend({
        debug: function() {
            return this.each(function(){
                $(this).css('border', '1px solid red');
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
