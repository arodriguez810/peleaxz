app.controller("ms_other", function ($scope, $http, $compile) {
    ms_other = this;
    RUNCONTROLLER("ms_other", ms_other, $scope, $http, $compile);
    ms_other.formulary = function (data, mode, defaultData) {
        if (ms_other !== undefined) {
            RUN_B("ms_other", ms_other, $scope, $http, $compile);
            ms_other.form.readonly = {};
            ms_other.createForm(data, mode, defaultData);
            $scope.$watch('ms_other.name', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(ms_other, "name", rules);
            });
        }
    };
});