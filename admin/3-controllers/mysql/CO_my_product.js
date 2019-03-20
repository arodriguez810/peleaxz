app.controller("my_product", function ($scope, $http, $compile) {
    my_product = this;
    RUNCONTROLLER("my_product", my_product, $scope, $http, $compile);
    my_product.formulary = function (data, mode, defaultData) {
        if (my_product !== undefined) {
            RUN_B("my_product", my_product, $scope, $http, $compile);
            my_product.form.schemas.insert = {};
            my_product.form.schemas.select = {};
            my_product.form.readonly = {};
            my_product.createForm(data, mode, defaultData);
            my_product.form.rules = {
                name: function () {
                    var rules = [];
                    var value = my_product.name;
                    rules.push(VALIDATION.general.required(value));
                    rules.push(VALIDATION.general.reglapropia(value));
                    return VALIDATION.process(my_product, "name", rules)
                }
            };
            my_product.form.rulesGroup = {
                all: function () {
                    return my_product.validation.stateIcon(my_product.form.fileds);
                },
            };
        }
    };
});