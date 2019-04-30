capitalize = function (str) {
    if (typeof str === 'function')
        str = str();
    return str.replace(/(^|\s)\S/g, function (match) {
        return match.toUpperCase();
    });
};