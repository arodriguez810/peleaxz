app.controller("dragon_group", function ($scope, $http, $compile) {
    dragon_group = this;
    RUNCONTROLLER("dragon_group", dragon_group, $scope, $http, $compile);
    dragon_group.formulary = function (data, mode, defaultData) {
        if (dragon_group !== undefined) {
            RUN_B("dragon_group", dragon_group, $scope, $http, $compile);
            dragon_group.form.schemas.insert = {};
            dragon_group.form.schemas.select = {};
            dragon_group.form.readonly = {};
            dragon_group.createForm(data, mode, defaultData);
            dragon_group.$scope.$watch('dragon_group.name', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(dragon_group, "name", rules);
            });
        }
    };
});