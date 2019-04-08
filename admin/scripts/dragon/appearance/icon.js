ICON = {
    i: function (icon, value) {
        value = DSON.ifundefined(value, '');
        return "<i class='icon-" + icon + "'></i>" + value;
    }
};