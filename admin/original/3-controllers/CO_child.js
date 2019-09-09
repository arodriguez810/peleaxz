app.controller("child", function ($scope, $http, $compile) {
    child = this;
    RUNCONTROLLER("child", child, $scope, $http, $compile);
    child.formulary = function (data, mode, defaultData) {
        if (child !== undefined) {
            RUN_B("child", child, $scope, $http, $compile);
            child.form.readonly = {};
            child.createForm(data, mode, defaultData);
        }
    };
});