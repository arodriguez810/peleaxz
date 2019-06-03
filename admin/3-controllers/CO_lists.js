app.controller("list", function ($scope, $http, $compile) {
    list = this;
    RUNCONTROLLER("list", list, $scope, $http, $compile);
    list.formulary = function (data, mode, defaultData) {
        if (list !== undefined) {
            RUN_B("list", list, $scope, $http, $compile);
            list.form.readonly = {};
            list.createForm(data, mode, defaultData);
        }
    };
});