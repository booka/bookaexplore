(function($) {

    $.archives = {
        token : '',

        setPropertiesEditable : function(editPath) {
            $('.editable').editable(function(value) {
                var id = $(this).attr('id').split('-');
                var params = {_method : 'put', authenticity_token : $.archives.token}
                var name = 'document[' + id[2] + ']';
                params[name] = value;
                var select = ".document-"+ id[1] +"-" + id[2];
                $(select).text(value);
                $.post(editPath + '.json', params, function(data) {
                    alert();
                }, 'json');
                return value;
            }, {
                id   : 'name',
                name : 'value'
            });
        },

        setDocumentEditable : function(documentId, newClipPath) {
            $(".newcontent").draggable({
                helper: 'clone',
                cursor: 'crosshair',
                opacity: 0.6
            });

            $(".slot").droppable({
                accept: '.newcontent',
                activeClass: 'ready',
                tolerance: 'touch',
                hoverClass: 'active',
                drop: function(event, ui) {
                    $('.current_editor').removeClass(".current_editor");
                    var new_type = ui.draggable.attr('id').substring(4);
                    var location = $(this).attr('id').substring(4);
                    var params = {
                        'clip[parent_id]' : documentId,
                        'clip[content_type]' : new_type,
                        'clip[location]' : location
                    };
                    var url = newClipPath + '.js?' + $.param(params)
                    $(this).addClass('current_editor');
                    $.getScript(url);
                }
            });

            $(".clips").sortable({
                axis: 'y',
                containment: 'parent',
                cursor: 'crosshair',
                opacity: 0.5, // handle: '.sortme'
                update : function(event, ui) {
                }
            });
        }
    }
})(jQuery);

