app.controller("ms_allproducts", function ($scope, $http, $compile) {
    ms_allproducts = this;
    RUNCONTROLLER("ms_allproducts", ms_allproducts, $scope, $http, $compile);
    ms_allproducts.formulary = function (data, mode, defaultData) {
        if (ms_allproducts !== undefined) {
            RUN_B("ms_allproducts", ms_allproducts, $scope, $http, $compile);
            ms_allproducts.form.schemas.insert = {
                products: FORM.schemasType.selectMultiple,
                products_config: {
                    toTable: "ms_allproducts",
                    text: "Inserting products...",
                    fields: {
                        all: "$id",
                        product: "$item"
                    },
                    fieldsUpdate: {
                        field: "all",
                        value: "$id",
                    },
                },
            };
            ms_allproducts.form.schemas.select = {
                products: {
                    toTable: "ms_allproducts",
                    text: MESSAGE.i('actions.Loading'),
                    fields: {
                        all: "$id",
                    },
                },
            };
            ms_allproducts.form.readonly = {};
            ms_allproducts.form.getfilter = {
                field: baseController.viewData.fieldKey
            };
            ms_allproducts.createForm(data, mode, defaultData);
            ms_allproducts.form.rules = {
                all: function () {
                    var rules = [];
                    var value = ms_allproducts.all;
                    rules.push(VALIDATION.general.required(value));
                    return VALIDATION.process(ms_allproducts, "all", rules)
                },
                product: function () {
                    var rules = [];
                    var value = ms_allproducts.product;
                    rules.push(VALIDATION.general.required(value));
                    return VALIDATION.process(ms_allproducts, "product", rules)
                }
            };
            ms_allproducts.form.rulesGroup = {
                all: function () {
                    return ms_allproducts.validation.stateIcon(ms_allproducts.form.fileds);
                },
            };
        }
    };
});