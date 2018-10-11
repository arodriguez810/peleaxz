/**
 * DSON
 */
DSON = {
    merge: function (from, to, deep) {
        return $.extend(deep || true, from, to);
    },
    oseaX: function (obj) {
        return (
            obj === undefined || obj === null || obj === "" || obj <= 0 || obj === "0"
        );
    },
    ifundefined: function (variable, result) {
        return variable === undefined ? result : variable;
    },
    noset: function (text) {
        return "";
    }
};