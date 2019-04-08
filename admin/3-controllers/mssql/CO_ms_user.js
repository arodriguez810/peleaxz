app.controller("ms_user", function ($scope, $http, $compile) {
    ms_user = this;
    RUNCONTROLLER("ms_user", ms_user, $scope, $http, $compile);
    ms_user.formulary = function (data, mode, defaultData) {
        if (ms_user !== undefined) {
            RUN_B("ms_user", ms_user, $scope, $http, $compile);
            ms_user.form.readonly = {};
            ms_user.createForm(data, mode, defaultData);
            $scope.$watch('ms_user.name', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(ms_user, "name", rules);
            });
            $scope.$watch('ms_user.lastname', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(ms_user, "lastname", rules);
            });
            $scope.$watch('ms_user.username', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(ms_user, "username", rules);
            });
            $scope.$watch('ms_user.password', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(ms_user, "password", rules);
            });
            $scope.$watch('ms_user.email', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.text.email(value));
                VALIDATION.validate(ms_user, "email", rules);
            });
        }
    };
});