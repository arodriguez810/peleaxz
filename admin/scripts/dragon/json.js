DSON = {
    merge: function (from, to, deep) {
        return $.extend(deep || true, from, to);
    },
};