app.controller("ms_other", function ($scope, $http, $compile) {
    ms_other = this;
    RUNCONTROLLER("ms_other", ms_other, $scope, $http, $compile);
    ms_other.formulary = function (data, mode, defaultData) {
        if (ms_other !== undefined) {
            RUN_B("ms_other", ms_other, $scope, $http, $compile);
            ms_other.form.schemas.insert = {

            };
            ms_other.form.schemas.select = {

            };
            ms_other.form.readonly = {};
            ms_other.createForm(data, mode, defaultData);
            ms_other.form.rules = {
                name: function () {
                    var rules = [];
                    var value = ms_other.name;
                    rules.push(VALIDATION.general.required(value));
                    return VALIDATION.process(ms_other, "name", rules)
                }
            };
            ms_other.form.rulesGroup = {
                all: function () {
                    return ms_other.validation.stateIcon(ms_other.form.fileds);
                },
            };
        }
    };
});