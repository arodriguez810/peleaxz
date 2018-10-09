ARRAY = {
    removeLast: function (arr) {
        arr.splice(-1, 1);
    },
    last: function (arr) {
        return arr[arr.length - 1];
    },
    penultimate: function (arr) {
        return arr[arr.length - 2];
    },
    contains: function (arr, value) {
        if (arr === undefined || arr === null) return false;
        return arr.indexOf(value) !== -1;
    },
    deleteQuery: function (arr, func) {
        return arr.splice(arr.findIndex(func), 1);
    }
};
