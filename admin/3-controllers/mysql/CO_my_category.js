app.controller("my_category", function ($scope, $http, $compile) {
    my_category = this;
    RUNCONTROLLER("my_category", my_category, $scope, $http, $compile);
    my_category.formulary = function (data, mode, defaultData) {
        if (my_category !== undefined) {
            RUN_B("my_category", my_category, $scope, $http, $compile);
            my_category.form.schemas.insert = {};
            my_category.form.schemas.select = {};
            my_category.form.readonly = {};
            my_category.createForm(data, mode, defaultData);
            my_category.$scope.$watch('my_category.a', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(my_category, "a", rules);
            });
            my_category.$scope.$watch('my_category.b', function (value) {
                var rules = [];
                rules.push(VALIDATION.text.realdata(value));
                VALIDATION.validate(my_category, "b", rules);
            });
        }
    };
});