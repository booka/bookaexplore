(function($) {
    $.widget("ui.document", {
        // options: provided by framework
        // element: provided by framework
        _init: function() {
            var self = this;
            $(window).bind( 'hashchange', function(e) {
                var url = $.param.fragment() + '.js';
                $.get(url, function(responseHtml, status) {
                    console.log("TODO check status: " + status);
                    var holder = $('<div/>').html(responseHtml);
                    self.element.html($('#document', holder).html());
                    $('#editor').html($('#editor', holder).html());
                    self._prepareDraggables();
                    self._createSlots();
                });
            });
            $(window).trigger( 'hashchange' );
        },

        _prepareDraggables : function() {
            $(".newcontent").draggable({
                helper: 'clone',
                cursor: 'crosshair',
                opacity: 0.6,
                zIndex: 5000
            });
        },

        _addClip : function(target, contentType, location) {
            var params = {
                'clip[parent_id]' : this.options.documentId,
                'clip[content_type]' : contentType,
                'clip[location]' : location
            };

            $.get(this.options.newClipPath, $.param(params), function(html, status) {
                target.slot('setEditor', html);
            });
        },

        _createSlots : function() {
            var self = this;
            var callback = function(target, contentType, location) {
                self._addClip(target, contentType, location);
            };

            var first = $("<div />").slot({
                location : 'first',
                drop : callback
            });
            $('.clips', this.element).before(first);
            $('.clips li', this.element).clip({
                drop: callback
            });
        },

        destroy: function() {
            $.widget.prototype.destroy.apply(this, arguments); // default destroy
        }
    });
    $.extend($.ui.document, {
        getter: "length ", //for methods that are getters, not chainables
        defaults: {
            editable: true,
            newClipPath : '/clips/new.js'

        }
    });
})(jQuery);