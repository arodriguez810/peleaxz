app.controller("dragon_currency", function ($scope, $http, $compile) {
    dragon_currency = this;
    RUNCONTROLLER("dragon_currency", dragon_currency, $scope, $http, $compile);
    dragon_currency.formulary = function (data, mode, defaultData) {
        if (dragon_currency !== undefined) {
            RUN_B("dragon_currency", dragon_currency, $scope, $http, $compile);
            dragon_currency.form.readonly = {};
            dragon_currency.createForm(data, mode, defaultData);
            dragon_currency.$scope.$watch('dragon_currency.name', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(dragon_currency, "name", rules);
            });
        }
    };
});