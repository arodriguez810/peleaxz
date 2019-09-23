app.controller("dates", function ($scope, $http, $compile) {
    dates = this;
    RUNCONTROLLER("dates", dates, $scope, $http, $compile);
    dates.formulary = function (data, mode, defaultData) {
        if (dates !== undefined) {
            RUN_B("dates", dates, $scope, $http, $compile);
            dates.form.readonly = {year: dates.year};
            dates.createForm(data, mode, defaultData);
            $scope.$watch('dates.range_from', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(dates, "range_from", rules);
            });
            $scope.$watch('dates.range_to', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(dates, "range_to", rules);
            });
            $scope.$watch('dates.range', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(dates, "range", rules);
            });
        }
    };
});