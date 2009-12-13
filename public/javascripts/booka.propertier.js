(function($) {
    function editProperty(token, documentId, propertyName, value) {
        var params = {
            _method : 'put',
            authenticity_token : token
        }
        var paramName = 'document[' + propertyName + ']';
        params[paramName] = value;
        $.post($.bka.url_for('/docs', documentId, 'json'), params, function(response) {
            updateProperty(documentId, propertyName, value);
        });
    }

    function updateProperty(documentId, propertyName, value) {
        var targets = ".document-"+ documentId +"-" + propertyName;
        $(targets).text(value);
    }


    $.widget("ui.propertier", {
        _init: function() {
            console.log("Propertier: " , $.bka.token);
            var self = this;
            $('.editable', self.element).editable(function(value) {
                var id = $(this).attr('id').split('-');
                editProperty(self.options.token, id[1], id[2], value);
                return value;
            });
        },

        destroy: function() {
            $.widget.prototype.destroy.apply(this, arguments); // default destroy
        }
    });

    $.extend($.ui.propertier, {
        defaults: {
            token : null // required
        }
    });
    console.log("propertier module installed");
})(jQuery);
