app.controller("vw_ms_category", function ($scope, $http, $compile) {
    vw_ms_category = this;
    RUNCONTROLLER("vw_ms_category", vw_ms_category, $scope, $http, $compile);
    vw_ms_category.formulary = function (data, mode, defaultData) {
        if (vw_ms_category !== undefined) {
            RUN_B("vw_ms_category", vw_ms_category, $scope, $http, $compile);
            vw_ms_category.form.readonly = {};
            vw_ms_category.form.editCell = ["name"];
            vw_ms_category.createForm(data, mode, defaultData);
            vw_ms_category.$scope.$watch('vw_ms_category.name', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_ms_category, "name", rules);
            });
        }
    };
});