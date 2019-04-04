app.controller("ms_category2", function ($scope, $http, $compile) {
    ms_category2 = this;
    RUNCONTROLLER("ms_category2", ms_category2, $scope, $http, $compile);
    ms_category2.formulary = function (data, mode, defaultData) {
        if (ms_category2 !== undefined) {
            RUN_B("ms_category2", ms_category2, $scope, $http, $compile);
            ms_category2.form.readonly = {};
            ms_category2.form.editCell = ["name"];
            ms_category2.createForm(data, mode, defaultData);
            ms_category2.$scope.$watch('ms_category2.name', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(ms_category2, "name", rules);
            });
        }
    };
});