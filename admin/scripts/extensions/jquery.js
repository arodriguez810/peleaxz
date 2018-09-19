JQUERY = {
    loadScript: function (url, key, callback) {
        $.ajax({
            url: url,
            dataType: 'script',
            success: callback(key),
            async: true
        });
    }
};