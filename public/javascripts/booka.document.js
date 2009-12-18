(function($) {
    $.widget("ui.document", {
        // options: provided by framework
        // element: provided by framework
        _init: function() {
            var self = this;
            $(window).bind( 'hashchange', function(e) {
                var url = $.param.fragment() + '.js';
                if (url.length > 3) {
                    self._loadDocument(url);
                }
            });
        },

        _loadDocument : function(url) {
            var self = this;
            $.get(url, function(responseHtml, status) {
                console.log("Document receveid. Status: " + status + " (FIXME - check it)");
                var holder = $('<div/>').html(responseHtml);
                self.element.html($('.document', holder).html());
                self.options.documentID = $('.document', holder).attr('id').substring(9);
                $('#editor').html($('.editor', holder).html());

                self._prepareDraggables();
                self._createClips();
                $("#editor .properties").propertier();
                console.log("document path: " , self._getDocumentPath());
            });
        },

        _getDocumentPath : function() {
            return '/docs/' + this.options.documentID;
        },

        _prepareDraggables : function() {
            $(".newcontent").draggable({
                helper: 'clone',
                cursor: 'crosshair',
                opacity: 0.6,
                zIndex: 5000
            });
        },

        _newClip : function(target, contentType, location) {
            var self = this;

            var params = {
                'clip[content_type]' : contentType,
                'clip[location]' : location
            };

            $.get(self._getDocumentPath() + self.options.newClipPath,
                $.param(params), function(html, status) {
                    var newClip = $('<li />');
                    newClip.insertAfter(target).clip({
                        drop: function(target, contentType, location) {
                            self._newClip(target, contentType, location);
                        }
                    }).clip('setEditor', html);
                });
        },

        _createClips : function() {
            var self = this;
            var ondropped = function(target, contentType, location) {
                self._newClip(target, contentType, location);
            }
            var first = $("<div />").slot({
                location : 'first',
                drop : ondropped
            });
            $('.clips', this.element).prepend(first);
            var documentPath = self._getDocumentPath();
            $('.clips li', this.element).clip({
                documentPath : documentPath,
                drop: ondropped
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