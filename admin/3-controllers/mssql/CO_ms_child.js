app.controller("ms_child", function ($scope, $http, $compile) {
    ms_child = this;
    RUNCONTROLLER("ms_child", ms_child, $scope, $http, $compile);
    ms_child.formulary = function (data, mode, defaultData) {
        if (ms_child !== undefined) {
            RUN_B("ms_child", ms_child, $scope, $http, $compile);
            ms_child.form.readonly = {};
            ms_child.createForm(data, mode, defaultData);
            $scope.$watch('ms_child.name', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(ms_child, "name", rules);
            });
        }
    };
});