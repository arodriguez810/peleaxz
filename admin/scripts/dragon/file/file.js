FILE = {
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
    }
};