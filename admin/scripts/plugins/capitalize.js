capitalize = function (str) {
    return str.replace(/\b\w/g, function (l) {
        return l.toUpperCase()
    });
};