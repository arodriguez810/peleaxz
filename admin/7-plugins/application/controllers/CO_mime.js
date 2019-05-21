app.controller("mime", function ($scope, $http, $compile) {
    mime = this;
    RUNCONTROLLER("mime", mime, $scope, $http, $compile);
    mime.formulary = function (data, mode, defaultData) {
        if (mime !== undefined) {
            RUN_B("mime", mime, $scope, $http, $compile);
            mime.form.readonly = {};
            mime.createForm(data, mode, defaultData);
            mime.$scope.$watch('mime.name', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(mime, "name", rules);
            });
        }
    };
});