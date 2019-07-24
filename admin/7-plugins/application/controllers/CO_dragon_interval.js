app.controller("dragon_interval", function ($scope, $http, $compile) {
    dragon_interval = this;
    RUNCONTROLLER("dragon_interval", dragon_interval, $scope, $http, $compile);
    dragon_interval.formulary = function (data, mode, defaultData) {
        if (dragon_interval !== undefined) {
            RUN_B("dragon_interval", dragon_interval, $scope, $http, $compile);
            dragon_interval.form.readonly = {};
            dragon_interval.createForm(data, mode, defaultData);
            dragon_interval.$scope.$watch('dragon_interval.name', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(dragon_interval, "name", rules);
            });
        }
    };
});