ANGULARJS =
    {
        get: function (id) {
            return eval('angular.element(document.getElementById("' + id + '")).scope().' + id);
        },
        scope: function (id) {
            return angular.element(document.getElementById(id)).scope();
        },
        tableScope: null
    };