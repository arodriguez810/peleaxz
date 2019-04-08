app.controller("otronombre", function ($scope, $http, $compile) {
    otronombre = this;
    RUNCONTROLLER("otronombre", otronombre, $scope, $http, $compile);
    otronombre.formulary = function (data, mode, defaultData) {
        if (otronombre !== undefined) {
            RUN_B("otronombre", otronombre, $scope, $http, $compile);
            otronombre.form.readonly = {campo: 7};
            otronombre.createForm(data, mode, defaultData);
            otronombre.$scope.$watch('otronombre.name', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.text.realdata(value));
                VALIDATION.validate(otronombre, "name", rules);
            });
        }
    };
});