app.controller("dragon_fieldtype", function ($scope, $http, $compile) {
    dragon_fieldtype = this;
    RUNCONTROLLER("dragon_fieldtype", dragon_fieldtype, $scope, $http, $compile);
    dragon_fieldtype.formulary = function (data, mode, defaultData) {
        if (dragon_fieldtype !== undefined) {
            RUN_B("dragon_fieldtype", dragon_fieldtype, $scope, $http, $compile);
            dragon_fieldtype.form.readonly = {};
            dragon_fieldtype.createForm(data, mode, defaultData);
            dragon_fieldtype.$scope.$watch('dragon_fieldtype.name', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(dragon_fieldtype, "name", rules);
            });
        }
    };
});