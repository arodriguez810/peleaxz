app.controller("dragon_segment", function ($scope, $http, $compile) {
    dragon_segment = this;
    RUNCONTROLLER("dragon_segment", dragon_segment, $scope, $http, $compile);
    dragon_segment.formulary = function (data, mode, defaultData) {
        if (dragon_segment !== undefined) {
            RUN_B("dragon_segment", dragon_segment, $scope, $http, $compile);
            dragon_segment.form.readonly = {};
            dragon_segment.createForm(data, mode, defaultData);
            dragon_segment.$scope.$watch('dragon_segment.name', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(dragon_segment, "name", rules);
            });
        }
    };
});