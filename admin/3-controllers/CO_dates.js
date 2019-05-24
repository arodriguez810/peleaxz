app.controller("dates", function ($scope, $http, $compile) {
    dates = this;
    RUNCONTROLLER("dates", dates, $scope, $http, $compile);
    dates.formulary = function (data, mode, defaultData) {
        if (dates !== undefined) {
            RUN_B("dates", dates, $scope, $http, $compile);
            dates.form.readonly = {year: dates.year};
            dates.createForm(data, mode, defaultData);
            $scope.$watch('texts.basic', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.text.realdata(value));
                texts.readonly = value;
                VALIDATION.validate(texts, "basic", rules);
            });
        }
    };
});