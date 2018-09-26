ARRAY = {
    removeLast: function (arr) {
        arr.splice(-1, 1);
    },
    last: function (arr) {
        return arr[arr.length - 1];
    },
    penultimate: function (arr) {
        return arr[arr.length - 2];
    }
};