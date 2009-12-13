(function($) {
    $.widget("ui.clip", {
        _init: function() {
            var self = this;
            var clipID = this.getClipID();
            if (clipID != null)
                this._addSlot();
            self.element.hover(function() {
                var actions = $('<div class="actions"><a href="#" class="edit">editar</a><a href="#" class="delete">borrar</a></div>');
                $(this).addClass('active').append(actions);
            }, function() {
                $(this).removeClass('active');
                $('.actions', this).remove();
            });

            $("a.edit", this.element).live("click", function(event) {
                alert("EDIT: " + self._getClipPath());
                return false;
            });
            $("a.delete", this.element).live("click", function(event) {
                alert("DELETE: " + self._getClipPath());
                return false;
            });
        },

        _addSlot : function() {
            var slot = $('<div class="slot ready">').slot({
                location : 'after' + this.getClipID(),
                drop: this.options.drop
            });
            this.element.addClass('clip').after(slot);
        },

        getClipID : function() {
            var id = this.element.attr('id');
            return (id == '') ? null : this.element.attr('id').substring(5);
        },

        _getClipPath : function() {
            return this.options.documentPath + '/clip/' + this.getClipID();
        },

        setEditor : function(html) {
            var self = this;
            var editor = $('<div />').clipeditor({
                editor : html,
                cancel : function() {
                    if (self.getClipID() == null) { // canceled a new clip
                        self.element.remove();
                    } else {
                        self.element.show();
                    }
                },
                edit : function(content) {
                    self.element.html(content).show();
                    if (self.getClipID() == null) { // edited a new clip
                        self._addSlot();
                    }
                    
                }
            });

            self.element.hide().before(editor);
        },


        destroy: function() {
            $.widget.prototype.destroy.apply(this, arguments); // default destroy
        }
    });
    $.extend($.ui.clip, {
        defaults: {        }
    });
})(jQuery);
