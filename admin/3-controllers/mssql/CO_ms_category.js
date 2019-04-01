app.controller("ms_category", function ($scope, $http, $compile) {
    ms_category = this;
    RUNCONTROLLER("ms_category", ms_category, $scope, $http, $compile);
    ms_category.formulary = function (data, mode, defaultData) {
        if (ms_category !== undefined) {
            RUN_B("ms_category", ms_category, $scope, $http, $compile);
            ms_category.form.readonly = {};
            ms_category.form.editCell = ["name"];
            ms_category.createForm(data, mode, defaultData);
            ms_category.$scope.$watch('ms_category.name', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(ms_category, "name", rules);
            });
        }
    };
});