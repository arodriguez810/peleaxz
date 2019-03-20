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
            my_category.form.rules = {
                name: function () {
                    var rules = [];
                    var value = my_category.name;
                    rules.push(VALIDATION.general.required(value));
                    return VALIDATION.process(my_category, "name", rules)
                }
            };
            my_category.form.rulesGroup = {
                all: function () {
                    return my_category.validation.stateIcon(my_category.form.fileds);
                },
            };
        }
    };
});