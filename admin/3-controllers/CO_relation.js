app.controller("relation", function ($scope, $http, $compile) {
    relation = this;
    RUNCONTROLLER("relation", relation, $scope, $http, $compile);
    relation.formulary = function (data, mode, defaultData) {
        if (relation !== undefined) {
            RUN_B("relation", relation, $scope, $http, $compile);
            relation.form.readonly = {};
            relation.createForm(data, mode, defaultData);
            $scope.$watch("relation.name", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(relation, 'name', rules);
            });
            $scope.$watch("relation.description", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(relation, 'description', rules);
            });
            $scope.$watch("relation.tempid", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(relation, 'tempid', rules);
            });
            $scope.$watch("relation.list", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(relation, 'list', rules);
            });
        }
    };
});