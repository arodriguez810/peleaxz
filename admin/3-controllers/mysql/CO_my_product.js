app.controller("my_product", function ($scope, $http, $compile) {
    my_product = this;
    RUNCONTROLLER("my_product", my_product, $scope, $http, $compile);
    BASEAPI.list('ms_category', {
        limit: 0,
        page: 1,
        orderby: "id",
        order: "asc"
    }, function (result) {
        MYCATEGORIES = result;

        my_product.formulary = function (data, mode, defaultData) {
            if (my_product !== undefined) {
                RUN_B("my_product", my_product, $scope, $http, $compile);
                my_product.form.readonly = {};
                my_product.createForm(data, mode, defaultData);
                my_product.$scope.$watch('my_product.name', function (value) {
                    var rules = [];
                    rules.push(VALIDATION.general.required(value));
                    VALIDATION.validate(my_product, "name", rules);
                });
            }
        };

    });


});