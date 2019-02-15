DSON = {
    substringif: function (str, len) {
        return str.length >= len ? str.substring(0, len) : str;
    },
    template: function (templatestring, t) {
        return new Function("return `" + templatestring + "`;").call(t);
    },
    merge: function (from, to, deep) {
        return $.extend(deep || true, from, to);
    },
    invermerge: function (from, to, deep) {
        return $.extend(deep || true, to, from);
    },
    keepInvermerge: function (from, to, deep) {
        var fromy = DSON.merge(from, {});
        return $.extend(deep || true, to, fromy);
    },
    keepmerge: function (from, to, deep) {
        $.extend(deep || true, from, to);
    },
    oseaX: function (obj) {
        return (
            obj === undefined || obj === null || obj === "" || obj <= 0 || obj === "0"
        );
    },
    ifundefined: function (variable, result) {
        return variable === undefined ? result : variable;
    },
    iffunction: function (obj) {
        return typeof obj === "function";
    },
    cleanNumber: function (number) {
        if (DSON.oseaX(number))
            return 0;
        return number.replace(/[^\d.-]/g, '');
    },
    noset: function (text) {
        return "";
    },
    jsonToArray: function (json) {
        var newarray = [];
        json.forEach((item) => {
            var rowArray = [];
            for (var i in item)
                rowArray.push(item[i]);
            newarray.push(rowArray);
        });
        return newarray;
    },
    viewData: {},
    setViewData(obj) {
        DSON.viewData = {};
        DSON.viewData = $.extend(true, obj, DSON.viewData);
    }
};