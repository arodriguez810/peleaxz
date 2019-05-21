String.prototype.lines = function () {
    return this.split(/\r*\n/);
};

function has_scrollbar(name) {
    var elem = document.getElementById(name);
    return elem.clientHeight < elem.scrollHeight;
}

DSON = {
    substringif: function (str, len) {
        return str.length >= len ? str.substring(0, len) : str;
    },
    cleanSpace: function (str) {
        return str.split(' ').join('_');
    },
    template: function (templatestring, t) {
        return new Function("return `" + templatestring + "`;").call(t);
    },
    merge: function (from, to, deep) {
        return $.extend(deep || true, from, to);
    },
    OSO: function (object) {
        return eval("(" + JSON.stringify(object) + ")");
    },
    EO: function (string) {
        return eval("(" + string + ")");
    },
    ULALIA: function (arays) {
        return `<ul><li>${arays.join("</li><li>")}</li></ul>`;
    },
    OMG: function (id, scope) {
        eval(`${scope}.loadImage${id} = function () {
            FILE.runServerFile($("#${id}"));
        }`);
        if (`${scope}.form.beginFunctions.indexOf('${scope}.loadImage${id}();')===-1`) {
            //eval(`${scope}.form.beginFunctions.push('${scope}.loadImage${id}();');`);
        }
        eval(`${scope}.loadImage${id}();`);
    },
    equals: function (obj1, obj2) {
        return JSON.stringify(obj1) === JSON.stringify(obj2);
    },
    mergeBool: function (from, to, naturally) {
        for (var i in from) {
            if (from.hasOwnProperty(i)) {
                if (typeof to[i] === 'object') {
                    DSON.mergeBool(from[i], to[i]);
                } else if (to[i] === false) {
                    to[i] = from[i];
                } else if (!to.hasOwnProperty(i)) {
                    to[i] = false;
                }
            }
        }
    },
    allvalue: function (to, value) {
        for (var i in to) {
            if (typeof to[i] === 'object') {
                DSON.allvalue(to[i], value);
            } else if (to[i] !== value) {
                to[i] = value;
            }
        }
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
    jsonToCSV: function (json, hasColumns, name) {
        if (json.length > 0) {
            var csv = '';
            var columns = [];
            if (hasColumns !== false) {
                for (var i in json[0]) {
                    columns.push(capitalize(i));
                }
                csv += columns.join(",") + "\r\n";
            }
            for (var step of json) {
                var values = [];
                for (var i in step) {
                    values.push(step[i]);
                }
                csv += `"${values.join('","')}"\r\n`;
            }
            SWEETALERT.loading({title: MESSAGE.ic('mono.downloading')});
            DOWNLOAD.csv(`${name}.csv`, csv);
            swal.close();
        } else {
            SWEETALERT.show(MESSAGE.i('alerts.Theresnotdatafordownload'));
        }
    },
    viewData: {},
    setViewData(obj) {
        DSON.viewData = {};
        DSON.viewData = $.extend(true, obj, DSON.viewData);
    }
};