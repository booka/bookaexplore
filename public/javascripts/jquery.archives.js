(function($) {
    var token = null;

    var url_for = function(resource, id, format, params) {
        var url = resource;
        if (id != null) 
            url += '/' + id;
        if (format != null) 
            url += '.' + format;
        if (params != null)
            url += '?' + params;
        console.log("URL_FOR: " , url);
        return url;
    }

    var listenToHistory = function() {
        $(window).bind( 'hashchange', function(e) {
            var url = $.param.fragment();
            $.getScript(url + '.js');
        });
        $(window).trigger( 'hashchange' );
    };

    var editProperty = function(documentId, propertyName, value) {
        var params = {
            _method : 'put',
            authenticity_token : token
        }
        var paramName = 'document[' + propertyName + ']';
        params[paramName] = value;
        $.post(url_for('/docs', documentId, 'json'), params, function(response) {
            updateProperty(documentId, propertyName, value);
        });
    }

    var updateProperty = function(documentId, propertyName, value) {
        var targets = ".document-"+ documentId +"-" + propertyName;
        $(targets).text(value);
    }

    var addClip = function(target, newClipPath, documentId, contentType, location) {
        var params = {
            'clip[parent_id]' : documentId,
            'clip[content_type]' : contentType,
            'clip[location]' : location
        };

        target.removeClass('ready');
        target.load(newClipPath, $.param(params), function() {
            target.addClass('editor');
            var form = $(this).find('form');
            form.find('a').click(function(event) {
                event.preventDefault();
                target.slideUp(function() {
                    $(this).removeClass('editor').addClass('ready').empty().slideDown()
                });
                return false;
            });
            form.submit(function() {
                $.post(this.action, $(this).serialize(), null, "script");
                return false;
            });
        });
    }

    $.archives = {
        /* init archive functionality */
        init : function(authtoken, documents_path) {
            token = authtoken;
            $.getScript(documents_path);
            listenToHistory();
        },

        setPropertiesEditable : function() {
            $('.editable').editable(function(value) {
                var id = $(this).attr('id').split('-');
                editProperty(id[1], id[2], value);
                return value;
            });
        },

        setDocumentEditable : function(documentId, newClipPath) {
            $(".newcontent").draggable({
                helper: 'clone',
                cursor: 'crosshair',
                opacity: 0.6,
                zIndex: 5000
            });

            $(".slot").droppable({
                accept: '.newcontent',
                activeClass: 'armed',
                tolerance: 'touch',
                hoverClass: 'active',
                drop: function(event, ui) {
                    var contentType = ui.draggable.attr('id').substring(4);
                    var location = $(this).attr('id').substring(4);
                    addClip($(this), newClipPath, documentId, contentType, location);
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

