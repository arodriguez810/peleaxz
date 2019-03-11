capitalize = function (str) {
    return str.replace(/(^|\s)\S/g, function (match) {
        return match.toUpperCase();
    });
};