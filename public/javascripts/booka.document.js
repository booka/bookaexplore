(function($) {

    urlRegex = /\/docs\/(\d+)/

    $.widget("ui.document", {
        contentSelector : null,
        
        _init: function() {
            var self = this;
            $(window).bind( 'hashchange', function(e) {
                var fragment = $.param.fragment();
                var result = urlRegex.exec(fragment);
                if (result != null) {
                    self._loadDocument(result[1]);
                }
            });

            $(self.element).hover(function() {
                self.element.addClass('active');
            }, function() {
                self.element.removeClass('active');
            });
        },

        _loadDocument : function(id) {
            var self = this;
            var url = self.options.docsPath + "/" + id + ".js";
            $.get(url, function(responseHtml, status) {
                console.log("Document receveid. Status: " + status + " (FIXME - check it)");
                var holder = $('<div/>').html(responseHtml);
                self.element.html($('.document', holder).html());
                self.options.documentID = $('.document', holder).attr('id').substring(9);

                self._createContentSelector(holder);
                self._createClips();
                console.log("document path: " , self._getDocumentPath());
            });
        },

        _createContentSelector : function (holder) {
            var self = this;
            this.contentSelector = $('.contentSelector', holder);
            $('a', this.contentSelector).click(function(e) {
                var slot = $(this).parents('.slot');
                var prevClip = slot.prev('.clip');
                var location = ''
                if (prevClip.size() == 0) {
                    location = "first"
                } else {
                    location = "after-" + prevClip.clip('getClipID');
                }
                var contentType = $(this).attr('id').substring('select-'.length);
                self._newClip(slot, contentType, location);
                slot.slot('selector', false);
                return false;
            });
        },

        _getDocumentPath : function() {
            return '/docs/' + this.options.documentID;
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
                        onCreate: function() {
                            newClip.after(self._createSlot());
                        }
                    }).clip('setEditor', html);
                });
        },

        _createSlot : function() {
            return $("<div />").slot({contentSelector : this.contentSelector });
        },

        _createClips : function() {
            var self = this;
            var documentPath = self._getDocumentPath();
            
            self._createSlot().prependTo($('.clips', this.element));
            
            // init clips and add slots
            var clips = $('.clips li', this.element)
            clips.clip({
                documentPath : documentPath
            });
            clips.each(function() {
                $(this).after(self._createSlot());
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
            newClipPath : '/clips/new.js',
            docsPath: '/docs'
        }
    });
})(jQuery);