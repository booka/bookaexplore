(function($) {
    $.widget("ui.clip", {
        _init: function() {
            var self = this;

            var actions = $(self.options.actions);
            self.element.addClass('clip');
            self.element.append(actions);
            self.element.click(function() {
                var element = $(this);
                element.toggleClass('active');
                $('.actions', element).slideToggle();
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
        defaults: {      
            actions: '<div class="actions" style="display: none;"><a href="#" class="edit">Editar</a><a href="#" class="delete">Borrar</a></div>'
        }
    });
})(jQuery);
