DROPDOWN = {
    iformat: function (icon) {
        var originalOption = icon.element;
        $(originalOption).addClass('bg-' + COLOR.primary);
        return $('<span><i class="icon-' + $(originalOption).data('icon') + '"></i> ' + icon.text + '</span>');
    }
};