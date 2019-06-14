app.controller("base_currency", function ($scope, $http, $compile) {
    base_currency = this;
    RUNCONTROLLER("base_currency", base_currency, $scope, $http, $compile);
    base_currency.formulary = function (data, mode, defaultData) {
        if (base_currency !== undefined) {
            RUN_B("base_currency", base_currency, $scope, $http, $compile);
            base_currency.form.readonly = {};
            base_currency.createForm(data, mode, defaultData);
            base_currency.$scope.$watch('base_currency.name', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(base_currency, "name", rules);
            });
        }
    };
});