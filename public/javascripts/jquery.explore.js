(function($) {

    var transactions = {
        connections : 0,
        begin : function() {
            connections += 1;
            if (connections == 1) {
                $("#workin").fadeIn();
            }
        },
        end : function() {
            connections -= 1;
            if (connections == 0) {
                $("#workin").fadeOut();
            }
        },
        transaction : function(callback) {
            transactions.begin();
            callback(transactions.end);
        }
    };

    // PUBLIC
    $.explore = {
        start : transactions.transaction
    };

    $.fn.extend({
        ajaxize: function() {
            return this.each(function(){
                $(this).click(function () {
                    var href = $(this).attr('href');
                    $(this).attr('href', '#' + href);
                });
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
