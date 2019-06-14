capitalize = function (str) {
    if (typeof str === 'function')
        str = str();
    str = str.toLowerCase();
    return str.replace(/(^|\s)\S/, function (match) {
        return match.toUpperCase();
    });
};

capitalizeOne = function (str) {
    if (typeof str === 'function')
        str = str();
    str = str.toLowerCase();
    return str.replace(/(^|\s)\S/, function (match) {
        return match.toUpperCase();
    });
};

capitalizeOneSpace = function (str) {
    if (typeof str === 'function')
        str = str();
    str = str.toLowerCase();
    return str.replace(/(^|\s)\S/, function (match) {
        return match.toUpperCase();
    }).replace(/ /g, " ");
};