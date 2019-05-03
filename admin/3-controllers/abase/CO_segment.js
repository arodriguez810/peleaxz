app.controller("segment", function ($scope, $http, $compile) {
    segment = this;
    RUNCONTROLLER("segment", segment, $scope, $http, $compile);
    segment.formulary = function (data, mode, defaultData) {
        if (segment !== undefined) {
            RUN_B("segment", segment, $scope, $http, $compile);
            segment.form.readonly = {};
            segment.createForm(data, mode, defaultData);
            segment.$scope.$watch('segment.name', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(segment, "name", rules);
            });
        }
    };
});