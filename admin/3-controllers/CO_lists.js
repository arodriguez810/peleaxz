app.controller("lists", function ($scope, $http, $compile) {
    lists = this;
    RUNCONTROLLER("lists", lists, $scope, $http, $compile);
    lists.formulary = function (data, mode, defaultData) {
        if (lists !== undefined) {
            RUN_B("lists", lists, $scope, $http, $compile);
            lists.form.readonly = {};
            lists.createForm(data, mode, defaultData);
            $scope.$watch("lists.parent", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(lists, 'parent', rules);
            });
            $scope.$watch("lists.child", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(lists, 'child', rules);
            });
        }
    };
});