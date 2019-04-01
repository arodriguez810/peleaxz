app.controller("ms_product", function ($scope, $http, $compile) {
    ms_product = this;
    RUNCONTROLLER("ms_product", ms_product, $scope, $http, $compile);
    ms_product.formulary = function (data, mode, defaultData) {
        if (ms_product !== undefined) {
            RUN_B("ms_product", ms_product, $scope, $http, $compile);
            ms_product.form.readonly = {campo: 5};
            ms_product.selectQueries["category"] = [
                {
                    field: "id",
                    operator: ">",
                    value: 5
                }
            ];
            ms_product.createForm(data, mode, defaultData);
            ms_product.$scope.$watch('ms_product.name', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.text.realdata(value));
                VALIDATION.validate(ms_product, "name", rules);
            });
        }
    };
});