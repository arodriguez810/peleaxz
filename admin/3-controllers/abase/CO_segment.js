app.controller("group", function ($scope, $http, $compile) {
    group = this;
    RUNCONTROLLER("group", group, $scope, $http, $compile);
    group.formulary = function (data, mode, defaultData) {
        if (group !== undefined) {
            RUN_B("group", group, $scope, $http, $compile);
            group.form.schemas.insert = {};
            group.form.schemas.select = {};
            group.form.readonly = {};
            group.createForm(data, mode, defaultData);
            group.$scope.$watch('group.name', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(group, "name", rules);
            });
        }
    };
});