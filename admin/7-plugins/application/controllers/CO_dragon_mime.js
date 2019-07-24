app.controller("dragon_mime", function ($scope, $http, $compile) {
    dragon_mime = this;
    RUNCONTROLLER("dragon_mime", dragon_mime, $scope, $http, $compile);
    dragon_mime.formulary = function (data, mode, defaultData) {
        if (dragon_mime !== undefined) {
            RUN_B("dragon_mime", dragon_mime, $scope, $http, $compile);
            dragon_mime.form.readonly = {};
            dragon_mime.createForm(data, mode, defaultData);
            dragon_mime.$scope.$watch('dragon_mime.name', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(dragon_mime, "name", rules);
            });
        }
    };
});