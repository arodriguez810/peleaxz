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
            st_user.form.rules = {
                name: function () {
                    var rules = [];
                    var value = st_user.name;
                    rules.push(VALIDATION.general.required(value));
                    return VALIDATION.process(st_user, "name", rules)
                },
                lastname: function () {
                    var rules = [];
                    var value = st_user.lastname;
                    rules.push(VALIDATION.general.required(value));
                    return VALIDATION.process(st_user, "lastname", rules)
                },
                username: function () {
                    var rules = [];
                    var value = st_user.username;
                    rules.push(VALIDATION.general.required(value));
                    return VALIDATION.process(st_user, "username", rules)
                },
                password: function () {
                    var rules = [];
                    var value = st_user.password;
                    rules.push(VALIDATION.general.required(value));
                    return VALIDATION.process(st_user, "password", rules)
                },
                email: function () {
                    var rules = [];
                    var value = st_user.email;
                    rules.push(VALIDATION.text.email(value));
                    return VALIDATION.process(st_user, "email", rules)
                }
            };
            st_user.form.rulesGroup = {
                all: function () {
                    return st_user.validation.stateIcon(st_user.form.fileds);
                },
            };
        }
    };
});