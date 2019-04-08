app.controller("ms_allproducts", function ($scope, $http, $compile) {
    ms_allproducts = this;
    RUNCONTROLLER("ms_allproducts", ms_allproducts, $scope, $http, $compile);
    ms_allproducts.formulary = function (data, mode, defaultData) {
        if (ms_allproducts !== undefined) {
            RUN_B("ms_allproducts", ms_allproducts, $scope, $http, $compile);
            ms_allproducts.form.readonly = {};
            if (RELATIONS.anonymous[$scope.modelName] !== undefined) {
                ms_allproducts.form.getfilter = {
                    field: RELATIONS.anonymous[$scope.modelName].fieldKey
                };
            }
            ms_allproducts.createForm(data, mode, defaultData);
            $scope.$watch('ms_allproducts.all', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(ms_allproducts, "all", rules);
            });
            $scope.$watch('ms_allproducts.product', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(ms_allproducts, "product", rules);
            });
        }
    };
});