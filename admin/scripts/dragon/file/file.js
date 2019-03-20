FILE = {
    server: function (folder, callback, nofound, element) {
        BASEAPI.ajax.get(HTTP.path(["generalfiles", "api"]), {folder: folder}, function (data) {
            if (data.data.files) {
                for (var i in  data.data.files) {
                    var file = data.data.files[i];
                    data.data.files[i] = {
                        url: `${HTTP.path([FOLDERS.files, folder])}/${file}`,
                        cleanUrl: HTTP.cleanRoot(`${HTTP.path([FOLDERS.files, folder])}${file}`),
                        selected: false,
                        fileName: file,
                        original: file.split('___')[0],
                        ext: FILE.extension(file),
                        isFolder: FILE.extension(file) === ''
                    };
                    data.data.files[i].originalCrop = data.data.files[i].original;
                }
                if (data.data.files.length <= 0) {
                    if (nofound)
                        return nofound(data.data.files);
                }
                return callback(data.data.files);
            } else {
                return callback([]);
            }
        }, element);
    },
    extension: function (filename) {
        var extension = filename.split('.');
        return extension.length > 1 ? ARRAY.last(extension) : "";
    },
    isImage: function (filename) {
        var extension = FILE.extension(filename);
        if (ARRAY.contains(["png", "jpg", "jpeg", "gif"], extension))
            return true;
        return false;
    },
    noSupport: function (filename) {
        var extension = FILE.extension(filename);
        if (ARRAY.contains(["doc", "docx", "xls", "xlsx"], extension))
            return true;
        return false;
    },
    iconByExtension: function (extension) {
        switch (extension) {
            case "pdf": {
                return ICON.i('file-pdf');
            }
            case "xlsx":
            case "csv":
            case "xls": {
                return ICON.i('file-excel');
            }
            case "gif":
            case "jpeg":
            case "jpg":
            case "png": {
                return ICON.i('image2');
            }
            case "html": {
                return ICON.i('html5');
            }
            case "doc":
            case "docx": {
                return ICON.i('file-word');
            }
            case "vb":
            case "cshtml":
            case "json":
            case "cs":
            case "php":
            case "js": {
                return ICON.i('code');
            }
            default: {
                return ICON.i('file-' + extension);
            }
        }
    },
    fileToIcon: function (filename) {
        var extension = FILE.extension(filename);
        return FILE.iconByExtension(extension);
    },
    fileToIconClass: function (filename) {
        var extension = FILE.extension(filename);
        return FILE.iconByExtension(extension).split("'")[1];
    },
    addSourceToElement: function (element, source) {
        switch (element.prop("tagName")) {
            case "IMG": {
                element.attr('src', source);
                break
            }
            case "A": {
                element.attr('href', source);
                break
            }
        }
    },
    runServerFile: function ($me) {
        var sosten = $me.parent();
        var folder = $me.data('dragonfile');
        var index = $me.data('index');
        var thereOriginal = sosten.find(`[data-dragonfile='${folder}']:hidden:eq(0)`);
        if (thereOriginal.length > 0) {
            sosten.find(`[data-dragonfile='${folder}']:not(:hidden)`).remove();
            $me = thereOriginal;
        }
        FILE.server(folder, function (files) {
            if (index !== undefined) {
                var theClone = $me.clone();
                FILE.addSourceToElement(theClone, files[index].url);
                theClone.show();
                $me.after(theClone);
                $me.hide();
            } else {
                files.forEach((file) => {
                    var theClone = $me.clone();
                    FILE.addSourceToElement(theClone, file.url);
                    theClone.show();
                    $me.after(theClone);
                });
                $me.hide();
            }
        }, function () {
            var theClone = $me.clone();
            FILE.addSourceToElement(theClone, "assets/images/placeholder.jpg");
            theClone.show();
            $me.after(theClone);
            $me.hide();
        }, $me);
    }
};
