app.controller("ms_allusers", function ($scope, $http, $compile) {
    ms_allusers = this;
    RUNCONTROLLER("ms_allusers", ms_allusers, $scope, $http, $compile);
    ms_allusers.formulary = function (data, mode, defaultData) {
        if (ms_allusers !== undefined) {
            RUN_B("ms_allusers", ms_allusers, $scope, $http, $compile);
            ms_allusers.form.schemas.insert = {};
            ms_allusers.form.schemas.select = {};
            ms_allusers.form.readonly = {};
            ms_allusers.form.getfilter = {
                field: baseController.viewData.fieldKey
            };
            ms_allusers.createForm(data, mode, defaultData);
            ms_allusers.form.rules = {
                all: function () {
                    var rules = [];
                    var value = ms_allusers.all;
                    rules.push(VALIDATION.general.required(value));
                    return VALIDATION.process(ms_allusers, "all", rules)
                },
                user: function () {
                    var rules = [];
                    var value = ms_allusers.user;
                    rules.push(VALIDATION.general.required(value));
                    return VALIDATION.process(ms_allusers, "user", rules)
                },
                category: function () {
                    var rules = [];
                    var value = ms_allusers.category;
                    rules.push(VALIDATION.general.required(value));
                    return VALIDATION.process(ms_allusers, "category", rules)
                }
            };
            ms_allusers.form.rulesGroup = {
                all: function () {
                    return ms_allusers.validation.stateIcon(ms_allusers.form.fileds);
                },
            };
        }
    };
});