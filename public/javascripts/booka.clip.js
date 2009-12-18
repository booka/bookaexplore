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

            $("a.edit", this.element).click(function(event) {
                self.edit();
                return false;
            });
            $("a.delete", this.element).click(function(event) {
                alert("DELETE: " + self._getClipPath());
                return false;
            });
        },

        edit : function() {
            var self = this;
            var url = self._getClipPath() + "/edit.js";
            $.get(url, function(data) {
                self.setEditor(data);
            });
        },

        getClipID : function() {
            var id = this.element.attr('id');
            return (id == '') ? null : this.element.attr('id').substring(5);
        },

        _getClipPath : function() {
            return this.options.documentPath + '/clips/' + this.getClipID();
        },

        setEditor : function(html) {
            var self = this;
            $('.actions', self.element).hide();
            var editor = $('<div />').clipeditor({
                editor : html,
                cancel : function() {
                    if (self.getClipID() == null) { // canceled a new clip
                        self.element.remove();
                    } else {
                        self.element.fadeIn();
                    }
                },
                edit : function(response) {
                    var content = $(response);
                    self.element.html(content.html());

                    if (self.getClipID() == null) {
                        self.element.attr('id', content.attr('id'));
                        self.options.onCreate();
                    }
                    self.element.fadeIn();
                }
            });

            self.element.hide().before(editor);
        },


        destroy: function() {
            $.widget.prototype.destroy.apply(this, arguments); // default destroy
        }
    });
    $.extend($.ui.clip, {
        getter: "getClipID ",
        defaults: {
            onCreate : function() {},
            actions: '<div class="actions" style="display: none;"><a href="#" class="edit">Editar</a><a href="#" class="delete">Borrar</a></div>'
        }
    });
})(jQuery);
