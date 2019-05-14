app.controller("fieldtype", function ($scope, $http, $compile) {
    fieldtype = this;
    RUNCONTROLLER("fieldtype", fieldtype, $scope, $http, $compile);
    fieldtype.formulary = function (data, mode, defaultData) {
        if (fieldtype !== undefined) {
            RUN_B("fieldtype", fieldtype, $scope, $http, $compile);
            fieldtype.form.readonly = {};
            fieldtype.createForm(data, mode, defaultData);
            fieldtype.$scope.$watch('fieldtype.name', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(fieldtype, "name", rules);
            });
        }
    };
});