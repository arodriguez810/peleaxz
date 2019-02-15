app.controller("ms_product", function ($scope, $http, $compile) {
    ms_product = this;
    RUNCONTROLLER("ms_product", ms_product, $scope, $http, $compile);
    ms_product.formulary = function (data, mode, defaultData) {
        if (ms_product !== undefined) {
            RUN_B("ms_product", ms_product, $scope, $http, $compile);
            ms_product.form.schemas.insert = {};
            ms_product.form.schemas.select = {
                price: FORM.schemasType.decimal
            };
            ms_product.form.readonly = {};
            ms_product.form.afterInsertQuery = {};
            ms_product.createForm(data, mode, defaultData);
            ms_product.form.rules = {
                name: function () {
                    var rules = [];
                    var value = ms_product.name;
                    rules.push(VALIDATION.general.required(value));
                    rules.push(VALIDATION.text.realdata(value));
                    return VALIDATION.process(ms_product, "name", rules)
                }
            };
            ms_product.form.rulesGroup = {
                default: function () {
                    return ms_product.validation.stateIcon(ms_product.form.fileds);
                },
            };
        }
    };
});