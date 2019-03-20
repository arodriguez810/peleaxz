app.controller("ms_child", function ($scope, $http, $compile) {
    ms_child = this;
    RUNCONTROLLER("ms_child", ms_child, $scope, $http, $compile);
    ms_child.formulary = function (data, mode, defaultData) {
        if (ms_child !== undefined) {
            RUN_B("ms_child", ms_child, $scope, $http, $compile);
            ms_child.form.schemas.insert = {

            };
            ms_child.form.schemas.select = {

            };
            ms_child.form.readonly = {};
            ms_child.createForm(data, mode, defaultData);
            ms_child.form.rules = {
                name: function () {
                    var rules = [];
                    var value = ms_child.name;
                    rules.push(VALIDATION.general.required(value));
                    return VALIDATION.process(ms_child, "name", rules)
                }
            };
            ms_child.form.rulesGroup = {
                all: function () {
                    return ms_child.validation.stateIcon(ms_child.form.fileds);
                },
            };
        }
    };
});