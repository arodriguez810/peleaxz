app.controller("interval", function ($scope, $http, $compile) {
    interval = this;
    RUNCONTROLLER("interval", interval, $scope, $http, $compile);
    interval.formulary = function (data, mode, defaultData) {
        if (interval !== undefined) {
            RUN_B("interval", interval, $scope, $http, $compile);
            interval.form.readonly = {};
            interval.createForm(data, mode, defaultData);
            interval.$scope.$watch('interval.name', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(interval, "name", rules);
            });
        }
    };
});