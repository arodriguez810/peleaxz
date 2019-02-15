app.controller("ms_category", function ($scope, $http, $compile) {
    ms_category = this;
    RUNCONTROLLER("ms_category", ms_category, $scope, $http, $compile);
    ms_category.formulary = function (data, mode, defaultData) {
        if (ms_category !== undefined) {
            RUN_B("ms_category", ms_category, $scope, $http, $compile);
            ms_category.form.schemas.insert = {

            };
            ms_category.form.schemas.select = {

            };
            ms_category.form.readonly = {};
            ms_category.createForm(data, mode, defaultData);
            ms_category.form.rules = {
                name: function () {
                    var rules = [];
                    var value = ms_category.name;
                    rules.push(VALIDATION.general.required(value));
                    return VALIDATION.process(ms_category, "name", rules)
                }
            };
            ms_category.form.rulesGroup = {
                all: function () {
                    return ms_category.validation.stateIcon(ms_category.form.fileds);
                },
            };
        }
    };
});