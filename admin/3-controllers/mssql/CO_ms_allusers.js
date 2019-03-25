app.controller("ms_allusers", function ($scope, $http, $compile) {
    ms_allusers = this;
    RUNCONTROLLER("ms_allusers", ms_allusers, $scope, $http, $compile);
    ms_allusers.formulary = function (data, mode, defaultData) {
        if (ms_allusers !== undefined) {
            RUN_B("ms_allusers", ms_allusers, $scope, $http, $compile);
            ms_allusers.form.schemas.insert = {};
            ms_allusers.form.schemas.select = {};
            ms_allusers.form.readonly = {};
            if (RELATIONS.anonymous[$scope.modelName] !== undefined) {
                ms_allproducts.form.getfilter = {
                    field: RELATIONS.anonymous[$scope.modelName].fieldKey
                };
            }
            ms_allusers.createForm(data, mode, defaultData);

            ms_allusers.$scope.$watch('ms_allusers.all', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(ms_allusers, "all", rules);
            });
            ms_allusers.$scope.$watch('ms_allusers.user', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(ms_allusers, "user", rules);
            });
            ms_allusers.$scope.$watch('ms_allusers.category', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(ms_allusers, "category", rules);
            });
        }
    };
});