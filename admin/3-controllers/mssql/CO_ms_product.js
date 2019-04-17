app.controller("ms_product", function ($scope, $http, $compile) {
    ms_product = this;
    TRIGGER.run(ms_product);
    ms_product.triggers.table.before.load = () => new Promise((resolve, reject) => {
        console.log(`es mio`);
        setTimeout(function () {
            resolve(true);
        }, 10000);
    });

    RUNCONTROLLER("ms_product", ms_product, $scope, $http, $compile);

    ms_product.formulary = function (data, mode, defaultData) {
        if (ms_product !== undefined) {
            RUN_B("ms_product", ms_product, $scope, $http, $compile);
            ms_product.custom = [1, 2, 3];
            ms_product.form.readonly = {campo: 5};
            ms_product.selectQueries["category"] = [
                {
                    field: "id",
                    operator: ">",
                    value: 5
                }
            ];
            ms_product.form.onload = function (name) {
                alert(name + " loaded");
            };
            ms_product.createForm(data, mode, defaultData);
            $scope.$watch('ms_product.name', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.text.realdata(value));
                VALIDATION.validate(ms_product, "name", rules);
            });

            $scope.$watchCollection('ms_product.custom', function (value) {

            });
        }
    };
});