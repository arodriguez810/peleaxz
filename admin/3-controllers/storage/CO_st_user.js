app.controller("st_user", function ($scope, $http, $compile) {
    st_user = this;
    RUNCONTROLLER("st_user", st_user, $scope, $http, $compile);
    st_user.formulary = function (data, mode, defaultData) {
        if (st_user !== undefined) {
            RUN_B("st_user", st_user, $scope, $http, $compile);
            st_user.form.schemas.insert = {
                password: FORM.schemasType.password,
                profileimage: FORM.schemasType.upload
            };
            st_user.form.schemas.select = {
                password: FORM.schemasType.password
            };
            st_user.form.readonly = {};
            st_user.createForm(data, mode, defaultData);
            st_user.$scope.$watch('st_user.name', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(st_user, "name", rules);
            });
            st_user.$scope.$watch('st_user.lastname', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(st_user, "lastname", rules);
            });
            st_user.$scope.$watch('st_user.username', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(st_user, "username", rules);
            });
            st_user.$scope.$watch('st_user.password', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(st_user, "password", rules);
            });
            st_user.$scope.$watch('st_user.email', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(st_user, "email", rules);
            });
        }
    };
});