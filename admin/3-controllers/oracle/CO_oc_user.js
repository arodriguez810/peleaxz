app.controller("oc_user", function ($scope, $http, $compile) {
    oc_user = this;
    RUNCONTROLLER("oc_user", oc_user, $scope, $http, $compile);
    oc_user.formulary = function (data, mode, defaultData) {
        if (oc_user !== undefined) {
            RUN_B("oc_user", oc_user, $scope, $http, $compile);
            oc_user.form.schemas.insert = {
                password: FORM.schemasType.password,
                profileimage: FORM.schemasType.upload
            };
            oc_user.form.schemas.select = {
                password: FORM.schemasType.password
            };
            oc_user.form.readonly = {};
            oc_user.createForm(data, mode, defaultData);
            oc_user.$scope.$watch('oc_user.name', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(oc_user, "name", rules);
            });
            oc_user.$scope.$watch('oc_user.lastname', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(oc_user, "lastname", rules);
            });
            oc_user.$scope.$watch('oc_user.username', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(oc_user, "username", rules);
            });
            oc_user.$scope.$watch('oc_user.password', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(oc_user, "password", rules);
            });
            oc_user.$scope.$watch('oc_user.email', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(oc_user, "email", rules);
            });
        }
    };
});